<template>
  <div class="pacman" ref="pacman">
    <svg-icon class="pacman-detail" :class="pacmanRotate" iconClass="pacman"></svg-icon>
  </div>
</template>

<script>
  export default {
    name: "pacman",
    props: {
      scene : {
        top:0,
        left:0
      },
      limit : {
        X: 0,
        Y: 0,
      }
    },
    data () {
      return {
        pacmanRotate:{
          'pacman--up': false,
          'pacman--down': false,
          'pacman--left': false,
          'pacman--right': false,
        },
        timer:0,
        keyCode : 39
      }
    },
    mounted() {
      window.addEventListener('keydown',this.keydownHandle);
    },
    methods :{
      startHandle (){
        window.requestAnimationFrame(() => {this.moveHandle(this.$refs.pacman)});
      },
      endHandle (){
        cancelAnimationFrame(this.timer);
      },
      keydownHandle (e) {
        this.keyCode = e.keyCode;

        switch (e.keyCode) {
            // 上
          case 38 :
            this.pacmanRotate = {'pacman--up': true};
            break;
            // 下
          case 40 :
            this.pacmanRotate = {'pacman--down': true};
            break;
            // 左
          case 37 :
            this.pacmanRotate = {'pacman--left': true};
            break;
            // 右
          case 39 :
            this.pacmanRotate = {'pacman--right': true};
            break;
        }
      },
      moveHandle (character) {
        // 移動距離
        const move = 2;

        // 遊戲畫面
        const scene = this.scene;

        // 玩家
        const targetRect = character.getBoundingClientRect();

        // console.log(targetRect.left,scene.left)

        // 當前位置
        let moveX = targetRect.left - scene.left;
        let moveY = targetRect.top - scene.top;

        switch (this.keyCode) {
            // 上
          case 38 :
            moveY = targetRect.top - scene.top - move;
            break;
            // 下
          case 40 :
            moveY = targetRect.top - scene.top + move;
            break;
            // 左
          case 37 :
            moveX = targetRect.left - scene.left - move;
            break;
            // 右
          case 39 :
            moveX = targetRect.left - scene.left + move;
            break;
        }

        // const limitMoveX = scene.style.width.slice('px','') - target.style.width.slice('px','');
        // const limitMoveY = scene.style.height - target.style.height;

        // 地圖邊界
        if(moveX > this.limit.X || moveX < 0 || moveY > this.limit.Y || moveY < 0){
          window.requestAnimationFrame(() => {this.moveHandle(this.$refs.pacman)});
          return;
        }

        // this.$refs.pacman.style.setProperty('transform',`translate(${moveX}px,${moveY}px) rotate(${rotate}deg)`);
        character.style.setProperty('transform',`translate(${moveX}px,${moveY}px)`);

        // console.log("moveX:" + moveX)
        // console.log("moveY:" + moveY)

        this.timer = window.requestAnimationFrame(() => {this.moveHandle(this.$refs.pacman)});
      },
    }
  }
</script>

<style scoped>

</style>