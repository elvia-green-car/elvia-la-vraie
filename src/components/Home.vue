<template>
  <div ref="home" class="relative w-full">
    <div class="fixed top-0 left-0 w-full h-screen  bg-gradient-yellow"/>
    <canvas ref="canvas" id="app-canvas" class="fixed top-0 left-0 w-full h-screen "/>
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
    <Breadcrumb class="fixed z-20 top-1/2 -translate-y-1/2 right-0 p-10 xl:p-12 "
                :steps="store.landingSteps" @step-selected="scrollTo"/>
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
          <ul class="col-span-1 text-right flex flex-col gap-10 justify-center items-end">
            <li class="group flex gap-4 items-center">
              <span class="transition-opacity opacity-0 group-hover:opacity-100">Créez votre configuration de plantes parmi une sélection des plus diversifiée</span>
              <Button type="round" class="">
                <Flower class="w-12 h-12"/>
              </Button>
            </li>
            <li class="group flex gap-4 items-center mr-16">
              <span class="transition-opacity opacity-0 group-hover:opacity-100">Absorbez 95% du C02 que vous émettez pour rejeter 100% d’oxygène</span>
              <Button type="round" class="">
                <Wind class="w-12 h-12"/>
              </Button>
            </li>
            <li class="group flex gap-4 items-center">
              <span class="transition-opacity opacity-0 group-hover:opacity-100">Partout où vous voyagez, rafraîchissez l’environnement</span>
              <Button type="round" class="">
                <Snow class="w-12 h-12"/>
              </Button>
            </li>
          </ul>
          <div class="button col-span-1 col-start-2 flex justify-center items-end">
            <router-link to="/configurator" class="mb-10 lg:mb-20 ">
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
        <div class="section__content"> <!-- flex flex-col justify-center items-center -->
          <h3 class="title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title font-bold text-[180px] opacity-25">
            Plantes</h3>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div :ref="store.plantsData[4].name"
                 :class="plantClass(store.plantsData[4].name)"/>
          </div>
          <div class="grid grid-cols-3 h-full max-w-4xl mx-auto">
            <div class="text mt-[20vh]">
              <Text>
                Toutes nos plantes sont issues de la production biologiques. Elles poussent dans un terreau constitué de
                compost naturel et sans pesticides.
              </Text>
            </div>
            <router-link to="/plants" class="button mt-auto mx-auto mb-20 "
                         @click="(e)=>e.preventDefault">
              <Button>Voir toutes les plantes</Button>
            </router-link>
            <ul class="flex flex-col gap-24 justify-center items-end">
              <!--  :class="n === 2 ? 'self-end': ''" -->
              <li v-for="n in 3" :class="n%2 === 1 ? 'mr-16': ''"
                  class="btn-border btn-shape btn-round w-24 h-24 z-20 overflow-hidden ">
                <div :ref="store.plantsData[n].name" v-show="store.plantsData[n+1]"
                     :class="plantClass(store.plantsData[n].name)" class="w-full h-full object-cover"
                     @mouseover="onMouseOver(store.plantsData[n].name)"
                     @mouseleave="onMouseLeave(store.plantsData[n].name)"/>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <!-- Outils -->
      <section data-step="2" ref="tools" class="section">
        <div class="section__content"> <!-- flex flex-col justify-center items-center -->
          <h3 class="title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title font-bold text-[180px] opacity-25">
            Outils</h3>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <!-- main image -->
          </div>
          <div class="grid grid-cols-3 h-full max-w-4xl mx-auto">
            <ul class="flex flex-col gap-24 justify-center">
              <!--  :class="n === 2 ? 'self-end': ''" -->
              <li v-for="n in 3" :class="n%2 === 1 ? 'ml-16': ''"
                  class="btn-border btn-shape btn-round w-24 h-24 z-20 overflow-hidden ">
                <!-- tool's bubble -->
              </li>
            </ul>
            <router-link to="/tools" class="button mt-auto mx-auto mb-20 "
                         @click="(e)=>e.preventDefault">
              <Button>Voir tous les accessoires</Button>
            </router-link>
            <div class="text ml-auto mt-[20vh]">
              <Text>
                Nos outils et accessoires sont fabriqués à partir de matériaux recyclés récupérés dans les usines qui
                produisent nos voitures afin d’exploiter tous les déchets produits.
              </Text>
            </div>
          </div>
        </div>
      </section>
      <!-- Packs -->
      <section data-step="3" ref="packs" class="section">
        <div class="section__content"> <!-- flex flex-col justify-center items-center -->
          <h3 class="title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title font-bold text-[180px] opacity-25">
            Packs</h3>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <!-- main image -->
          </div>
          <div class="grid grid-cols-3 h-full max-w-4xl mx-auto">
            <div class="text mt-[20vh]">
              <Text>
                Pas le temps ? Nos packs pré-configurés vous permettent de choisir une sélection complète de plantes
                selon le thème qui vous plaira le plus.
              </Text>
            </div>
            <router-link to="/packs" class="button mt-auto mx-auto mb-20 "
                         @click="(e)=>e.preventDefault">
              <Button>Voir tous les packs</Button>
            </router-link>
            <ul class="flex flex-col gap-24 justify-center items-end">
              <li v-for="n in 3" :class="n%2 === 1 ? 'mr-16': ''"
                  class="btn-border btn-shape btn-round w-24 h-24 z-20 overflow-hidden ">
                <!-- pack's bubble-->
              </li>
            </ul>
          </div>
        </div>
      </section>
      <!-- Services -->
      <section data-step="4" class="section">
        <div class="section__content">
          <h3 class="title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title font-bold text-[180px] opacity-25">
            Services</h3>
          <div class="flex items-end mt-[50%] -translate-y-full gap-48 max-w-6xl mx-auto">
            <ul class="w-1/2 grid grid-cols-3 gap-10 my-auto">
              <li v-for="n in 6" :class="n%3 === 2 ? '': '-mt-8'" class=" col-span-1">
                <div class="aspect-w-1 aspect-h-1">
                  <div>
                    <Button type="square">
                      <Car class="w-28 h-28"/>
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="button w-1/2 mb-8">
              <router-link to="/services" class=""
                           @click="(e)=>e.preventDefault">
                <Button>Découvrir tous nos services</Button>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import {useStore} from "../js/stores/global";
