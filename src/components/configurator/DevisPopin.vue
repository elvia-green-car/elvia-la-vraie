<template>
  <!-- TODO : -->
  <section :class="isOpen ? 'w-[45%]': 'w-0'"
           class="flex flex-col h-full shrink-0 z-10 overflow-hidden border-white transition-all ease-in-out btn-bg border-r border-white lg:pt-[140px]">
    <div class="flex flex-col px-16 overflow-y">
      <h2 class="font-title font-bold text-22 lg:text-30 mb-8">Votre configuration</h2>
      <p>Loreum ipsum</p>
      <h3 class="font-bold uppercase mt-8">Plantes</h3>
      <div v-for="(plant, index) in plants" :key="index" class="flex justify-between border-b border-white py-4">
        <span>{{ plant.name }} <span class="ml-3">x{{ plant.number }}</span></span>
        <span>{{ plant.price }}€</span>
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
        class="flex justify-between items-center mt-auto font-title font-bold text-16 lg:text-20 border-t border-white px-16 py-10">
      <span>Prix total de votre configuration</span>
      <span>{{ totalPrice }}€</span>
    </div>
  </section>
</template>

<script>
import Check from '/public/svg/cross.svg?component'

export default {
  name: "DevisPopin",
  components: {Check},
  data() {
    return {
      plants: [{name: 'Aloe Vera', price: 12, number: 3}, {name: 'Chlorophytum', price: 10, number: 6}], // will be a props
      carPrice: 12500,
      withCar: false,
      options: [
        {name: "Lot d'outils", price: 50, checked: false},
        {name: "Terreaux 10kg", price: 12, checked: false}
      ],
    }
  },
  props: {
    data: Object,
    isOpen: Boolean,
  },
  computed: {
    totalPrice() {
      let totalPrice = 0
      this.plants.forEach(plant => {
        totalPrice += plant.price * plant.number
      })
      this.options.forEach(option => {
        if (option.checked) {
          totalPrice += option.price
        }
      })
      totalPrice += this.withCar ? this.carPrice : 0
      return totalPrice
    }
  },
  methods: {
    clickOption(index) {
      this.$refs['option' + index][0].click()
    }
  }
}
</script>

<style scoped>

</style>