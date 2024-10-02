<script setup lang="ts">

import { arr as values } from '@/data'
import { ref } from 'vue';

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
            <li v-for="(value, i) in randomValues" :key="value">
                <Checkbox v-model="checkboxes[i]" :binary="true" class="checkbox"/>
                {{ value }}
            </li>
        </ul>
    </div>
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
