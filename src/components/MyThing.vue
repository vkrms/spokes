<script setup lang="ts">

import { arr as values } from '@/data'
import { ref } from 'vue';

import Textarea from 'primevue/textarea';

const length = 5;

function getRandomValues(arr: unknown[], num: number) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// console.log({
//     randomValues,
//     first: randomValues[0]
// });

// arry of falses of n length
function getEmpties(length: number) {
    return Array.from({ length }, () => false);
}

const checkboxes = ref(getEmpties(length));

const randomValues = ref(getRandomValues(values, length));

const refresh = () => {
    console.log('refreshing...');
    randomValues.value = getRandomValues(values, length);
    checkboxes.value = getEmpties(length);
    randNum.value = getRandNum();
};

function getRandNum() {
    return Math.ceil(Math.random() * length);
}

function gotEmptyCheckboxes() {
    return checkboxes.value.some((checkbox) => !checkbox);
}

function getRandNumNotTaken() {
    let index = getRandNum();

    if (!gotEmptyCheckboxes()) {
        return 666; // no options are highlighted
    }

    while (checkboxes.value[index - 1]) {
        index = getRandNum();
    }

    return index;
}

const randNum = ref(getRandNum());

const updateRandNum = () => {
    console.log('updating');
    randNum.value = getRandNumNotTaken();
};

</script>

<template>
    <div>
        <div class="refreshable-title">
            <Button icon="pi pi-refresh" @click="refresh" />
            <h1>5 spokes</h1>
        </div>

        <pre class="pre">{{ randomValues }}</pre>        

        <ul class="list">
            <li v-for="(value, i) in randomValues"
                :key="value"
                :class="{isHighlighted: (i === randNum - 1)}"
            >
                <Checkbox
                    v-model="checkboxes[i]"
                    :binary="true"                    
                    class="checkbox"
                    @change="updateRandNum"
                />
                {{ value }}
            </li>
        </ul>
    </div>

    <Textarea rows="5" cols="30" placeholder="Write a few thought on how you can improve the currently highlighted area" />
</template>

<style>
    .pre {
        padding: 20px;
        border-radius: 5px;
        text-align: left;
        color: #fff;
        background: #333;
        font-family: monospace;
        font-size: 15px;
        font-weight: 500;      
        display: none;  
    }
</style>
