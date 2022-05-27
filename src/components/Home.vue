<template>
  <div ref="container"></div>
  <img ref="image" style="height: 300px; width: 300px" src="images/png/Bambou/Bambou_00_0000.png">
  <div class="Animate__bambou"/>
  <div ref="bamboo" class="Bambou_00_0000"></div>
</template>

<script>
import {capitalize} from "vue";

export default {
  name: "Home",
  data() {
    return {
      name: 'bambou',
      frame: 0,
      totalFrames: 81,
      timeWhenLastUpdate: null,
      timeFromLastUpdate: null,
      animationDuration: 5000,
    }
  },
  computed: {
    imagePath() {
      return "images/png/" + capitalize(this.name) + "/" + capitalize(this.name) + "_00_00"
    }
  },
  mounted() {


    document.addEventListener('DOMContentLoaded', () => {
      for (let i = 0; i < this.totalFrames; i++) {
        let frame = this.addLeadingZeros(i, 2)
        document.querySelector('body')
            .append(`<div id="preload-image-${i}" style="background-image: url('${this.imagePath + frame}.png');"></div>`)
      }
    })
    window.addEventListener('load', () => requestAnimationFrame(this.step))
  },
  methods: {
    addLeadingZeros(num, totalLength) {
      return String(num).padStart(totalLength, '0');
    },
    step(startTime) {
      if (!this.timeWhenLastUpdate) this.timeWhenLastUpdate = startTime;

      this.timeFromLastUpdate = startTime - this.timeWhenLastUpdate;
      let frame = this.addLeadingZeros(this.frame, 2)

      if (this.timeFromLastUpdate > this.animationDuration / this.totalFrames) {
        this.$refs.image.setAttribute('src', this.imagePath + `${frame}.png`);
        this.timeWhenLastUpdate = startTime;

        console.log('frame', frame)
        this.$refs.bamboo.setAttribute('class', 'Bambou_00_00' + frame)

        console.log(this.frame)
        if (this.frame >= this.totalFrames - 1) {
          this.frame = 0;
        } else {
          this.frame++
        }
      }
      requestAnimationFrame(this.step)
    }
  }
}
</script>

<style scoped>

</style>