<template>
  <div class="absolute top-1/2 -translate-y-1/2 flex items-center text-16 gap-4">
    <div class="flex flex-col items-center gap-4">
      <In class="w-6 h-6"/>
      <span class="btn-border p-4 btn-bg">
        <span class="block bg-white w-[1px] h-4"/>
      </span>
      <Out class="w-6 h-6"/>
    </div>
    <span>Scroll</span>
  </div>
</template>

<script>
import In from "/public/svg/zoom-in.svg?component"
import Out from "/public/svg/zoom-out.svg?component"

export default {
  name: "Scroll",
  components: {In, Out}
}
</script>

<style scoped>

</style>