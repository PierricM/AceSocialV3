import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '@/composables'
import { Tweet } from '@/models'
import bs58 from 'bs58'
import { Transaction } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'


export const sendTweet = async (topic, content, giflink) => {
    const { connection, wallet, program } = useWorkspace()

    const tweet = web3.Keypair.generate()

    const step1 = program.value.account;
    const tweetss = await step1.tweet.all([{
    memcmp: {
        offset: 8 +
        32 +
        8 +
        8 +
        4,
        bytes: bs58.encode(Buffer.from(topic)),
    }
}]);

    console.log(tweetss);
    console.log(tweetss.length);

//
//        const allTweets = await connection.getProgramAccounts(program.value.programId, {
//            filters: [{memcmp: {
//        offset: 8,
//        bytes: wallet.value.publicKey.toBase58(),
//    }}, {
//    memcmp: {
//        offset: 8 +
//        32 +
//        8 +
//        8 +
//        4,
//        bytes: bs58.encode(Buffer.from(topic)),
//    }
//}],
//            dataSlice: { offset: 48, length: 8 },
//        })

        var allTweetsWithTimestamps = []
//
//function calc(u, unsigned) {
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
//
//
        allTweetsWithTimestamps = tweetss.map(({ pubkey,account  }) => ({
                pubkey,
                score: new BN(account.score, 'le'),
                owner: account.author,
                ts: new BN(account.timestamp, 'le'),
                content: account.content,
            }))
//
    console.log(allTweetsWithTimestamps);

        var ret_values_temp = []

        ret_values_temp = allTweetsWithTimestamps.sort((a, b) => a.ts.cmp(b.ts))
            .sort((a, b) => b.score.cmp(a.score))

        console.log(ret_values_temp);

    var to3 = new web3.PublicKey("H7MgKYSy53fmM9L6wGGsnK1Hiqz6CJ3SbZbhaFSPzdpr");


//    const to3 = new web3.PublicKey("H7MgKYSy53fmM9L6wGGsnK1Hiqz6CJ3SbZbhaFSPzdpr");
    if (ret_values_temp.length > 0) {
        to3 = ret_values_temp[0].owner;}


    const tx = await program.value.transaction.sendTweet(topic, content, giflink, {
        accounts: {
            author: wallet.value.publicKey,
            tweet: tweet.publicKey,
            from: wallet.value.publicKey,
            to: to3,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [tweet, wallet.value]
    })




//    const tx = await program.value.transaction.decreaseScore( {
//    accounts: {
//        tweet: tweet.publicKey,
//        from: wallet.value.publicKey,
//        to: to3,
//        systemProgram: web3.SystemProgram.programId,
//                },
//        signers: [wallet.value]
//
//
//    })

    tx.feePayer = wallet.value.publicKey
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
//    const signedTx = await wallet.value.signTransaction(tx)
//
    tx.partialSign(tweet)

    const serializedTransaction = tx.serialize({
        requireAllSignatures: false
    })

    const encodedTransaction = serializedTransaction.toString('base64')



    const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, 'base64'))

    const signedTransaction = await window.solana.signTransaction(recoveredTransaction)
    const result = await connection.sendRawTransaction(signedTransaction.serialize());




//    const txId = await connection.sendRawTransaction(signedTx.serialize())
    await connection.confirmTransaction(result)
//     const signature = await web3.sendAndConfirmTransaction(
//        connection,
//        tx,
//        [tweet, wallet.value],
//      );
//      console.log(signature);

    const tweetAccount = await program.value.account.tweet.fetch(tweet.publicKey)

    return new Tweet(tweet.publicKey, tweetAccount)
}
