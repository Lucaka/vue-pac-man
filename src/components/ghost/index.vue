<template>
  <div class="ghost" ref="ghost">
    <svg-icon class="ghost-detail" iconClass="ghost"></svg-icon>
  </div>
</template>

<script>
  import roleMovement from "../mixins/roleMovement";

  export default {
    name: "ghost",
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
      trans :{
        X:0,
        Y:0
      }
    },
      data () {
      return {
        direction : 'left',
        timer:0,
        changeDirectionInterval:0,
      }
    },
    methods : {
      startHandle () {
        // 鬼魂初始化
        this.$refs.ghost.style.setProperty('transform',`translate(${this.trans.X}px,${this.trans.Y}px)`);

        this.changeDirectionInterval = setInterval(this.changeDirection, 500);

        window.requestAnimationFrame(() => {this.ghostMovement(this.$refs.ghost)});
      },
      reStartHandle () {
        // 鬼魂初始化
        this.$refs.ghost.style.setProperty('transform',`translate(${this.trans.X}px,${this.trans.Y}px)`);

        this.startHandle();
      },
      endHandle (){
        cancelAnimationFrame(this.timer);

        clearInterval(this.changeDirectionInterval);
      },
      // 改變路徑
      changeDirection() {
        let movement = Math.floor(Math.random() * 4) + 0;
        let arrayOfMovement = ['left', 'up', 'down', 'right'];

        this.direction = arrayOfMovement[movement];
      },
      ghostMovement (role) {
        this.moveHandle(role);
        // console.log(role)
        this.timer = window.requestAnimationFrame(() => {this.ghostMovement(role)});
      }
    }
  }
</script>

<style scoped>

</style>