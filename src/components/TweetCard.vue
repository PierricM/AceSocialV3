<script setup>
import { toRefs, computed } from 'vue'
import { useWorkspace } from '@/composables'
import { changeScore, decreaseScore } from '@/api'
import { deleteTweet } from '@/api'

const emit = defineEmits(['delete']);

const props = defineProps({
    tweet: Object,
})

const { tweet } = toRefs(props)
const { wallet } = useWorkspace()
const isMyTweet = computed(() => wallet.value && wallet.value.publicKey.toBase58() === tweet.value.author.toBase58())

const authorRoute = computed(() => {
    if (isMyTweet.value) {
        return { name: 'Profile' }
    } else {
        return { name: 'Users', params: { author: tweet.value.author.toBase58() } }
    }
})


// Actions.
const increase = async () => {
    await changeScore(tweet.value);
}


const decrease = async () => {
    await decreaseScore(tweet.value);
}

const onDelete = async () => {
    await deleteTweet(tweet.value);
    emit('delete', tweet.value)
}


</script>

<template>
    <div class="px-8 py-4">
        <div>
            <h3 class="inline font-semibold" :title="tweet.author">
                <router-link :to="authorRoute" class="hover:underline">
                    {{ tweet.author_display }}
                </router-link>
            </h3>
            <span class="text-gray-500"> • </span>
            <time class="text-gray-400 text-sm" :title="tweet.created_at">
                <router-link :to="{ name: 'Tweet', params: { tweet: tweet.publicKey.toBase58() } }" class="hover:underline">
                    {{ tweet.created_ago }}
                </router-link>
            </time>
            <span class="px-20 py-2"></span>

            <button  v-if="isMyTweet" @click="onDelete" class="px-4 py-4 text-gray-400 text-sm rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-100" title="Delete tweet">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 m-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>

        </div>


        <p class="py-4 whitespace-pre-wrap break-words" v-text="tweet.content"></p>
        <router-link v-if="tweet.topic" :to="{ name: 'Topics', params: { topic: tweet.topic } }" class="py-4 inline-block mt-2 text-blue-500 hover:underline">
            #{{ tweet.topic }}
        </router-link>

        <div v-if="tweet.giflink" className="gif-item" key={gif}>
          <img :src=tweet.giflink alt="display unavailable" />
        </div>


        <div class="flex flex-wrap items-center justify-between -m-2">

            <p class="px-8 py-8 whitespace-pre-wrap" style="font-style:italic; font-size: large;font-weight: bold;" v-text="tweet.score"></p>



                <button
                    class="text-white px-4 py-2 rounded-full font-semibold"
                    :class="canTweet ? 'bg-orange-700' : 'bg-orange-600'"
                    @click="decrease"
                >
                -
                </button>




                <button
                    class="text-white px-4 py-2 rounded-full font-semibold"
                    :class="canTweet ? 'bg-blue-500' : 'bg-blue-600'"
                    @click="increase">
                    +
                </button>
        </div>

    </div>
</template>


    <style>
img {color:gray;
text-style: italic;
}

    </style>

