<template>
  <div class="flex flex-col">
    <div class="flex justify-end items-center gap-3" v-for="(step, index) in steps" @click="stepClicked($event, step)">
      <span :class="[step === activeStep ? '' : 'hidden']">0{{ index + 1 }} - {{ step }}</span>
      <span :class="[step === activeStep ? 'h-[10px]' : 'h-[2px] my-2', 'transition-all ease-in-out w-16 bg-white']"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    activeStep: String,
    steps: Array
  },
  methods:{
    stepClicked($e, step) {
      console.log('step clicked', step)
      this.$emit('stepSelected', step)
    }
  }
}
</script>

<style scoped>

</style>