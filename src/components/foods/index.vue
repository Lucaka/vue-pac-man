<template>
  <div class="foods" ref="foods">
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
    },
    data () {
      return {
        foodsRect:[],
      }
    },
    updated() {
      console.log("foods updated")

      // 生產所有食物
      this.$refs.foods.childNodes.forEach(food => {
        let rect= new Object();
        rect.dom = food.children[0];
        rect.left = food.children[0].getBoundingClientRect().left;
        rect.top = food.children[0].getBoundingClientRect().top;
        rect.height = food.children[0].getBoundingClientRect().height;
        rect.width = food.children[0].getBoundingClientRect().width;
        this.foodsRect.push(rect);
      });
      this.$emit('foodsFinished',this.foodsRect);
    },

  }
</script>

<style scoped>

</style>