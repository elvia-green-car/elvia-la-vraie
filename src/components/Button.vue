<template>
  <!-- TODO : resolve mix-blend-mode problem : mix-blend-difference-->
  <button class="relative group z-10">
    <span v-if="pin"
          class="absolute right-0 top-0 -translate-x-1/5 translate-y-1/5 w-3 xl:w-4 h-3 xl:h-4 rounded-full bg-white"/>
    <div :ref="ref" class="Btn relative flex items-center justify-center gap-4 btn-border overflow-hidden transition-all"
         :class="{'btn-bg': background, 'btn-round': type === 'round', 'btn-oval': type === 'oval', 'btn-square': type === 'square'}">
      <slot></slot>
      <span v-show="hover"
          class="group-hover:w-24 group-hover:h-24 origin-center transition-all ease-in-out -left-5 -bottom-10 absolute bg-white rounded-full w-1 h-1 z-0"/>
    </div>
  </button>
</template>

<script>

export default {
  name: "Button",
  components: {},
  props: {
    ref: String,
    type: {
      default: 'oval',
      type: String
    },
    background: {
      default: true,
      type: Boolean
    },
    hover: {
      default: false,
      type: Boolean
    },
    pin: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>