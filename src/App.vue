<script setup>
import Button from "./components/Button.vue";
import SwitchView from "./components/SwitchView.vue";
import PlantsBar from "./components/PlantsBar.vue";
import Rates from "./components/Rates.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
</script>
<template>
  <div class="relative w-full h-full">
    <canvas class="w-5/6 h-5/6" id="app-canvas"></canvas>
    <div
        class="absolute z-10 h-full pb-[100px] flex flex-col justify-between items-end top-0 right-0 text-right pr-12 lg:pr-24 pt-6 lg:pt-12">
      <Button text="Quitter"/>
      <p>Loreum ipsum</p>
      <Rates :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
      ]"/>
      <Breadcrumb active-step="capot" :steps="['global','capot', 'toit', 'portiere','coffre']" @step-selected=""/>
      <SwitchView/>
    </div>
    <div class="absolute w-3/4 bottom-10 left-0 mr-auto px-12 lg:px-24">
      <p class="ml-6 lg:ml-12 mb-3">Loreum ipsum</p>
      <div class="">
        <PlantsBar active-step="capot" @plant-selected=""/>
      </div>
      <!--Button arrow="true"/-->
    </div>
  </div>
</template>