<template>
    <div class="container">
        <div  v-if="!newFarmShow && !updateFarmShow" class="swhitch"><!--v-if 1-->
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images" alt="immagine-fattoria">
            <h1>Farm</h1>
            <button @click="addTestData">test add farmer and farm</button>
            <button @click="toggleNewFarmShow">add new farm</button>
            <ol>
                <li v-for="farm in farms" :key="farm.id">
                  <div class="li-separetor"><span>NAME: </span>{{ farm.name }}</div> <div class="li-separetor"><span>CITY: </span>{{ farm.city }}</div> 
                  <div class="li-separetor"><button @click="editFarm(farm.id)">edit farm</button></div>
                  <div class="li-separetor"><button @click="deleteFarm(farm.id)">delete farm</button></div>
                </li>

            </ol>

            <!-- ------------------------------------link cambio pagina---------------------------------- -->
            <div>
                <p>torna a farmer</p>
                <a href="http://localhost:5173/"><button>farmer</button></a>
            </div>
        </div>

        <!-- cambio schermo legato al bottone new farm -->
        <div v-if="newFarmShow" class="swhitch"><!-- v-if 1 -->
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images" alt="immagine-fattoria">
            <h1>New Farm</h1>
            <input v-model="newFarmData.name" type="text" placeholder="name">
            <input v-model="newFarmData.city" type="text" placeholder="city">
            <div>
                <button @click="toggleNewFarmShow">cancel</button>
                <button @click="saveNewFarm">save</button>
            </div>
        </div>

        <!-- cambio schermo legato al bottone edit farm -->
         <div v-if="updateFarmShow" class="swhitch">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images" alt="immagine-fattoria">
            <h1>Update Farm</h1>
            <input v-model="updateFarmData.name" type="text" placeholder="new name">
            <input v-model="updateFarmData.city" type="text" placeholder="new city">
            <button @click="toggleUpdateFarmShow">cancel</button>
            <button @click="updateFarm">save</button>
         </div>


    </div>
</template>

<!-- -------------------------SCRIPT---------------------------------------- -->

<script setup>
// dipendenze
import { onMounted, ref } from 'vue'
import axios from 'axios'

// variabili    
const farms = ref([])

const newFarmShow = ref(false)
const updateFarmShow = ref(false)
const updateFarmData = ref({})
const newFarmData = ref({
  name: '',
  city: ''
})

// funzione per leggere le farm richiamata con onMounted a fine pagina
const updateData = ()=>{
    axios
    .get('http://localhost:8080/api/v1/farms')
    .then((response) =>{
        farms.value = response.data
    })

    .catch((error) =>{
        console.log('ERROR ' + error)
    })
}

// funzione che punta al test add di farmer che aggiunge 4 farmer e 2 farm fake per le prove
const addTestData = ()=>{
    axios
    .get('http://localhost:8080/api/v1/farmers/test/add')
    .then(updateData)
    .catch((error) =>{
        console.log('ERROR ' + error)
    })
}

// cambio schermo new farm
const toggleNewFarmShow = ()=>{
    newFarmShow.value = !newFarmShow.value
}

// cambio schermo edit farm
const toggleUpdateFarmShow = ()=>{
    updateFarmShow.value = !updateFarmShow.value
}

// funzione che punta alla rotta per creare una nuova farm
const saveNewFarm = ()=>{
    axios
    .post('http://localhost:8080/api/v1/farms', newFarmData.value).then((response)=>{

        const savedFarm = response.data
        farms.value.push(savedFarm)
        newFarmData.value = {
        name: '',
        city: ''
        }
        
        toggleNewFarmShow()
    })
}

// funzione per modificare la farm esistente
const editFarm = (id) => {
  for (let x = 0; x < farms.value.length; x++) {
    const farm = farms.value[x]

    if (farm.id === id) {
      updateFarmData.value = farm
      break
    }
  }
  updateFarmShow.value = true
}

// funzione che crea l oggetto axiosData da usare nel patch dell axios sotto
const updateFarm = () => {
  const axiosData = {
    name: updateFarmData.value.name,
    city: updateFarmData.value.city
  }

// funzione che punta alla rotta per la modifica
  axios
    .patch('http://localhost:8080/api/v1/farms/' + updateFarmData.value.id, axiosData)
    .then(() => {
      updateData()
      toggleUpdateFarmShow()
    })
}

// funione che puntando alla rotta delete ci permette di rimuovere una fattoria
const deleteFarm = (id) => {
  axios.delete('http://localhost:8080/api/v1/farms/' + id).then(() => {
    farms.value = farms.value.filter((farm) => farm.id !== id)
  })
}

// l' onMounted che richiama updateData per caricare la lista di fattorie
onMounted(() => {
  updateData()
})

</script>

<!-- ---------------------------------STYLE---------------------------------- -->
<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        width: 100vw;
        overflow-x: hidden;
        background-color: black;
    }

    .container{
        width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .swhitch{
        text-align: center;
        background-color: lightgreen;
        padding: 30px;
        min-height: 100vh;
        position: absolute;
        top: 0;
        border-radius: 16px;
    }

    img{
        width: 25vw;
    }

    button{
        border-radius: 16px;
        border: none;
        background-color: rgb(30, 253, 0);
        padding: 5px;
        margin: 5px;
        cursor: pointer;
    }

    ol{
        position: relative;
        width: 28vw;
    }

    .li-separetor{
        display: inline-block;
        width: 13vw;
    }

    .li-separetor2{
        display: inline-block;
        width: 15vw;
    }

    span{
        color: red;
    }

    li{
        border: 1px solid black;
        border-radius: 16px;
        margin: 5px 0 5px 0;
        padding: 2px;
    }

    input{
        border-radius: 16px;
        padding: 2px;
        text-align: center;
        margin: 5px;
    }

    p{
        margin-top: 80px;
        font-size: 12px;
    }
</style>