<template>
  <div class="container">
    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images" alt="immagine-fattoria">
    
    <!-- Mostra la lista delle fattorie -->
    <div v-if="farmShow" class="content">
      <h1 class="rotate" id="test-h1">Farms</h1>
      <div class="in-line">
        <button @click="addFarm">Test add farm and farmers</button>
        <button @click="toggleNewFarmShow" class="in-line">Add new farms</button>
      </div>
      <ul>
        <li v-for="farm in farms" :key="farm.id" class="gradient-text">
          [{{ farm.id }}] {{ farm.name }} {{ farm.city }}
          <br />
          <button @click="editFarm(farm.id)">Edit</button>
          <button @click="deleteFarm(farm.id)">Delete</button>
        </li>
      </ul>
    </div>
        
    <!-- Form per aggiungere una nuova fattoria -->
    <div v-else-if="newFarmFormShow" class="content">
      <h1 class="rotate">ADD NEW FARM</h1>
      <input type="text" v-model="newFarmData.name" placeholder="Farm name">
      <input type="text" v-model="newFarmData.city" placeholder="Farm city">
      <div class="in-line">
        <button @click="toggleNewFarmShow">Cancel</button>
        <button @click="saveNewFarm">Save</button>
      </div>
    </div>

    <!-- Form per modificare una fattoria -->
    <div v-else-if="updateFarmFormShow" class="content">
      <h1 class="rotate">UPDATE FARM</h1>
      <input type="text" v-model="updateFarmData.name" placeholder="Farm name">
      <input type="text" v-model="updateFarmData.city" placeholder="Farm city">
      <div class="in-line">
        <button @click="toggleUpdateFarmShow">Cancel</button>
        <button @click="updateFarm">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

// Variabili di stato
const farms = ref([])
const farmShow = ref(true)
const newFarmFormShow = ref(false)
const updateFarmFormShow = ref(false)
const newFarmData = ref({
  name: '',
  city: ''
})
const updateFarmData = ref({})

// Funzione per aggiornare la lista delle fattorie
const updateData = () => {
  axios
    .get('http://localhost:8080/api/v1/farms')
    .then((res) => {
      farms.value = res.data
    })
    .catch((err) => {
      console.error('Error fetching data:', err)
    })
}

// Funzione per aggiungere dati di test
const addFarm = () => {
  axios.get('http://localhost:8080/api/v1/farmers/test/add').then(updateData).catch((err) => console.error('Error adding test data:', err))
}

// Funzione per salvare una nuova fattoria
const saveNewFarm = () => {
  axios.post('http://localhost:8080/api/v1/farms', newFarmData.value).then((res) => {
    const savedFarm = res.data
    farms.value.push(savedFarm)
    newFarmData.value = { name: '', city: '' }
    toggleNewFarmShow()
  }).catch((err) => {
    console.error('Error saving new farm:', err)
  })
}

// Funzione per modificare una fattoria
const editFarm = (id) => {
  const farm = farms.value.find(farm => farm.id === id)
  if (farm) {
    updateFarmData.value = { ...farm }
    farmShow.value = false
    updateFarmFormShow.value = true
  }
}

// Funzione per aggiornare una fattoria
const updateFarm = () => {
  axios.patch(`http://localhost:8080/api/v1/farms/${updateFarmData.value.id}`, updateFarmData.value).then(() => {
    updateData()
    toggleUpdateFarmShow()
  }).catch((err) => {
    console.error('Error updating farm:', err)
  })
}

// Funzione per cancellare una fattoria
const deleteFarm = (id) => {
  axios.delete(`http://localhost:8080/api/v1/farms/${id}`).then(() => {
    farms.value = farms.value.filter(farm => farm.id !== id)
  }).catch((err) => {
    console.error('Error deleting farm:', err)
  })
}

// Funzioni per mostrare/nascondere i form
const toggleNewFarmShow = () => {
  newFarmFormShow.value = !newFarmFormShow.value
  farmShow.value = !farmShow.value
}

const toggleUpdateFarmShow = () => {
  updateFarmFormShow.value = !updateFarmFormShow.value
  farmShow.value = !farmShow.value
}

// Caricare i dati all'avvio
onMounted(() => {
  updateData()
})
</script>

<style>
/* Aggiungi il tuo stile qui */
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
