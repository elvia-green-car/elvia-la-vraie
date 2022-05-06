<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Button from "./components/Button.vue";
import SwitchView from "./components/SwitchView.vue";
import PlantsBar from "./components/PlantsBar.vue";
</script>
<template>
  <div class="relative w-full h-full">
    <canvas class="w-5/6 h-5/6" id="app-canvas"></canvas>
    <div class="absolute h-full pb-[100px] flex flex-col justify-between items-end top-0 right-0 text-right pr-12 lg:pr-24 pt-6 lg:pt-12">
      <Button text="Quitter"/>
      <p>Loreum ipsum</p>
      <!--SwitchView/-->
    </div>
    <div class="absolute bottom-10 w-full px-12 lg:px-24">
      <p class="ml-6 lg:ml-12 mb-3">Loreum ipsum</p>
      <div class="w-[60%]">
        <PlantsBar :view="'capot'" @plant-selected=""/>
      </div>
      <!--Button arrow="true"/-->
    </div>
  </div>
</template>