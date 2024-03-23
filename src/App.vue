<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'src/router/routes.js'

export default {
  name: 'App',
  setup() {
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes
    })

    return {
      router
    }
  }
}
</script>
