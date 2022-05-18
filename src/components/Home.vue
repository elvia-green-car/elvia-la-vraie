<template>
  <section class="section w-full h-full flex bg-yellow-normal p-10">
    <div class="flex flex-col justify-center items-center w-full h-full opacity-30 bg-red-500">
      <span class="text">Text section 1</span>
      <span class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
    </div>
    <div class="w-full h-full opacity-30 bg-blue-500"></div>
  </section>
  <section class="section w-full h-full flex flex-row-reverse bg-yellow-light p-10">
    <div class="flex flex-col justify-center items-center w-full h-full opacity-30 bg-red-500">
      <span class="text">Text section 2</span>
      <span class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
    </div>
    <div class="w-full h-full opacity-30 bg-blue-500"></div>
  </section>
  <section class="section w-full h-full flex p-10">
    <div class="flex flex-col justify-center items-center w-full h-full opacity-30 bg-red-500">
      <span class="text">Text section 3</span>
      <span class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
    </div>
    <div class="w-full h-full opacity-30 bg-blue-500"></div>
  </section>
</template>

<script>
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default {
  name: "Home",
  data() {
    this.tl = null
  },
  mounted() {
    let sections = document.querySelectorAll('.section')
    sections.forEach(s => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: s,
          start: "top center",
          end: "bottom center",
          //toggleActions: "restart, pause, reverse, pause",
          markers: true,
          scrub: true
        }
      })
      gsap.set('.text', {x: -100})
      //tl.to(".text",  {x: 100, duration: 2})
      tl.fromTo(".text", {x: -100}, {x: 100, duration: 2})
    })

  }
}
</script>

<style scoped>

</style>