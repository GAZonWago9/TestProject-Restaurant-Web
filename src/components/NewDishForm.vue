<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type {dish} from '@/types'

const emits = defineEmits<{
  (e: 'add-new-dish', dish: dish): void
  (e: 'cancel-new-dish'): void
}>()

const newDish = ref<dish>({
  id: uuidv4(),
  name: '',
  status: 'Want to Try',
  diet:'',
})

const elDishNameInput = ref<HTMLInputElement | null>(null)

onMounted(() =>{
  elDishNameInput.value?.focus()
})

const addNewDish = () => {
  emits('add-new-dish', newDish.value)
}
const cancelNewDish = () => {
  emits('cancel-new-dish')
}

</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="newDish.name"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            required
            ref="elDishNameInput"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="addNewDish" class="button is-success">Create</button>
          <button @click="cancelNewDish" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
