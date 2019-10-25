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
      this.createFoodsRect();
    },
    methods : {
      createFoodsRect () {
        // 生產所有食物位置
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
      resetFoods () {
        this.$refs.foods.childNodes.forEach(food => {
          food.children[0].classList.remove('food-hidden')
        });
      }
    }

  }
</script>

<style scoped>

</style>