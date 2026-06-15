<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import type { dish } from '@/types'
import { useDishStore } from '@/stores/DishStore'
import EditDishForm from '@/components/EditDishForm.vue'


const dishStore = useDishStore()
const { list: dishList } = storeToRefs(dishStore)

type ShowFormState = '' | 'new' | 'edit'

const filterText = ref('')
const showForm = ref<ShowFormState>('')

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

const updateDish = (updatedDish: dish) => {
    dishStore.updateDish(updatedDish)
    hideForm() 
}

const editDishForm = (payload: dish) => {
  showForm.value = 'edit'
  editDishId.value = payload.id
}

const editDishId = ref()

const hideForm = () => {
  showForm.value = ''
}

const updateFilterText = (event: KeyboardEvent) => {
  filterText.value = (event.target as HTMLInputElement).value
}

const cancelEdit = () => {
  showForm.value = ''
}

onMounted(() => {
  const route = useRoute()
  if (route.query.new) {
    showForm.value = 'new'
  } else if (route.query.edit) {
    showForm.value = 'edit'
  }
})
</script>

<template>
  <main class="section">
    <div class="columns">
      <SideMenu />

      <div class="column">
        <h1 class="title">Dishes</h1>

        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
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
          v-if="showForm ==='new'"
          @add-new-dish="addDish"
          @cancel-new-dish="hideForm"
        />
        
        <EditDishForm
          v-else-if="showForm === 'edit'"
          :dishId="editDishId"
          @update-dish="updateDish"
          @cancel-edit-dish="cancelEdit"
        />

        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" :key="item.id" class="column is-full">
            <DishCard :dish="item" @edit-dish="editDishForm"
            @delete-dish="deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>