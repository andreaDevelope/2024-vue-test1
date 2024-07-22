<template>
    <div class="container">
        <div v-if="!newFarmerShow && !updateFarmerShow" class="swhitch">
            <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images"
            alt="immagine-fattoria"
            />
            <h1>Farmer</h1>
            <button @click="addTestData">test add farmer and farm</button>
            <button @click="toggleNewFarmerShow">add new farmer</button>
            <ol>
            <li v-for="farmer in farmers" :key="farmer.id">
                <div class="li-separetor2"><span>NAME: </span>{{ farmer.name }}</div> 
                <div class="li-separetor2"><span>SURNAME: </span>{{ farmer.surname }}</div> 
                <div class="li-separetor2"><span>AGE: </span>{{ farmer.age }}</div>
                <div class="li-separetor2"><span>FARM NAME: </span>{{farmer.farm.name }}</div>
                <div class="li-separetor2"><span>FARM CITY: </span>{{farmer.farm.city }}</div>

                <div class="li-separetor2">
                    <button @click="editFarmer(farmer.id)">EDIT</button>
                    <button @click="deleteFarmer(farmer.id)">DELETE</button>
                </div>
            </li>
            </ol>
    
            <!-- -------------------------------link cambio pagina---------------------------------- -->
            <div>
            <p>vai a farm</p>
            <a href="http://localhost:5173/farm"><button>farm</button></a>
            </div>
        </div>
  
        <!-- cambio schermo legato al bottone new farm -->
        <div v-if="newFarmerShow" class="swhitch">
            <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images"
            alt="immagine-fattoria"
            />
            <h1>New Farmer</h1>
            <input v-model="newFarmerData.name" type="text" placeholder="name" />
            <input v-model="newFarmerData.surname" type="text" placeholder="surname" />
            <input v-model="newFarmerData.age" type="text" placeholder="age" />
            <select v-model="newFarmerData.farmId">
                <option v-for="farm in farms" :key="farm.id" :value="farm.id">
                    {{ farm.name }} ({{ farm.city }})
                </option>
            </select> 
            <div>
                <button @click="toggleNewFarmerShow">cancel</button>
                <button @click="saveNewFarmer">save</button>
            </div>
        </div>

        <!-- cambio schermo legato al bottone edit farm -->
        <div v-if="updateFarmerShow" class="swhitch">
            <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qGo0IrBjfJ9uFguGHfoM9wAAAA%26pid%3DApi&f=1&ipt=4168865cb3d14fda95ca7359b0ee1e90d7c3d4d572702fdd6dd0e8349fc252de&ipo=images"
            alt="immagine-fattoria"
            />
            <h1>Update Farmer</h1>
            <input v-model="updateFarmerData.name" type="text" placeholder="new name" />
            <input v-model="updateFarmerData.surname" type="text" placeholder="new surname" />
            <input v-model="updateFarmerData.age" type="text" placeholder="new age" />
            <select v-model="updateFarmerData.farmId">
                <option v-for="farm in farms" :key="farm.id" :value="farm.id">
                    {{ farm.name }} ({{ farm.city }})
                </option>
            </select>
            <div>
                <button @click="toggleUpdateFarmerShow">CANCEL</button>
                <button @click="updateFarmer">SAVE</button>
            </div>
        </div>
    </div>
  </template>
  
  <!-- --------------------------------------------SCRIPT--------------------------------------------------- -->
<script setup>
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  
  // VARIABILI
  const newFarmerShow = ref(false)
  const updateFarmerShow = ref(false)
  
  const farms = ref([])
  const farmers = ref([])
  
  const newFarmerData = ref({
    name: '',
    surname: '',
    age: 0,
    farmId: 0,
  })
  const updateFarmerData = ref({})
  
  // EVENTI
  const addTestData = () => {
    axios.get('http://localhost:8080/api/v1/farmers/test/add').then(updateData)
  }
  
  const updateData = () => {
    axios
      .get('http://localhost:8080/api/v1/farmers')
      .then((response) => {
        farmers.value = response.data
        console.log(response.data)

      })
      
    axios
    .get('http://localhost:8080/api/v1/farms')
    .then((response) => {
      console.log(response.data)
      farms.value = response.data
    })
  }
  
  // FUNCTION
  const toggleNewFarmerShow = () => {
    newFarmerShow.value = !newFarmerShow.value
  }
  
  const toggleUpdateFarmerShow = () => {
    updateFarmerShow.value = !updateFarmerShow.value
  }
  
  const saveNewFarmer = () => {
    console.log(JSON.stringify(newFarmerData.value, null, 2)) //stampa il json indentato
  
    axios.post('http://localhost:8080/api/v1/farmers', newFarmerData.value).then((response) => {
      const savedFarmer = response.data
      farmers.value.push(savedFarmer)
      newFarmerData.value = {
        name: '',
        surname: '',
        age: 0,
        farmId: 0,
      }
      toggleNewFarmerShow()
    })
  }
  
  const editFarmer = (id) => {
    for (let i = 0; i < farmers.value.length; i++) {
      const farmer = farmers.value[i];
  
      if (farmer.id === id) {
        updateFarmerData.value = farmer;
        console.log('updateFarmerData: ' + JSON.stringify(updateFarmerData.value, null, 2));
  
        if (farmer.farm) {
          updateFarmerData.value.farmId = farmer.farm.id;
        }
        break;
      }
    }
  
    console.log('updateFarmerData: ' + JSON.stringify(updateFarmerData.value, null, 2));
    updateFarmerShow.value = true;
  }
  
  const updateFarmer = () => {
    const axiosData = {
      name: updateFarmerData.value.name,
      surname: updateFarmerData.value.surname,
      age: updateFarmerData.value.age,
      farmId: updateFarmerData.value.farmId
    }
  
    axios
      .patch('http://localhost:8080/api/v1/farmers/' + updateFarmerData.value.id, axiosData)
      .then(() => {
        updateData()
        updateFarmerShow.value = false
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }
  
  const deleteFarmer = (id) => {
    axios
      .delete('http://localhost:8080/api/v1/farmers/' + id)
      .then(() => {
        farmers.value = farmers.value.filter((farmer) => farmer.id !== id)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }
  
  
  onMounted(updateData)
</script>
  
  