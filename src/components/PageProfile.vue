<script setup>
import { ref } from 'vue'
import { paginateTweets, authorFilter } from '@/api'
import TweetForm from '@/components/TweetForm'
import TweetList from '@/components/TweetList'
import { useWorkspace } from '@/composables'

const tweets = ref([])
const filters = ref([])

const onNewPage = newTweets => tweets.value.push(...newTweets)
const { prefetch,prefetch2, prefetch3, prefetch4,hasNextPage, getNextPage, loading } = paginateTweets(filters, 5, onNewPage)
const { wallet } = useWorkspace()

tweets.value = []
filters.value = [authorFilter(wallet.value.publicKey.toBase58())]
prefetch().then(getNextPage)


const addTweet = tweet => tweets.value.push(tweet)


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
    <!-- TODO: Check connected wallet -->
    <div v-if="true" class="border-b px-8 py-4 bg-blue-800">
        {{ wallet.publicKey.toBase58() }}
    </div>
    <tweet-form @added="addTweet"></tweet-form>
                            <div class="select border-b">

    <select style="background-color:black;min-width: 160px;" name="rankby" id="rankby" @change="onChange($event)">
            <option value="score">Rank By Highest Score First</option>
            <option value="score__">Rank By Lowest Score First</option>
            <option value="datecreated">Rank By Most Recent First</option>
            <option value="datecreated__">Rank By Oldest First</option>
        </select>
        </div>
    <tweet-list v-model:tweets="tweets" :loading="loading" :has-more="hasNextPage" @more="getNextPage"></tweet-list>
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
