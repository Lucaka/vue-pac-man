<template>
  <div id="app">
    <div class="header">
      <span class="title">Welcome Back to Free Pacman!</span>
      <span class="score">
        SCORE:
        <span class="score" ref="score">{{ this.score }}</span>
      </span>
    </div>
    <!-- start View -->
    <div class="scene scene-start" v-if="isOpen">
      <button class="start" @click="startHandle">Start</button>
    </div>

    <!-- Gaming View -->
    <div class="scene" ref="scene" v-show="!isOpen">

      <div class="gameover" v-if="gameOver">
        <button class="gameover__button">Game Over</button>
      </div>



      <pacman ref="pacman" :scene="scene" :limit="limit"></pacman>
      <div ref="ghosts">
        <ghost style="color: aqua; top: 600px; left: 200px"></ghost>
        <ghost style="color: brown; top: 600px; left: 300px"></ghost>
        <ghost style="color: chocolate; top: 600px; left: 400px"></ghost>
      </div>
      <foods ref="foods" :totalFoods="totalFoods" @foodsFinished="foodsFinished"></foods>


    </div>
    <!-- GameOver View -->
<!--    <div class="gameover">-->
<!--      <button class="gameover-button">Game Over</button>-->
<!--    </div>-->

  </div>
</template>

<script>
  import variable from '@/assets/css/variable.scss'
  import Foods from "./components/foods";
  import Pacman from "./components/pacman/index";
  import Ghost from "./components/ghost/index";

  export default {
    name: 'app',
    components: {Ghost, Pacman, Foods},
    data () {
      return{
        // 開場
        isOpen : true,
        // 分數
        score:0,
        // 根據場地大小，計算食物數量
        totalFoods: 0,
        // 所有食物的位置
        foodsRect : [],
        // 場地位置
        scene : {
          top : 0,
          left : 0
        },
        // 場地邊界
        limit : {
          X: variable.sceneWidth.replace('px','') - variable.characterWidth.replace('px',''),
          Y: variable.sceneHeight.replace('px','') - variable.characterHeight.replace('px',''),
        },
        timer:null,
        gameOver : false
      }
    },
    updated() {
      this.scene.top = this.$refs.scene.getBoundingClientRect().top;
      this.scene.left = this.$refs.scene.getBoundingClientRect().left;
    },
    methods : {
      startHandle (){
        // 進入遊戲畫面
        this.isOpen = false;
        // 計算食物數量
        this.crateFoodHandle();
        // 人物移動
        this.$refs.pacman.startHandle();
        // 碰撞處理
        this.timer = requestAnimationFrame(()=>this.collisionHandle());

      },
      endHandle (){
        this.gameOver = true ;

        cancelAnimationFrame(this.timer);

        this.$refs.pacman.endHandle();
      },
      crateFoodHandle () {
        this.totalFoods = Number((variable.sceneWidth.replace('px','') / variable.characterWidth.replace('px','')).toFixed(0)) *
            Number((variable.sceneHeight.replace('px','') / variable.characterHeight.replace('px','')).toFixed(0));
      },
      foodsFinished (foodsRect) {
        this.foodsRect = foodsRect;

      },
      collisionHandle (){
        this.foodsRect.forEach(food => {
          let collision =  this.handleEgdeCollisions(food,this.$refs.pacman.$el.getBoundingClientRect())

          if(collision && !food.dom.classList.contains('food-hidden')) {
            food.dom.classList.add('food-hidden');
            this.score += 1;
          }
        });

        this.$refs.ghosts.childNodes.forEach(ghost => {
          let ghostsCollision = this.handleEgdeCollisions(ghost.getBoundingClientRect(),this.$refs.pacman.$el.getBoundingClientRect())

          if(ghostsCollision)this.gameOver = true;
        });

        this.timer = requestAnimationFrame(()=>this.collisionHandle());

        if(this.gameOver)this.endHandle();
      },
      // 判斷兩矩形是否碰撞
      handleEgdeCollisions (rect1, rect2) {
        if(rect1.left < rect2.left + rect2.width &&
            rect1.left + rect1.width > rect2.left &&
            rect1.top < rect2.top + rect2.height &&
            rect1.height + rect1.top > rect2.top) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/css/_all";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
