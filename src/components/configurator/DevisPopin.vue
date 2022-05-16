<template>
  <section :class="isOpen ? 'w-[45%]': 'w-0'"
           class="flex flex-col h-full shrink-0 z-10 overflow-hidden border-white transition-all ease-in-out btn-bg border-r border-white lg:pt-[140px]">
    <div class="flex flex-col px-16 overflow-y">
      <h2 class="font-title font-bold text-22 lg:text-30 mb-8">Votre configuration</h2>
      <p>Loreum ipsum</p>
      <h3 class="font-bold uppercase mt-8">Plantes</h3>
      <div v-for="plant in plants" class="flex justify-between border-b border-white py-4">
        <span>{{ plant.name }} <span class="ml-3">x{{ plant.number }}</span></span>
        <span>{{ plant.price }}€</span>
      </div>
      <h3 class="font-bold uppercase mt-8">Options</h3>
      <fieldset :class="options.length > 0 ? 'border-b border-white' : ''" class="flex items-center py-4 gap-7 mb-3">
        <input type="radio" id="with" :value="false" v-model="withCar"/>
        <label for="with">Je possède une Renault Elvia*</label>
        <input type="radio" id="without" :value="true" v-model="withCar"/>
        <label for="without">Je veux une Renault Elvia*</label>
      </fieldset>
      <div v-for="option in options" class="flex justify-between items-center gap-7 py-2">
        <label class="flex items-center gap-4"><input type="checkbox" :name="option"/>{{ option.name }}</label>
        <span>{{ option.price }}€</span>
      </div>
    </div>
    <div class="flex justify-between mt-auto font-title font-bold text-16 lg:text-20 border-t border-white px-16 py-10">
      <span>Prix total de votre configuration</span>
      <span>{{ totalPrice }}€</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "DevisPopin",
  data() {
    return {
      plants: [{name: 'Aloe Vera', price: 12, number: 3}, {name: 'Chlorophytum', price: 10, number: 6}], // will be a props
      options: [{name: "Lot d'outils", price: 50}, {name: "Terreaux 10kg", price: 12}],
      withCar: false,
      carPrice: 12500
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
        //totalPrice += option.price
      })
      totalPrice += this.withCar ? this.carPrice : 0
      return totalPrice
    }
  }
}
</script>

<style scoped>

</style>