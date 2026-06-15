import { defineStore } from 'pinia'
import type { dish } from '@/types'

type StateShape = {
    list: dish[]
}

export const useDishStore = defineStore('DishStore', {
    state: (): StateShape => ({
        list: [
            {
                id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
                name: 'Ghost Pepper Poppers',
                status: 'Want to Try',
            },
            {
                id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
                name: 'A Little More Chowder Now',
                status: 'Recommended',
            },
            {
                id: 'c113411d-1589-414f-a283-daf7eedb631e',
                name: 'Full Laptop Battery',
                status: 'Do Not Recommend',
            },
        ]
    }),

    getters: {
        numberOfDishes: (state): number => state.list.length,
        
        getDishById: (state) => {
            return (editDishId: string): dish => {
                return state.list.filter((dish: dish) => dish.id === editDishId)[0]
            }
        }
    },
    actions: {
        addDish(payload: dish) {
            this.list.push(payload)
        },
        deleteDish(payload: dish) {
            this.list = this.list.filter(d => d.id !== payload.id)
        },
        updateDish(updatedDish: dish) {
            const index = this.list.findIndex(d => d.id === updatedDish.id)
            if (index !== -1) {
                this.list[index] = updatedDish
            }
        }
    }
})