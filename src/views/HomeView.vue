<template>
  <div>
    <h1>Ciao Home</h1>
    <div class="flex-box">
      <ul>
        <li v-for="farmer in farmers" :key="farmer.id" class="gradient-text">
          {{ farmer.name }} {{ farmer.surname }}: {{ farmer.age }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const farmers = ref([])

onMounted(() => {
  axios.get('http://localhost:8080/api/v1/farmers')
    .then((res) => {
      farmers.value = res.data
    })
    .catch((err) => {
      console.error('error!!!!!!!!!', err)
    })
})
</script>

<style>
  div {
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    text-align: center;
  }

  .flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    font-size: 18px;
    border: 1px solid black;
    border-radius: 16px;
    padding: 5px;
    box-sizing: border-box;
    margin: 5px;
    text-align: center;
  }

  .gradient-text {
    background: linear-gradient(to left, #ff5f5f, #9dff00);
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
