<template>
  <div ref="home" class="relative w-full">
    <div class="fixed top-0 left-0 w-full h-screen pointer-events-none bg-gradient-yellow"/>
    <canvas ref="canvas" id="app-canvas" class="fixed top-0 left-0 w-full h-screen pointer-events-none"/>
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
    <Breadcrumb class="fixed z-20 top-1/2 -translate-y-1/2 right-0 p-10 xl:p-12 pointer-events-auto"
                :steps="store.landingSteps" @step-selected="updateSteps"/>
    <StepsIndicator class="fixed z-10 bottom-0 right-0 p-10 xl:p-12" :steps="store.landingSteps"/>
    <Scroll ref="scroll" class="fixed animate-spin-slow z-10 bottom-0 left-0 w-36 h-36 m-10 xl:m-12"/>
    <div class="fixed flex justify-center items-center z-10 bottom-0 left-0 w-36 h-36 m-10 xl:m-12">
      <Arrow class="w-10 h-10 rotate-90"/>
    </div>
    <!-- Scrooooooll -->
    <main ref="main" class="main">
      <section data-step="0" class="section text-center">
        <div class="section__content flex flex-col items-center justify-around">
          <div class="title max-w-xl">
            <h1 class="font-title font-bold uppercase text-80">Elvia</h1>
            <span>Le nouveau poumon de la Terre</span>
          </div>
          <p class="text max-w-xl">
            Grâce à une technologie de pointe et un design innovant, Elvia réconcilie automobile et nature. Elvia
            fusionne avec son environnement en purifiant l’air qui l’entoure et en s’intégrant parfaitement aux paysages
            qu’elle traverse.
          </p>
        </div>
      </section>
      <section data-step="0" class="section">
        <div class="section__content grid grid-cols-3 gap-10 px-16">
          <ul class="col-span-1 text-right flex flex-col gap-10 justify-center items-end pointer-events-auto">
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
          <div class="button col-span-1 col-start-2 flex justify-center items-end pointer-events-auto">
            <router-link to="/configurator" class="mb-10 lg:mb-20">
              <Button type="round">
                Configurer ma voiture
              </Button>
            </router-link>
          </div>
        </div>
      </section>
      <section data-step="0" class="section">
        <div class="section__content">
          <div class="focus1 absolute top-[20%] right-[7%]">
            <div class="relative max-w-sm">
              <Thread class="absolute -left-7 -bottom-1/2 -translate-x-full w-40"/>
              <p class="w-60">Un système d’irriguation récupérant les eaux de pluie pour offrir à vos plantes une eau
                des plus naturelle.</p>
            </div>
          </div>
          <div class="focus2 absolute top-1/2 left-[2%]">
            <div class="relative">
              <Thread class="absolute -right-7 -top-1/2 translate-x-full w-40 rotate-180"/>
              <p class="w-60 text-right ml-auto">Un terreau biologique naturel qui apportera tous les nutriments et
                minéraux
                indispensables à une bonne pousse.</p>
            </div>
          </div>
          <Text class="absolute text bottom-[10%] left-1/3 -translate-x-1/2">
            Toute notre technologie est concentrée en une seule voiture et veille au bien-être de
            vos plantes, vous rendant ainsi complétement autonome. Elvia est conçue pour durer.
          </Text>
        </div>
      </section>
      <section data-step="0" class="section">
        <div class="section__content grid grid-cols-3 gap-10 px-16">
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
        </div>
      </section>
      <section data-step="0" class="section">
        <div class="section__content flex justify-center items-center">
          <Text class="absolute text top-1/3 left-1/4 -translate-x-1/2">
            N’en faites qu’à votre tête ! Entièrement personnalisable, Elvia vous ressemble et vous accompagne avec
            style en toute sobriété écologique.
          </Text>
          <span class="elvia font-title font-bold uppercase text-80">Elvia</span>
          <div class="text absolute bottom-[10%] right-60 flex gap-7 items-center justify-center">
            <div class="btn-round btn-border">
              <Leaf class="w-5 h-5"/>
            </div>
            <span>Certifiée <span class="underline underline-offset-2">Green Air Innovation</span> de l’année</span>
          </div>
        </div>
      </section>
      <!-- Plants -->
      <section data-step="1" ref="plants" class="section">
        <div class="section__content grid grid-cols-5"> <!-- flex flex-col justify-center items-center -->
          <h3 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title font-bold text-[180px] opacity-25">
            Plantes</h3>
          <div class="mt-[25vh] col-start-2">
            <Text>
              Toutes nos plantes sont issues de la production biologiques. Elles poussent dans un terreau constitué de
              compost naturel et sans pesticides.
            </Text>
          </div>
          <router-link to="/plants" class="mt-auto mx-auto mb-20 pointer-events-auto" @click="(e)=>e.preventDefault">
            <Button>Voir toutes les plantes</Button>
          </router-link>
          <ul class="flex flex-col w-full gap-24 justify-center col-start-4">
            <!--  :class="n === 2 ? 'self-end': ''" -->
            <li v-for="n in 3" :class="n === 2 ? 'ml-16': ''"
                class="pointer-events-none btn-border btn-shape btn-round w-24 h-24 z-20 overflow-hidden">
              <img v-if="store.plantsData[n+1]" :src="'/images/png/'+store.plantsData[n+1].file"
                   class="w-full h-full object-cover">
            </li>
          </ul>
        </div>
      </section>
      <!-- Outils -->
      <section data-step="2" class="section">
        <div class="section__content">
          <h3>Outils</h3>
        </div>
      </section>
      <!-- Packs -->
      <section data-step="3" class="section">
        <div class="section__content">
          <h3>Packs</h3>
        </div>
      </section>
      <!-- Services -->
      <!--section data-step="4" class="section">
        <div class="section__content flex">
          <h3 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title font-bold text-[180px] opacity-25">
            Services</h3>
          <div class="w-1/2 grid grid-cols-3">
            <div v-for="n in 6" class="col-span-1 aspect-w-1 aspect-h-1">
              <Button class="w-full h-full" type="square">
                <Car class="w-full h-full"/>
              </Button>
            </div>
          </div>
          <div class="w-1/2">
            <router-link to="/services" class="mt-auto mx-auto mb-20 pointer-events-auto"
                         @click="(e)=>e.preventDefault">
              <Button>Découvrir tous nos services</Button>
            </router-link>
          </div>
        </div>
      </section-->
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
import Text from "./Text.vue";

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
    Text,
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

    let timeline = gsap.timeline()

    let sections = document.querySelectorAll('.section')
    sections.forEach((s, index) => {
      gsap.set(s, {opacity: 0})
      let content = s.querySelectorAll(".section__content")

      let stl = gsap.timeline({
        scrollTrigger: {
          trigger: s,
          start: "top bottom",
          end: "bottom top",
          //toggleActions: "restart, pause, reverse, pause",
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => this.updateSteps(parseInt(s.dataset.step)),
          onEnterBack: () => this.updateSteps(parseInt(s.dataset.step))
        }
      })
      stl.set(s, {
        opacity: 1
      }).fromTo(content, {
        opacity: 0
      }, {
        opacity: 1,
      })

      switch (index) {
        case 0:
          // TODO : pin title for 2 or 3 height screen
          //ScrollTrigger.create({
          //  trigger: s,
          //  start: "top top",
          //  //end: "+=50%",
          //  markers: {startColor: "blue", endColor: "purple"},
          //  pin: true,
          //  invalidateOnRefresh: true,
          //})

          stl.fromTo(s.querySelector('.title'), {
            y: "120%",
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            delay: 2,
            duration: 3
          }).fromTo(s.querySelector('.text'), {
            opacity: 0
          }, {
            opacity: 1
          })

          break
        case 1:
          stl.fromTo(s.querySelectorAll('li'), {
            x: -100,
            opacity: 0
          }, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
          }).fromTo(s.querySelectorAll('.button'), {
            opacity: 0
          }, {
            opacity: 1,
            delay: 1
          })
          break
        case 2:
          stl.fromTo(s.querySelector('.focus1'), {
            x: 100,
            opacity: 0
          }, {
            x: 0,
            opacity: 1
          }).fromTo(s.querySelector('.focus2'), {
            x: -100,
            opacity: 0
          }, {
            x: 0,
            opacity: 1
          }).fromTo(s.querySelector('.text'), {
            opacity: 0
          }, {
            opacity: 1
          })
          break
        case 3:
          stl.fromTo(s.querySelectorAll('li'), {
            opacity: 0
          }, {
            opacity: 1,
            stagger: 0.2
          })
          break
        case 4:
          stl.fromTo(s.querySelectorAll('.text'), {
            opacity: 0
          }, {
            opacity: 1,
            stagger: 0.2
          }).fromTo(s.querySelector('.elvia'), {
            opacity: 0
          }, {
            opacity: 1,
            delay: 2
          })
          break
        case 5:

          break
        case 6:

          break
        case 7:

          break
        case 8:

          break
        default:
          break
      }
      stl.to(content, {
        opacity: 0,
        duration: 1,
        delay: 2
      })
      timeline.add(stl)
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