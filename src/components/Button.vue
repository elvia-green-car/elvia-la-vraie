<template>
  <button class="bg-opacity-10 bg-white px-4 py-2 lg:px-8 lg:py-4 rounded-full border border-white">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    arrow: Boolean
  }
}
</script>

<style scoped>

</style>