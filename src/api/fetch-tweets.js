import { useWorkspace,  usePagination} from '@/composables'
import { Tweet } from '@/models'
import bs58 from 'bs58'
import { computed, ref } from 'vue'
import { BN } from '@project-serum/anchor'


export const fetchTweets = async (filters = []) => {
    const { program } = useWorkspace()
    console.log(filters);
    const step1 = program.value.account;
    const tweets = await step1.tweet.all([]);
    return tweets.map(tweet => new Tweet(tweet.publicKey, tweet.account))
}


export const authorFilter = authorBase58PublicKey => ({
    memcmp: {
        offset: 8,
        bytes: authorBase58PublicKey,
    }
})

export const topicFilter = topic => ({
    memcmp: {
        offset: 8 +
        32 +
        8 +
        8 +
        4,
        bytes: bs58.encode(Buffer.from(topic)),
    }
})

export const paginateTweets = (filters = [], perPage = 6, onNewPage = () => {}) => {
    filters = ref(filters)
    const { program, connection } = useWorkspace()
    const page = ref(0)

    const prefetchCb = async (isrankedby) => {
        page.value = 0

        // Prepare the discriminator filter.
        const tweetClient = program.value.account.tweet
        const tweetAccountName = tweetClient._idlAccount.name
        const tweetDiscriminatorFilter = {
            memcmp: tweetClient.coder.accounts.memcmp(tweetAccountName)
        }

        // Prefetch all tweets with their timestamps only.

        var offset_val = 40

        if ((isrankedby == "score__" )|(isrankedby == "score" )) {
            offset_val = 48
        }

        const allTweets = await connection.getProgramAccounts(program.value.programId, {
            filters: [tweetDiscriminatorFilter, ...filters.value],
            dataSlice: { offset: offset_val, length: 8 },
        })

        // Parse the timestamp from the account's data.
//        const allTweetsWithTimestamps = allTweets.map(({ pubkey,account  }) => ({
//            pubkey,
//            score: new BN(account.data, 'le'),
//        }))

//
//        function calc(u, unsigned) {
//              const digits = [];
//              const negative = !unsigned && u.length > 0 && u[0] >= 128;
//              Array.from(u).forEach((s, j) => {
//                if (negative)
//                  s = (j == u.length - 1 ? 256 : 255) - s;
//                for (let i = 0; s > 0 || i < digits.length; i++) {
//                  s += (digits[i] || 0) * 256;
//                  digits[i] = s % 10;
//                  s = (s - digits[i]) / 10;
//                }
//              });
//              return (negative ? '-' : '') + digits.reverse().join('');
//            }

        function calc(bytes){
                var ret = 0;
        if (bytes[7] >= 128) { // negative number
            bytes.forEach((val, i) => { ret += (255 - val) * 256 ** i });
            ret = ret * -1 - 1;
        }
        else bytes.forEach((val, i) => { ret += val * 256 ** i; });
        return ret;
        }


        var allTweetsWithTimestamps = []

        console.log('dfds');
        console.log(allTweets);

        if ((isrankedby == "score")|(isrankedby == "score__")) {
            allTweetsWithTimestamps = allTweets.map(({ pubkey,account  }) => ({
                pubkey,
                score: isNaN(parseFloat(calc(account.data.reverse()))) ? 0 : parseFloat(calc(account.data.reverse()))
            }))

            console.log('ocoo');
            console.log(allTweetsWithTimestamps);
        }
        else{
            allTweetsWithTimestamps = allTweets.map(({ pubkey,account  }) => ({
                pubkey,
                score: new BN(account.data, 'le'),
            }))
        }

        var ret_values_temp = []

        if (isrankedby == "score") {


            ret_values_temp = allTweetsWithTimestamps
            .sort((a, b) => b.score - a.score)
        }
        else if (isrankedby == "score__") {


            ret_values_temp = allTweetsWithTimestamps
            .sort((a, b) => a.score - b.score)
        }
        else if (isrankedby == "datecreated"){
            ret_values_temp = allTweetsWithTimestamps
            .sort((a, b) => b.score.cmp(a.score))
        }
        else {
            ret_values_temp = allTweetsWithTimestamps
            .sort((a, b) => a.score.cmp(b.score))
        }

//        allTweetsWithTimestamps
//            .sort((a, b) => a.score - b.score)

        const ret_values = ret_values_temp.map(({ pubkey }) => pubkey)


        return ret_values
    }

    const pageCb = async (page, paginatedPublicKeys) => {

        const tweets = await program.value.account.tweet.fetchMultiple(paginatedPublicKeys)

        return tweets.reduce((accumulator, tweet, index) => {
            const publicKey = paginatedPublicKeys[index]
            accumulator.push(new Tweet(publicKey, tweet))
            return accumulator
        }, [])
        }

    const pagination = usePagination(perPage, prefetchCb, pageCb)
    const { hasPage, getPage } = pagination

    const hasNextPage = computed(() => hasPage(page.value + 1))
    const getNextPage = async () => {
        console.log("hello");
        console.log(page.value);
        const newPageTweets = await getPage(page.value + 1)

        console.log("hello22");
        console.log(newPageTweets);
        page.value += 1
        onNewPage(newPageTweets)
    }

    console.log(page);
    console.log(pagination);

    return { page, hasNextPage, getNextPage, ...pagination }
}