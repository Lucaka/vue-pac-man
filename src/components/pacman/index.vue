<template>
    <svg-icon class="pacman-detail" :class="pacmanRotate" iconClass="pacman"></svg-icon>
</template>

<script>
  export default {
    name: "pacman",
    props:{
      pacmanRotate:{}
    }
  }
</script>

<style scoped>

</style>