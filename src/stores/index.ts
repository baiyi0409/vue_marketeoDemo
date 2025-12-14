import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user',() => {
  // Setup Store
  const isAuthenticated = ref(false);
  const user = ref(null);
  return {user}
})