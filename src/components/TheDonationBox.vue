<script setup>
import { sendDonation } from '@/api'
import { ref } from 'vue'


const amount = ref('')


const donate = async () => {
    console.log('donating');
    const amount_number = parseInt(amount.value*1000000000);
    const donation = await sendDonation(amount_number);
    console.log(donation);
}


</script>

<template>
    <aside class="items-stretch space-y-4">
         <div class="items-center justify-between -m-2">
            <!-- Topic field. -->
            <div class="relative">
                <input
                    type="number"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46 || event.charCode == 0 "
                    maxlength = "6"
                    step="0.1"
                    placeholder="amount in SOL"
                    class="text-blue-700 rounded-full pl-4 pr-4 py-2 bg-gray-100"
                    :value="effectiveTopic"
                    :disabled="forcedTopic"
                    @input="amount = $event.target.value"
                >
                <div class="absolute left-0 inset-y-0 pl-3 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto" :class="effectiveTopic ? 'text-blue-700' : 'text-gray-400'" viewBox="0 0 0 0" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="flex items-center space-x-6 m-2 ml-auto">
                <button class="text-white px-4 py-2 rounded-full font-semibold bg-blue-700"
            @click="donate">Make a Donation</button>
            </div>
        </div>
    </aside>
</template>