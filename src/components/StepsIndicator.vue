<template>
  <div class="flex flex-col justify-center items-center font-title text-14">
    <span>0{{ store.activeStepIndex + 1 }}</span>
    <span class="h-[1px] bg-white w-14 my-2"></span>
    <span>0{{ steps.length }}</span>
  </div>
</template>

<script>
import {useStore} from "../js/stores/global";

export default {
  name: "StepsIndicator",
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  props: {
    steps: Array,
  }
}
</script>

<style scoped>

</style>