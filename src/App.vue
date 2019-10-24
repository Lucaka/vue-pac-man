<template>
  <div id="app">
    <div class="header">
      <span class="title">Welcome Back to Free Pacman!</span>
      <span class="score">
        SCORE:
        <span class="score" ref="score">0</span>
      </span>
    </div>
    <div class="scene scene-start" v-if="isOpen">
      <button class="start" @click="startHandle">Start</button>
    </div>
    <div class="scene" ref="scene" v-else>
      <div ref="pacman" class="pacman">
        <pacman :pacmanRotate="pacmanRotate"/>
      </div>
      <foods :totalFoods="totalFoods"></foods>
    </div>
  </div>
</template>

<script>
  import variable from '@/assets/css/variable.scss'
  import Foods from "./components/foods";
  import Pacman from "./components/pacman/index";


  export default {
    name: 'app',
    components: {Pacman, Foods},
    data () {
      return{
        isOpen : true,
        pacmanRotate:{
          'pacman--up': false,
          'pacman--down': false,
          'pacman--left': false,
          'pacman--right': false,
        },
        totalFoods: 0,
        limit : {
          X: variable.sceneWidth.replace('px','') - variable.characterWidth.replace('px',''),
          Y: variable.sceneHeight.replace('px','') - variable.characterHeight.replace('px',''),
        },
        timer: null,
        isMove : true,
        keyCode : 39
      }
    },
    mounted() {
      window.addEventListener('keydown', this.keydownHandle);
      console.log(variable.characterWidth.replace('px',''))
    },
    methods : {
      startHandle (){
        // 進入遊戲畫面
        this.isOpen = false;
        // 生成食物
        this.crateFoodHandle();
        // 人物移動
        // this.timer = setInterval(() => {this.moveHandle(this.$refs.pacman)},50);

        window.requestAnimationFrame(() => {this.moveHandle(this.$refs.pacman)});
      },
      keydownHandle (e) {
        switch (e.keyCode) {
          case 38 :
          case 40 :
          case 37 :
          case 39 :
            this.keyCode = e.keyCode;break;
        }
      },
      crateFoodHandle () {
        this.totalFoods = Number((variable.sceneWidth.replace('px','') / variable.characterWidth.replace('px','')).toFixed(0)) *
            Number((variable.sceneHeight.replace('px','') / variable.characterHeight.replace('px','')).toFixed(0));
      },
      // 移動
      moveHandle (character) {

        // 移動距離
        const move = 2;

        // 遊戲畫面
        const scene = this.$refs.scene.getBoundingClientRect();

        // 玩家
        const target = character;
        const targetRect = target.getBoundingClientRect();

        console.log(targetRect.left,scene.left)

        // 當前位置
        let moveX = targetRect.left - scene.left;
        let moveY = targetRect.top - scene.top;

        switch (this.keyCode) {
            // 上
          case 38 :
            moveY = targetRect.top - scene.top - move;
            this.pacmanRotate = {'pacman--up': true};
            break;
            // 下
          case 40 :
            moveY = targetRect.top - scene.top + move;
            this.pacmanRotate = {'pacman--down': true};
            break;
            // 左
          case 37 :
            moveX = targetRect.left - scene.left - move;
            this.pacmanRotate = {'pacman--left': true};
            break;
            // 右
          case 39 :
            moveX = targetRect.left - scene.left + move;
            this.pacmanRotate = {'pacman--right': true};
            break;
        }

        // const limitMoveX = scene.style.width.slice('px','') - target.style.width.slice('px','');
        // const limitMoveY = scene.style.height - target.style.height;

        // 地圖邊界
        if(moveX > this.limit.X || moveX < 0 || moveY > this.limit.Y || moveY < 0){
          window.requestAnimationFrame(() => {this.moveHandle(this.$refs.pacman)})
          return;
        }

        // this.$refs.pacman.style.setProperty('transform',`translate(${moveX}px,${moveY}px) rotate(${rotate}deg)`);
        target.style.setProperty('transform',`translate(${moveX}px,${moveY}px)`);

        // console.log("moveX:" + moveX)
        // console.log("moveY:" + moveY)

        window.requestAnimationFrame(() => {this.moveHandle(this.$refs.pacman)});
      },
      handleEgdeCollisions (rect1, rect2) {
        if(rect1.left < rect2.left + rect2.width &&
            rect1.left + rect1.width > rect2.left &&
            rect1.top < rect2.top + rect2.height &&
            rect1.height + rect1.top > rect2.top) {
          console.log('撞了')
          return true
        } else {
          console.log('没撞')
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
    text-align: center;
    color: #2c3e50;


  }
</style>
