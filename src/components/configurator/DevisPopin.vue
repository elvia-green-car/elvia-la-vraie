<template>
  <!-- TODO : -->
  <section :class="isOpen ? 'w-[45%]': 'w-0'"
           class="flex flex-col h-full shrink-0 z-10 overflow-hidden border-white transition-all ease-in-out btn-bg border-r border-white pt-24 xl:pt-[140px]">
    <div class="flex flex-col px-12 xl:px-16 overflow-y">
      <h2 class="font-title font-bold text-22 xl:text-30 mb-8">Votre configuration</h2>
      <p>Loreum ipsum</p>
      <h3 class="font-bold uppercase mt-8">Plantes</h3>
      <div v-for="(value, key) in store.carPlants" :key="key"
           class="flex capitalize justify-between border-b border-white py-4">
        <span>{{ key }}<span class="ml-3">x{{ value }}</span></span>
        <span>{{ getPrice(key, value) }}€</span>
      </div>
      <h3 class="font-bold uppercase mt-8">Options</h3>
      <fieldset :class="options.length > 0 ? 'border-b border-white' : ''" class="flex items-center py-4 gap-7 mb-3">
        <input class="hidden" ref="without" type="radio" id="without" :value="false" v-model="withCar"/>
        <label class="flex items-center gap-4" for="without" @click="$refs.with.click()">
          <span class="flex items-center justify-center w-4 h-4 border border-white">
            <Check v-if="!withCar" class="w-4 h-4"/>
          </span>
          Je possède une Renault Elvia*
        </label>
        <input class="hidden" ref="without" type="radio" id="with" :value="true" v-model="withCar"/>
        <label class="flex items-center gap-4" for="with" @click="$refs.without.click()">
          <span class="flex items-center justify-center w-4 h-4 border border-white">
            <Check v-if="withCar" class="w-4 h-4"/>
          </span>
          Je veux une Renault Elvia*
        </label>
      </fieldset>
      <fieldset v-for="(option, index) in options" :key="index" class="flex justify-between items-center gap-7 py-2">
        <input class="hidden" :ref="'option'+index" type="checkbox" :name="option.name" v-model="option.checked"/>
        <label class="flex items-center gap-4" @click="clickOption(index)">
          <span class="flex items-center justify-center w-4 h-4 border border-white">
            <Check v-if="option.checked" class="w-4 h-4"/>
          </span>
          {{ option.name }}
        </label>
        <span>{{ option.price }}€</span>
      </fieldset>
    </div>
    <div
        class="flex justify-between items-center mt-auto font-title font-bold text-16 xl:text-20 border-t border-white px-12 xl:px-16 py-10">
      <span>Prix total de votre configuration</span>
      <span>{{ totalPrice }}</span>
    </div>
  </section>
</template>

<script>
import {useStore} from "../../js/stores/global";

import Check from '/public/svg/cross.svg?component'

export default {
  name: "DevisPopin",
  components: {Check},
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  props: {
    data: Object,
    isOpen: Boolean,
  },
  data() {
    return {
      carPrice: 12500,
      withCar: false,
      options: [
        {name: "Lot d'outils", price: 49.99, checked: false},
        {name: "Terreaux 10kg", price: 12.99, checked: false}
      ],
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0
      if (this.store.carPlants) {
        Object.entries(this.store.carPlants).forEach(([key, value]) => {
          const found = this.store.plantsData.find(el => {
            return el.name === key
          })
          totalPrice += found.price * value
        })
      }
      this.options.forEach(option => {
        if (option.checked) {
          console.log(option.price)
          totalPrice += option.price
        }
      })
      totalPrice += this.withCar ? this.carPrice : 0
      totalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice)
      return totalPrice
    }
  },
  methods: {
    getPrice(key, value) {
      const found = this.store.plantsData.find(el => {
        return el.name === key
      })
      return found.price
    },
    clickOption(index) {
      this.$refs['option' + index][0].click()
    }
  }
}
</script>

<style scoped>

</style>