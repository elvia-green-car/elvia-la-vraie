<template>
  <!-- TODO : resolve mix-blend-mode problem : mix-blend-difference-->
  <button :ref="ref" class="Btn relative flex items-center justify-center gap-4 btn-border overflow-hidden"
          :class="{'btn-bg': background, 'btn-round': round, 'btn-oval': !round}">
    <component :is="icon" class="w-6 h-6 z-10" :class="{'rotate-180': rotate}"/>
    <span v-if="text" class=" z-10">{{ text }}</span>
    <span
        class="Btn__bg origin-center transition-all ease-in-out -left-5 -bottom-10 absolute bg-white rounded-full w-1 h-1 z-0"/>
  </button>
</template>

<script>
import Arrow from '/public/svg/arrow.svg?component'
import ArrowSlider from '/public/svg/slider-arrow.svg?component'
import Download from '/public/svg/download.svg?component'
import Close from '/public/svg/cross.svg?component'

export default {
  name: "Button",
  components: {
    Arrow,
    Download,
    Close,
    ArrowSlider
  },
  props: {
    ref: String,
    text: String,
    icon: String,
    round: {
      default: false,
      type: Boolean
    },
    background: {
      default: true,
      type: Boolean
    },
    rotate: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>