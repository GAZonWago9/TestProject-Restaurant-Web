<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import type { dish } from '@/types'
import { useDishStore } from '@/stores/DishStore'

const dishStore = useDishStore()
const { list: dishList } = storeToRefs(dishStore)

const filterText = ref('')
const showNewForm = ref(false)

const filteredDishList = computed(() => {
  if (!filterText.value) return dishList.value
  return dishList.value.filter(dish =>
    dish.name.toLowerCase().includes(filterText.value.toLowerCase())
  )
})

const numberOfDishes = computed(() => filteredDishList.value.length)

const addDish = (payload: dish) => {
  dishStore.addDish(payload)
  hideForm()
}

const deleteDish = (payload: dish) => {
  dishStore.deleteDish(payload)
}

const hideForm = () => {
  showNewForm.value = false
}

const updateFilterText = (event: KeyboardEvent) => {
  filterText.value = (event.target as HTMLInputElement).value
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
      <SideMenu />

      <div class="column">
        <h1 class="title">Dishes</h1>

        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Dish name"
                    :value="filterText"
                    @keyup.enter="updateFilterText"
                  />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <NewDishForm
          v-if="showNewForm"
          @add-new-dish="addDish"
          @cancel-new-dish="hideForm"
        />

        <div v-else class="columns is-multiline">
          <div
            v-for="item in filteredDishList"
            :key="item.id"
            class="column is-full"
          >
            <DishCard :dish="item" @delete-dish="deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>