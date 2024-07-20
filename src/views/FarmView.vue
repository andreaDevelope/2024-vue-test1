<template>
    <div class="container">
        <div  v-if="!newFarmShow" class="swhitch"><!--v-if 1-->
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images" alt="immagine-fattoria">
            <h1>Farm</h1>
            <button @click="addTestData">test add farmer and farm</button>
            <button @click="toggleNewFarmShow">add new farm</button>
            <ol>
                <li v-for="farm in farms" :key="farm.id">
                  <div class="li-separetor"><span>NAME: </span>{{ farm.name }}</div> <div class="li-separetor"><span>CITY: </span>{{ farm.city }}</div> 
                </li>

            </ol>
        </div>

        <!-- cambio schermo legato al bottone new farm -->
        <div v-if="newFarmShow" class="swhitch"><!-- v-if 1 -->
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images" alt="immagine-fattoria">
            <h1>New Farm</h1>
            <input v-model="newFarmData.name" type="text" placeholder="new name">
            <input v-model="newFarmData.city" type="text" placeholder="new city">
            <div>
                <button @click="toggleNewFarmShow">cancel</button>
                <button @click="saveNewFarm">save</button>
            </div>
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
const newFarmData = ref({
  name: '',
  city: ''
})

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

const addTestData = ()=>{
    axios
    .get('http://localhost:8080/api/v1/farmers/test/add')
    .then(updateData)
    .catch((error) =>{
        console.log('ERROR ' + error)
    })
}

const toggleNewFarmShow = ()=>{
    newFarmShow.value = !newFarmShow.value
}

// const toggleUpdateFarmShow = ()=>{
//     updateFarmShow.value = !updateFarmShow
// }

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
        overflow: hidden;
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
        height: 100vh;
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
</style>