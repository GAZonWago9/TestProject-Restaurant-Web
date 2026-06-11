<script>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  components: {
    TheNavbar,
    TheFooter,
  },
  data: ()  => ({
    tagline: 123,
  }),
}
</script>

<template>
  <TheNavbar :tagline="tagline"/>
  <RouterView />
  <TheFooter />
</template>

<style></style>
