<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { paginateTweets, authorFilter } from '@/api'
import { useFromRoute } from '@/composables'
import TweetList from '@/components/TweetList'
import TweetSearch from '@/components/TweetSearch'

// Data.
const router = useRouter()
const tweets = ref([])
const filters = ref([])

const onNewPage = newTweets => tweets.value.push(...newTweets)
const { prefetch,prefetch2, prefetch3, prefetch4,hasNextPage, getNextPage, loading } = paginateTweets(filters, 5, onNewPage)
const author = ref('')
const viewedAuthor = ref('')

// Actions.
const search = () => {
    router.push(`/users/${author.value}`)
}

const fetchAuthorTweets = () => {
    if (author.value === viewedAuthor.value) return;
    tweets.value = []
    viewedAuthor.value = author.value
    filters.value = [authorFilter(author.value)]
    prefetch().then(getNextPage)
}

// Router hooks.
useFromRoute((route) => {
    author.value = route.params.author
    if (author.value) {
        fetchAuthorTweets()
    } else {
        tweets.value = []
        viewedAuthor.value = ''
    }
})



const onChange = async (event) => {

    if (event.target.value == "score") {
    console.log("thisic445");
    tweets.value = [];
     console.log(tweets.value);
     console.log(event.target.value);
     console.log(prefetch2);
     prefetch().then(getNextPage)

    console.log("thisic44");
    console.log(tweets.value);
    }
    else if (event.target.value == "datecreated")
    {
     console.log("thisic445");
    tweets.value = [];
     console.log(tweets.value);
     console.log(event.target.value);
     prefetch2().then(getNextPage)

    console.log("thisic44");
    console.log(tweets.value);
    }
    else if (event.target.value == "score__")
    {
     console.log("thisic445");
    tweets.value = [];
     console.log(tweets.value);
     console.log(event.target.value);
     prefetch3().then(getNextPage)

    console.log("thisic44");
    console.log(tweets.value);
    }
    else
    {
     console.log("thisic445");
    tweets.value = [];
     console.log(tweets.value);
     console.log(event.target.value);
     prefetch4().then(getNextPage)

    console.log("thisic44");
    console.log(tweets.value);
    }
}
</script>

<template>
    <tweet-search placeholder="public key" :disabled="! author" v-model="author" @search="search">
        <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
        </template>
    </tweet-search>
    <div v-if="viewedAuthor">
                        <div class="select border-b">

            <select style="background-color:black;min-width: 160px;" name="rankby" id="rankby" @change="onChange($event)">
            <option value="score">Rank By Highest Score First</option>
            <option value="score__">Rank By Lowest Score First</option>
            <option value="datecreated">Rank By Most Recent First</option>
            <option value="datecreated__">Rank By Oldest First</option>
        </select>
        </div>
        <tweet-list v-model:tweets="tweets" :loading="loading" :has-more="hasNextPage" @more="getNextPage"></tweet-list>
        <div v-if="tweets.length === 0" class="p-8 text-gray-500 text-center">
            User not found...
        </div>
    </div>
</template>

    <style>
    h1 {
        color: green;
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        outline: 0;
        text-align: center;

        background: green;
        background-image: none;
    }

    .select {
        position: relative;
        display: block;

        line-height: 3;
        background: black;
        overflow: hidden;
        text-align: center;

        border-radius: .25em;
    }

    select {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0 0 0 .5em;
        color: white;
        text-align: center;

        cursor: pointer;
    }

    select::-ms-expand {
        display: none;
    }

    .select::after {
        content: '\25BC';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 1em;
        background: #34495E;
        pointer-events: none;
    }

    .select:hover::after {
        color: yellow;
    }

     .select::after {
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;
    }
    </style>
