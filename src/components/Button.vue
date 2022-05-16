<template>
  <button class="flex gap-4 btn-border"
      :class="{'btn-bg': background, 'btn-round': round, 'btn-oval': !round}">
    <Arrow v-if="icon === 'arrow'" class="w-6 h-6"/>
    <Download v-if="icon === 'download'" class="w-6 h-6"/>
    <Arrow v-if="icon === 'close'" class="w-6 h-6"/>
    {{ text }}
  </button>
</template>

<script>
import Arrow from '/public/svg/arrow.svg?component'
import Download from '/public/svg/download.svg?component'
//import Close from '/public/svg/close.svg?inline'

export default {
  name: "Button",
  components: {
    Arrow,
    Download,
    //Close
  },
  props: {
    text: String,
    icon: String,
    round: {
      default: false,
      type: Boolean
    },
    background: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>