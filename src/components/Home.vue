<template>
  <div ref="home" class="w-full h-auto bg-gradient-yellow">
    <canvas ref="canvas" id="app-canvas" class="absolute top-0 left-0 z-0 w-full h-full pointer-events-none"/>
    <Menu/>
    <header class="fixed flex gap-8 top-0 right-0 p-10 xl:p-12 z-30">
      <Button type="round" :pin="store.cart.length > 0">
        <Cart class="w-6 h-6"/>
      </Button>
      <Button type="round">
        <Account class="w-6 h-6"/>
      </Button>
      <Button @click.native="store.isMenuOpen = !store.isMenuOpen" :type="store.isMenuOpen ? 'round' : 'oval'">
        <span v-if="!store.isMenuOpen">Menu</span>
        <Close class="w-6 h-6" v-if="store.isMenuOpen"/>
      </Button>
    </header>
    <Breadcrumb class="fixed z-10 top-1/2 -translate-y-1/2 right-0 p-10 xl:p-12" :steps="store.landingSteps"
                @step-selected="updateSteps"/>
    <StepsIndicator class="fixed z-10 bottom-0 right-0 p-10 xl:p-12" :steps="store.landingSteps"/>
    <Scroll ref="scroll" class="animate-spin-slow fixed z-10 bottom-0 left-0 w-36 h-36 m-10 xl:m-12"/>
    <div class="flex justify-center items-center fixed z-10 bottom-0 left-0 w-36 h-36 m-10 xl:m-12">
      <Arrow class="w-10 h-10 rotate-90"/>
    </div>
    <!-- Scrooooooll -->
    <main ref="main" class="w-full h-full">
      <section class="section text-center max-w-xl mx-auto flex flex-col items-center justify-around">
        <div class="text">
          <h1 class="font-title font-bold uppercase text-80">Elvia</h1>
          <span>Le nouveau poumon de la Terre</span>
        </div>
        <p>
          Grâce à une technologie de pointe et un design innovant, Elvia réconcilie automobile et nature. Elvia
          fusionne avec son environnement en purifiant l’air qui l’entoure et en s’intégrant parfaitement aux paysages
          qu’elle traverse.
        </p>
      </section>
      <section class="section grid grid-cols-3 gap-10 px-16">
        <ul class="col-span-1 text-right flex flex-col gap-10 justify-center items-end">
          <li class="group flex gap-4 items-center">
            <span class="transition-opacity opacity-0 group-hover:opacity-100">Créez votre configuration de plantes parmi une sélection des plus diversifiée</span>
            <Button type="round">
              <Flower class="w-12 h-12"/>
            </Button>
          </li>
          <li class="group flex gap-4 items-center mr-16">
            <span class="transition-opacity opacity-0 group-hover:opacity-100">Absorbez 95% du C02 que vous émettez pour rejeter 100% d’oxygène</span>
            <Button type="round">
              <Wind class="w-12 h-12"/>
            </Button>
          </li>
          <li class="group flex gap-4 items-center">
            <span class="transition-opacity opacity-0 group-hover:opacity-100">Partout où vous voyagez, rafraîchissez l’environnement</span>
            <Button type="round">
              <Snow class="w-12 h-12"/>
            </Button>
          </li>
        </ul>
        <div class="col-span-1 col-start-2 flex justify-center items-end">
          <router-link to="/configurator" class="mb-10 lg:mb-20">
            <Button type="round">
              Configurer ma voiture
            </Button>
          </router-link>
        </div>
      </section>
      <section class="section">
        <div class="absolute top-[20%] right-[7%]">
          <div class="relative max-w-sm">
            <Thread class="absolute -left-7 -bottom-1/2 -translate-x-full w-40"/>
            <p class="w-60">Un système d’irriguation récupérant les eaux de pluie pour offrir à vos plantes une eau
              des plus naturelle.</p>
          </div>
        </div>
        <div class="absolute top-1/2 left-[2%]">
          <div class="relative">
            <Thread class="absolute -right-7 -top-1/2 translate-x-full w-40 rotate-180"/>
            <p class="w-60 text-right ml-auto">Un terreau biologique naturel qui apportera tous les nutriments et
              minéraux
              indispensables à une bonne pousse.</p>
          </div>
        </div>
        <div class="absolute flex gap-7 max-w-sm bottom-[10%] left-1/3 -translate-x-1/2
              before:content-[''] before:block before:w-[2px] before:bg-white before:my-[5%]">
          <p> Toute notre technologie est concentrée en une seule voiture et veille au bien-être de vos plantes, vous
            rendant ainsi complétement autonome. Elvia est conçue pour durer.</p>
        </div>
      </section>
      <section class="section grid grid-cols-3 gap-10 px-16">
        <ul class="col-span-1 flex flex-col gap-10 justify-center">
          <li class=" flex gap-9 items-center">
            <Button type="square">
              <Water class="w-14 h-14"/>
            </Button>
            <span>Un système d’irriguation unique qui vous permettra d’approvisionner en eau vos plantes sans dépenser la moindre pièce puisqu’Elvia récupère toutes les eaux de pluie pour les redistribuer méthodiquement à l’ensemble des plantes. </span>
          </li>
          <li class=" flex gap-9 items-center">
            <Button type="square">
              <Engine class="w-14 h-14"/>
            </Button>
            <span>Une motorisation des plus performante : une consommation très faible pour une puissance inégalée. Avec Elvia, sobriété et plaisir s’accordent. </span>
          </li>
        </ul>
      </section>
      <section class="section flex justify-center items-center">
        <div class="absolute flex gap-7 max-w-xs top-1/3 left-1/4 -translate-x-1/2
              before:content-[''] before:block before:w-[2px] before:bg-white before:my-[5%]">
          <p>N’en faites qu’à votre tête !
            Entièrement personnalisable, Elvia vous ressemble et vous accompagne avec style en toute sobriété
            écologique. </p>
        </div>
        <span class="font-title font-bold uppercase text-80">Elvia</span>
        <div class="absolute bottom-[10%] right-60 flex gap-7 items-center justify-center">
          <div class="btn-round btn-border"><Leaf class="w-5 h-5"/></div>
          <span>Certifiée <span class="underline underline-offset-2">Green Air Innovation</span> de l’année</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import {useStore} from "../js/stores/global";

