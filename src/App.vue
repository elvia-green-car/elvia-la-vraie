<script setup>
import Loader from "./components/Loader.vue";
</script>

<template>
  <div class="fixed top-0 left-0 p-12 xl:p-16 font-title font-bold text-14 uppercase z-20">
    <router-link to="/">Elvia</router-link>
  </div>
  <Loader/>
  <router-view></router-view>
</template>
