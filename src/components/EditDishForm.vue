<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type {dish} from '@/types'
import { useDishStore } from '@/stores/DishStore';

const props = defineProps<{
    dishId?: string
}>()

const dishStore = useDishStore()

const emits = defineEmits<{
    (e: 'update-dish', updatedDish: dish): void
    (e: 'cancel-edit-dish'): void
}>()

const editDish = ref<dish | null>(null)

watch(() => props.dishId, (newId) => {
    if (newId) {
        const found = dishStore.getDishById(newId)
        if (found) {
            editDish.value = { ...found }
        }
    }
}, { immediate: true })

const updateDish = () => {
    if (editDish.value) {
        emits('update-dish', editDish.value)
    }
}

const elDishNameInput = ref<HTMLInputElement | null>(null)

onMounted(() =>{
  elDishNameInput.value?.focus()
})

</script>

<template>
  <form @submit.prevent>
    <div class="field">   
      <div class="field">
        <label for="name" class="label">Edit Name</label>
        <div class="control">
          <input
                v-model="editDish.name"
                type="text"
                class="input is-large"
                placeholder="Dish name"
                required
                ref="elDishNameInput"
                @keyup.enter.prevent="updateDish"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
            <button type="button" @click="updateDish" class="button is-success">Update</button>
            <button type="button" @click="$emit('cancel-edit-dish')" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
