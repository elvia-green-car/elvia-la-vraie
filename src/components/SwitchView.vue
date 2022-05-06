<template>
  <button>
    <div class="w-24 h-24 bg-white bg-opacity-10 border border-white rounded-full"/>
  </button>
</template>

<script>
export default {
  name: "SwitchView",
  data: {},
  mounted() {
    let target = document.querySelector('.target')
    const message = target.textContent;
    const quaterWidth = target.clientWidth / 4;
    const diameter = 200 || quaterWidth;
    const messageChunks = message.split(String());
    const {length} = messageChunks;
    const offsetEnd = 1;
    const l = length + offsetEnd;
    const CIRC_MAX = 360;
    const PERC_MAX = 100;
    const ofDeg = 100 * CIRC_MAX / PERC_MAX;
    const ofNorth = 15 * CIRC_MAX / PERC_MAX;
    const segDeg = ofDeg / l;
    const fontSize = 16;
    let a = 0;
    let i = 0;

    target.setAttribute('style', `
        padding-left: ${diameter / 2}px;
        display: inline-block;
        width: ${diameter / 2}px;
        height: ${diameter}px;
        transform: rotate3d(0, 0, 1, -${segDeg + ofNorth}deg);
        border-radius: 9e9em;
        font-size: 1rem;
      `);
    target.classList.add('fx-Revolve');
    target.textContent = '';
    while (a < ofDeg) {
      a += segDeg;
      const charWrapper = document.createElement('span');
      charWrapper.textContent = messageChunks[i];
      i++;
      charWrapper.classList.add('fx-RevolveCharWrap');
      charWrapper.setAttribute('style', `
        display: inline-block;
        transform:
          rotate3d(0, 0, 1, ${a}deg)
        position: absolute;
        height: ${diameter / 2}px;
        transform-origin: bottom left;
        font-size: 1em;
      `);
      target.appendChild(charWrapper);
    }
  }
}
</script>

<style scoped>

</style>