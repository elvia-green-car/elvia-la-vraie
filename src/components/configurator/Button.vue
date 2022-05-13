<template>
  <button class="rounded-full border border-white px-4 py-2 lg:px-8 lg:py-4"
      :class="{'bg-white bg-opacity-10': background}">
    <!--Arrow v-if="icon === 'arrow'" class="w-6 h-6"/-->
    <!--Arrow v-if="icon === 'close'" class="w-6 h-6"/-->
    {{ text }}
  </button>
</template>

<script>
import Arrow from '/public/svg/arrow.svg?inline'
//import Close from '/public/svg/close.svg?inline'

export default {
  name: "Button",
  components: {
    Arrow,
    //Close
  },
  props: {
    text: String,
    icon: String,
    background: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>