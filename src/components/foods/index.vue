<template>
  <div class="foods">
    <div class="food" v-for="item in Number(totalFoods)" v-bind:key="item">
      <div class="food-detail"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "foods",
    props: {
      totalFoods: {
        type: Number,
        default: 0,
      }
    }
  }
</script>

<style scoped>

</style>