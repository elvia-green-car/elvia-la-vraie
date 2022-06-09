<script setup>
import Loader from "./components/Loader.vue";

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
}
</script>

<template>
  <div class="fixed top-0 left-0 p-12 xl:p-16 font-title font-bold text-14 uppercase z-40">
    <router-link to="/">Elvia</router-link>
  </div>
  <Loader/>
  <router-view></router-view>
</template>
