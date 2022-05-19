<template>
  <div class="flex flex-col justify-between gap-3" :class="{'items-start': reverse,'items-end': !reverse}">
    <div v-for="(d,index) in data" :key="index"
         class="flex flex-col items-center gap-2 xl:gap-8 font-bold"
         :class="{'xl:flex-row-reverse': reverse, 'xl:flex-row': !reverse}">
      <span>{{ d.name }}</span>
      <span class="relative block w-40 h-[1px] bg-white">
        <span class="absolute right-0 top-1/2 -translate-y-1/2 h-[3px] bg-white rounded-full transition-all ease-in-out"
              :style="{'width': d.rate + '%'}"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rates",
  props: {
    data: Object,
    reverse: Boolean
  }
}
</script>

<style scoped>

</style>