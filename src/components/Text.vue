<template>
  <div class="flex gap-7 max-w-xs before:content-[''] before:block before:w-[2px] before:bg-white before:my-[5%]">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "Text"
}
</script>

<style scoped>

</style>