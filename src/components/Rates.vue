<template>
  <div class="flex flex-col justify-between items-end gap-3">
    <div class="flex items-center gap-8 font-bold" v-for="d in data">
      <span>{{ d.name }}</span>
      <span class="relative block w-40 h-[1px] bg-white">
        <span class="absolute right-0 top-1/2 -translate-y-1/2 h-[3px] bg-white rounded-full"
              :style="{'width': d.rate + '%'}"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rates",
  props: {
    data: Object
  }
}
</script>

<style scoped>

</style>