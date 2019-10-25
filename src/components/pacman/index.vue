<template>
  <div class="pacman" ref="pacman">
    <svg-icon class="pacman-detail" :class="pacmanRotate" iconClass="pacman"></svg-icon>
  </div>
</template>

<script>
  import roleMovement from '../mixins/roleMovement'
  export default {
    name: "pacman",
    mixins : [roleMovement],
    props: {
      scene : {
        top:0,
        left:0,
        limit : {
          X: 0,
          Y: 0,
        }
      },

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
        direction : 'left',
      }
    },
    mounted() {
      window.addEventListener('keydown',this.keydownHandle);
    },
    methods :{
      startHandle (){
        window.requestAnimationFrame(() => {this.pacmanMovement(this.$refs.pacman)});
      },
      reStartHandle (){
        this.$refs.pacman.style.setProperty('transform',`translate(0px,0px)`);

        this.direction = 'left';
        this.pacmanRotate = {'pacman--right': true};

        this.startHandle();
      },
      endHandle (){
        cancelAnimationFrame(this.timer);
      },
      keydownHandle (e) {
        switch (e.keyCode) {
            // 上
          case 38 :
            this.pacmanRotate = {'pacman--up': true};
            this.direction = 'up';
            break;
            // 下
          case 40 :
            this.pacmanRotate = {'pacman--down': true};
            this.direction = 'down';
            break;
            // 左
          case 37 :
            this.pacmanRotate = {'pacman--left': true};
            this.direction = 'right';
            break;
            // 右
          case 39 :
            this.pacmanRotate = {'pacman--right': true};
            this.direction = 'left';
            break;
          default :
            return;
        }

        this.keyCode = e.keyCode;
      },
      pacmanMovement (role) {
        this.moveHandle(role);
        // console.log(role)
        this.timer = window.requestAnimationFrame(() => {this.pacmanMovement(role)});
      }
    }
  }
</script>

<style scoped>

</style>