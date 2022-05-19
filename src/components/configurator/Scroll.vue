<template>
  <div class="flex flex-col gap-3">
    <In class="w-6 h-6"/>
    <span class="btn-border btn-oval btn-bg">
      <span class="block w-[1px] h-6"/>
    </span>
    <Out class="w-6 h-6"/>
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