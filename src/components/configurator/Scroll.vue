<template>
  <div class="flex flex-col gap-3">
    <More class="w-6 h-6"/>
    <span class="btn-border btn-oval btn-bg">
      <span class="block w-[1px] h-6"/>
    </span>
    <Less class="w-6 h-6"/>
  </div>
</template>

<script>
import More from "/public/svg/more.svg?component"
import Less from "/public/svg/less.svg?component"

export default {
  name: "Scroll",
  components: {More, Less}
}
</script>

<style scoped>

</style>