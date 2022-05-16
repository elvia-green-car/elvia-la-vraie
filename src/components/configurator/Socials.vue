<template>
  <div class="flex gap-4 items-center">
    <Share class="w-8 h-8"/>
    <div class="flex gap-6 btn-border btn-oval btn-bg">
      <a href="" target="_blank">
        <Facebook class="w-6 h-6"/>
      </a>
      <a href="" target="_blank">
        <Instagram class="w-6 h-6"/>
      </a>
      <a href="" target="_blank">
        <Linkedin class="w-6 h-6"/>
      </a>
      <a href="" target="_blank">
        <Twitter class="w-6 h-6"/>
      </a>
    </div>
  </div>
</template>

<script>
import Share from "/public/svg/share.svg?component"
import Facebook from "/public/svg/facebook.svg?component"
import Instagram from "/public/svg/instagram.svg?component"
import Linkedin from "/public/svg/linkedin.svg?component"
import Twitter from "/public/svg/twitter.svg?component"

export default {
  name: "Socials",
  components: {Share, Facebook, Instagram, Linkedin, Twitter}
}
</script>

<style scoped>

</style>