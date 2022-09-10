<script setup>
import {  ref } from 'vue'
import { paginateTweets } from '@/api'
import TweetForm from '@/components/TweetForm'
import TweetList from '@/components/TweetList'


var tweets = ref([])
const renderComponent = ref(true);

console.log("thisic1");
console.log(tweets.value);

var onNewPage = newTweets => tweets.value.push(...newTweets)

console.log("thisic2");
console.log(tweets.value);

var isrankedbyscore = true
var { prefetch, prefetch2, prefetch3, prefetch4, hasNextPage, getNextPage, loading } = paginateTweets([], 5, onNewPage, isrankedbyscore)

console.log("thisic3");
console.log(tweets.value);

prefetch().then(getNextPage)

const emit = defineEmits(['update:tweets'])


console.log("thisic4");
console.log(tweets.value);

const addTweet = tweet => tweets.value.unshift(tweet)
const onChange = async (event) => {

    if (event.target.value == "score") {
    console.log("thisic445");
    emit('update:tweets', [])
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
    emit('update:tweets', [])
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
    emit('update:tweets', [])
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
    emit('update:tweets', [])
    tweets.value = [];
     console.log(tweets.value);
     console.log(event.target.value);
     prefetch4().then(getNextPage)

    console.log("thisic44");
    console.log(tweets.value);
    }
}


console.log("thisic");
console.log(tweets.value);

</script>

<template>
    <tweet-form @added="addTweet"></tweet-form>
            <div class="select">

    <div class="px-6 border-b">
        <select style="background-color:black;min-width: 160px;" name="rankby" id="rankby" @change="onChange($event)">
            <option value="score">Rank By Highest Score First</option>
            <option value="score__">Rank By Lowest Score First</option>
            <option value="datecreated">Rank By Most Recent First</option>
            <option value="datecreated__">Rank By Oldest First</option>
        </select>
    </div>
    </div>
    <tweet-list v-if="renderComponent" v-model:tweets="tweets" :loading="loading" :has-more="hasNextPage" @more="getNextPage"></tweet-list>


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