import {Landing} from "../js/Landing";

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
import Car from '/public/svg/car.svg?component';

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
    Leaf,
    Car
  },
  setup() {
    const store = useStore()

    store.$subscribe((mutation) => {
      if (mutation.events.key === "isLoading" && mutation.events.newValue === false) {
        let tl = new gsap.timeline()
        let s = document.querySelector('.section')
        tl.set(s, {opacity: 1})
        tl.fromTo(s.querySelector('.title'), {
          y: "120%",
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          delay: 2,
          duration: 3
        })
        tl.fromTo(s.querySelector('.text'), {
          opacity: 0
        }, {
          opacity: 1
        })
        tl.play()
      }
    })

    return {
      store
    }
  },
  data() {
    return {
      frame: 0,
      totalFrames: 60,
      timeWhenLastUpdate: null,
      timeFromLastUpdate: null,
      animationDuration: 4000,
      toAnimate: []
    }
  },
  mounted() {
    this.store.isLoading = false
    this.store.activeStep = this.store.landingSteps[0]
    this.app = new Landing(this.$refs.canvas) //document.getElementById('app-canvas')
    this.app.init()
    this.app.run()

    for (let i = 0; i < 4; i++) {
      this.toAnimate.push(this.store.plantsData[i].name)
    }

    // Main timeline
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.main,
        start: "top top",
        end: "bottom bottom",
        //onUpdate: self => console.log("progress:", self.progress)
      }
    })

    let sections = document.querySelectorAll('.section')

    sections.forEach((s, index) => {
      let content = s.querySelectorAll(".section__content")
      gsap.set(s, {opacity: 0})

      let stl = gsap.timeline({
        scrollTrigger: {
          trigger: s,
          start: "top bottom",
          end: "bottom top",
          //toggleActions: "restart, pause, reverse, pause",
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => this.onEnterTL(s, index, content),
          onEnterBack: () => this.onEnterTL(s, index, content),
          onLeave: () => this.onLeaveTL(s, content),
          onLeaveBack: () => this.onLeaveTL(s, content),
        }
      })
      stl.set(s, {
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
        case 6:
        case 7:
          stl.fromTo(s.querySelector('.title'), {
            opacity: 0,
            scale: 0.9
          }, {
            opacity: 0.25,
            scale: 1
          }).fromTo(s.querySelector('.text'), {
            y: 100,
            opacity: 0,
          }, {
            y: 0,
            opacity: 1,
          }).fromTo(s.querySelectorAll('li'), {
            x: -100,
            opacity: 0
          }, {
            x: 0,
            opacity: 1,
            stagger: 0.2
          }).fromTo(s.querySelector('.button'), {
            opacity: 0,
          }, {
            opacity: 1,
            delay: 1
          })
          break
        case 8:
          stl.fromTo(s.querySelector('.title'), {
            opacity: 0,
            scale: 0.9
          }, {
            opacity: 0.25,
            scale: 1
          }).fromTo(s.querySelectorAll('li'), {
            y: 100,
            opacity: 0,
          }, {
            y: 0,
            opacity: 1,
            stagger: 0.2
          }).fromTo(s.querySelector('.button'), {
            opacity: 0,
          }, {
            opacity: 1,
            delay: 1
          })
          break
        default:
          break
      }
      stl.to(s, {
        opacity: 0,
        duration: 1,
        delay: 2,
      })
      this.timeline.add(stl)
    })

    window.addEventListener('load', () => this.step())
  },
  beforeUnmount() {
    window.removeEventListener('load', () => this.step)
  },
  methods: {
    plantClass(name) {
      return name + '0000'
    },
    scrollTo(index) {
      this.store.activeStepIndex = index
      this.store.activeStep = this.store.landingSteps[index]
      const sections = document.querySelectorAll('.section')
      Array.from(sections).filter(s => parseInt(s.dataset.step) === index)[0].scrollIntoView()
    },
    updateSteps(index) {
      this.store.activeStepIndex = index
      this.store.activeStep = this.store.landingSteps[index]
    },
    addLeadingZeros(num, totalLength) {
      return String(num).padStart(totalLength, '0');
    },
    step(startTime) {
      if (!this.timeWhenLastUpdate) this.timeWhenLastUpdate = startTime;

      this.timeFromLastUpdate = startTime - this.timeWhenLastUpdate;
      let frame = this.addLeadingZeros(this.frame, 2)

      if (this.timeFromLastUpdate > this.animationDuration / this.totalFrames) {
        this.timeWhenLastUpdate = startTime;

        this.toAnimate.forEach(name => {
          if (this.$refs[name] && this.$refs[name][0]) {
            this.$refs[name][0].setAttribute('class', name + '00' + frame)
          } else if (this.$refs[name]) {
            this.$refs[name].setAttribute('class', name + '00' + frame)
          }
        })

        if (this.frame <= 0) {
          this.frame = this.totalFrames;
        } else {
          this.frame--
        }
      }
      requestAnimationFrame(this.step)
    },
    onMouseOver(name) {
      this.toAnimate.push(name)
    },
    onMouseLeave(name) {
      this.toAnimate = this.toAnimate.filter(n => n !== name)
    },
    onEnterTL(s, index, content) {
      this.updateSteps(parseInt(s.dataset.step))
      this.store.sectionIndex = index
      this.app.updateSection(index)
      gsap.set(content, {pointerEvents: "auto"})
    },
    onLeaveTL(s, content) {
      gsap.set(content, {pointerEvents: "none"})
    }
  }
}
</script>

<style scoped>

</style>