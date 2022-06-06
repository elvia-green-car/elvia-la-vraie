<script setup>
import Loader from "./components/Loader.vue";
</script>

<template>
  <a href="/" class="absolute p-12 xl:p-16 font-title font-bold text-14 uppercase z-20">Elvia</a>
  <Loader/>
  <router-view></router-view>
</template>
