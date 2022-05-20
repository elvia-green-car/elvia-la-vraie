<template>
  <div class="flex flex-col">
    <div class="flex justify-end items-center gap-3" v-for="(step, index) in store.steps" :key="index" @click="stepClicked($event, step, index)">
      <span :class="[step === activeStep ? 'capitalize' : 'hidden']">0{{ index + 1 }} - {{ step }}</span>
      <span :class="[step === activeStep ? 'h-[10px]' : 'h-[2px] my-2', 'hover:h-[7px] transition-all ease-in-out w-16 bg-white']"/>
    </div>
  </div>
</template>

<script>
import {useStore} from "../../js/stores/global";

export default {
  name: "Breadcrumb",
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  props: {
    activeStep: String,
  },
  methods:{
    stepClicked($e, step, index) {
      this.$emit('stepSelected', index)
    }
  }
}
</script>

<style scoped>

</style>