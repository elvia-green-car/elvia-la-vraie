<template>
  <div ref="home" class="w-full h-auto bg-gradient-yellow">
    <canvas ref="canvas" class="absolute top-0 left-0 z-0 w-full h-full" id="app-canvas"/>
    <Menu/>
    <header class="fixed flex gap-8 top-0 right-0 p-10 xl:p-12 z-30">
      <Button :round="true" :pin="store.cart.length > 0">
        <Cart class="w-6 h-6"/>
      </Button>
      <Button round="true">
        <Account class="w-6 h-6"/>
      </Button>
      <Button @click.native="store.isMenuOpen = !store.isMenuOpen" :round="!!store.isMenuOpen">
        <span v-if="!store.isMenuOpen">Menu</span>
        <Close class="w-6 h-6" v-if="store.isMenuOpen"/>
      </Button>
    </header>
    <Breadcrumb class="fixed z-10 top-1/2 -translate-y-1/2 right-0 p-10 xl:p-12" :steps="store.landingSteps"
                @step-selected="updateSteps"/>
    <StepsIndicator class="fixed z-10 bottom-0 right-0 p-10 xl:p-12" :steps="store.landingSteps"/>
    <Scroll ref="scroll" class="animate-spin-slow fixed z-10 bottom-0 left-0 w-40 h-40 m-10 xl:m-12"/>
    <div class="flex justify-center items-center w-32 h-32 fixed z-10 bottom-0 left-0 w-40 h-40 m-10 xl:m-12">
      <Arrow class="w-10 h-10 rotate-90"/>
    </div>
    <div class="h-screen w-full"></div>
    <div class="h-screen w-full"></div>
  </div>
</template>

<script>
import {useStore} from "../js/stores/global";

import Menu from "./landing/Menu.vue";
import Button from "./Button.vue";
import StepsIndicator from "./StepsIndicator.vue";
import Breadcrumb from "./Breadcrumb.vue";

import Account from "/public/svg/account.svg?component"
import Cart from "/public/svg/cart.svg?component"
import Close from '/public/svg/cross.svg?component'
import Scroll from '/public/svg/scrolltodiscover.svg?component'
import Arrow from '/public/svg/arrow.svg?component'

export default {
  name: "Home",
  components: {Breadcrumb, StepsIndicator, Button, Menu, Account, Cart, Close, Scroll, Arrow},
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  mounted() {
    this.store.isLoading = false
    this.store.activeStep = this.store.landingSteps[0]
  },
  methods: {
    updateSteps(index) {
      this.store.activeStepIndex = index
      this.store.activeStep = this.store.landingSteps[index]
    },
  }
}
</script>

<style scoped>

</style>