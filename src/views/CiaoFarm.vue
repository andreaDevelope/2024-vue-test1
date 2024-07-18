<template>
  <div class="container">
    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images" alt="immagine-fattoria">
    <div v-if="farmShow" class="content">
      <h1 class="rotate" id="test-h1">Farms</h1>
      <div class="in-line">
        <button @click="addFarm">test add farm and farmers</button>
        <button @click="toggleNewfarmShow" class="in-line">add new farms</button>
      </div>
      <ul>
        <li v-for="farms in farms" :key="farms.id" class="gradient-text">
          {{ farms.name }} {{ farms.city }}
        </li>
      </ul>
    </div>
        
    <!-- elementi da mostare al click sul add new farms -->
    <div v-else="farmShow" class="content">
      <h1 class="rotate">ADD NEW FARM</h1>
      <input type="text" v-model="newFarmData.name" placeholder="farm name">
      <input type="text" v-model="newFarmData.city" placeholder="farm city">
      <div class="in-line">
        <button @click="toggleNewfarmShow">cancell</button>
        <button @click="saveNewFarm">save</button>
      </div>
    </div>
  </div>
</template>

<!-- ----------------------------------------SCRIPT--------------------------------------------------- -->
  
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const farms = ref([])
const farmShow = ref(true)
const newFarmData = ref({
  "name": '',
  "city": ''
})

// EVENTI

const addFarm = () => {
  axios.get("http://localhost:8080/api/v1/farmers/test/add").then(updateData)
}

const updateData = () => {
  axios
  .get('http://localhost:8080/api/v1/farms')
  .then((res) => {
    farms.value = res.data
  })
  .catch(() => {
    console.log('error!!!!!!!!!')
  })
}

onMounted(() => {
  axios.get('http://localhost:8080/api/v1/farms')
    .then((res) => {
      farms.value = res.data
    })
    .catch((err) => {
      console.error('error!!!!!!!!!', err)
    })
})

const toggleNewfarmShow = () => {
  farmShow.value = !farmShow.value
}

const saveNewFarm = () => {
  axios.post('http://localhost:8080/api/v1/farms', newFarmData.value).then((res) => {
    const savedFarm = res.data;

    farms.value.push(savedFarm)
    newFarmData.value = {
      name: '',
      city: ''
    }

    toggleNewfarmShow()
  })
}
</script>

<!-- ------------------------------------------STILE--------------------------------------------------- -->
  
<style>
body {
  background-color: lightgreen;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.container {  
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

img {
  width: 60vw;
  height: 30vh;
  margin-bottom: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 5vh;
  font-size: 20px;
}

button {
  margin: 5px;
  border-radius: 16px;
  border: none;
  background-color: #9dff00;
  padding: 5px;
  cursor: pointer;
}

.in-line {
  display: flex;
  justify-content: center;
}

input {
  margin: 5px;
  border-radius: 16px;
  padding: 5px;
  border-color: lightgray;
  background-color: white;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
}

li {
  font-size: 18px;
  border: 1px solid black;
  border-radius: 16px;
  padding: 5px;
  box-sizing: border-box;
  margin: 5px;
}

.gradient-text {
  background: linear-gradient(to left, #ff5f5f, #0004ff);
  -webkit-background-clip: text;
  color: transparent;
}

@keyframes like {
  100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(15deg) scale(1);
  }
  50% {
    transform: rotate(-180deg) scale(1);
  }
  75% {
    transform: rotate(-360deg) scale(1);
  }
  100% {
    transform: rotate(-360deg) scale(1);
  }
}

.rotate {
  display: inline-block;
  animation: like 1.5s infinite;
}
</style>
