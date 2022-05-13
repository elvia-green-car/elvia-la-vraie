<script setup>
import Button from "./components/configurator/Button.vue";
import SwitchView from "./components/configurator/SwitchView.vue";
import PlantsBar from "./components/configurator/PlantsBar.vue";
import Rates from "./components/configurator/Rates.vue";
import Breadcrumb from "./components/configurator/Breadcrumb.vue";
import Plant from "./components/configurator/PlantPopup.vue";
</script>

<!--
TODO: make it a component
TODO: connect components with logic
TODO: change cursor
-->
<template>
  <div class="relative grid grid-cols-12 w-full h-full">
    <!--Plant/-->
    <div class="col-span-8 flex flex-col h-full">
      <canvas class="flex-1 w-full" id="app-canvas"></canvas>
      <div class="flex flex-col pl-10 pb-10">
        <p class="ml-6 lg:ml-12 mb-3">Loreum ipsum</p>
        <PlantsBar active-step="capot" @plant-selected=""/>
      </div>
    </div>
    <div
        class="col-span-4 flex flex-col h-full justify-between items-end text-right p-10">
      <Button text="Quitter"/>
      <p>Loreum ipsum</p>
      <Rates :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
      ]"/>
      <Breadcrumb active-step="capot" :steps="['capot', 'toit', 'portiere','coffre', 'fin']" @step-selected=""/>
      <SwitchView/>
      <div v-if="activeStep !== 'fin'" class="flex gap-6">
        <div class="flex flex-col">
          <span>01</span>
          <span class="h-[1px] bg-white w-full"></span>
          <span>04</span>
        </div>
        <Button icon="arrow"/>
      </div>
      <div v-else>

      </div>
    </div>

    <!--
    <canvas class="w-5/6 h-5/6" id="app-canvas"></canvas>
    <div
        class="absolute z-10 h-full flex flex-col justify-between items-end top-0 right-0 text-right pr-12 lg:pr-24 pt-6 lg:pt-12 pb-10">
      <Button text="Quitter"/>
      <p>Loreum ipsum</p>
      <Rates :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
      ]"/>
      <Breadcrumb active-step="capot" :steps="['capot', 'toit', 'portiere','coffre', 'fin']" @step-selected=""/>
      <SwitchView/>
      <div v-if="activeStep !== 'fin'" class="flex gap-6">
        <div class="flex flex-col">
          <span>01</span>
          <span class="h-[1px] bg-white w-full"></span>
          <span>04</span>
        </div>
        <Button arrow/>
      </div>
      <div v-else>

      </div>
    </div>
    <div class="absolute w-3/4 bottom-10 left-0 mr-auto px-12 lg:px-24">
      <p class="ml-6 lg:ml-12 mb-3">Loreum ipsum</p>
      <PlantsBar active-step="capot" @plant-selected=""/>
    </div>
    -->
  </div>
</template>