import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Menu from "./landing/Menu.vue";
import Button from "./Button.vue";
import StepsIndicator from "./StepsIndicator.vue";
import Breadcrumb from "./Breadcrumb.vue";

// UI
import Account from "/public/svg/account.svg?component";
import Cart from "/public/svg/cart.svg?component";
import Close from '/public/svg/cross.svg?component';
import Scroll from '/public/svg/scrolltodiscover.svg?component';
import Arrow from '/public/svg/arrow.svg?component';
// Content
import Flower from '/public/svg/flower.svg?component';
import Wind from '/public/svg/wind.svg?component';
import Snow from '/public/svg/snowflake.svg?component';
import Thread from '/public/svg/thread.svg?component';
import Water from '/public/svg/water.svg?component';
import Engine from '/public/svg/engine.svg?component';
import Leaf from '/public/svg/leaf.svg?component';

export default {
  name: "Home",
  components: {
    Breadcrumb,
    StepsIndicator,
    Button,
    Menu,
    Account,
    Cart,
    Close,
    Scroll,
    Arrow,
    Flower,
    Wind,
    Snow,
    Thread,
    Water,
    Engine,
    Leaf
  },
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  mounted() {
    this.store.isLoading = false
    this.store.activeStep = this.store.landingSteps[0]

    let sections = document.querySelectorAll('.section')
    sections.forEach(s => {
      //gsap.set(s, {opacity: 0})
      /*let texts = s.querySelectorAll(".text")

      ScrollTrigger.create({
        trigger: s,
        start: "top top",
        end: "+=50%",
        markers: {startColor: "blue", endColor: "purple"},
        pin: true,
        invalidateOnRefresh: true
      })

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: s,
          start: "top center",
          end: "bottom top",
          //toggleActions: "restart, pause, reverse, pause",
          markers: true,
          scrub: true,
          invalidateOnRefresh: true
        }
      })
      tl.set(texts, {
        opacity: 0
      }).to(texts, {
        opacity: 1, duration: 2, delay: 3
      }).to(texts, {
        opacity: 0,
        duration: 1
      })*/
    })

    window.addEventListener('scroll', () => {
      if (this.$refs.home) {
        //console.log('landing progress', (window.scrollY - window.innerHeight) / this.$refs.home.clientHeight * 100)
      }
    })
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