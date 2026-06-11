<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import NewRestaurantForm from '../components/NewRestaurantForm.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import SideMenu from '../components/SideMenu.vue'
import type {Restaurant} from "@/types"
import { useRestaurantStore} from "@/stores/RestaurantStore"
import { storeToRefs } from 'pinia'


/**
 * Restaurant Module
 */

const restaurantStore = useRestaurantStore()
const { list: restaurantList } = storeToRefs(restaurantStore)

const filteredRestaurantList = computed(() => {
  if (!filterText.value) return restaurantList.value
  return restaurantList.value.filter(restaurant =>
    restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
  )
})

const numberOfRestaurants = computed(() => filteredRestaurantList.value.length)

const addRestaurant = (payload: Restaurant) => {
  restaurantStore.addRestaurant(payload)
  hideForm()
}

const deleteRestaurant = (restaurant: Restaurant) => {
  restaurantStore.deleteRestaurant(restaurant)
}

// const numberOfRestaurants = computed((): Number => {
//   return filteredRestaurantList.value.length
// })

/**
 *  New Form Module
 */

const filterText= ref('')

const showNewForm = ref(false)

const hideForm = () => {
  showNewForm.value = false
}

onMounted(() => {
  const route = useRoute()

  if (route.query.new) {
    showNewForm.value = true
  }
})

</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Restaurants</h1>

        <!-- CTA Bar -->
        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfRestaurants }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Restaurant name" v-model="filterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Restaurant Form -->
        <NewRestaurantForm 
          v-if="showNewForm" 
          @add-new-restaurant="addRestaurant" 
          @cancel-new-restaurant="hideForm" 
        />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredRestaurantList" :key="item.id" class="column is-full">
            <RestaurantCard :restaurant="item" @delete-restaurant="deleteRestaurant" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
