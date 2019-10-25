
<script>
  export default {
    name: "roleMovement",
    methods: {
      moveHandle (role) {
        // 移動距離
        const move = 2;

        // 遊戲畫面
        const scene = this.scene;

        // 玩家
        const targetRect = role.getBoundingClientRect();

        // console.log(targetRect.left,scene.left)

        // 當前位置
        let moveX = targetRect.left - scene.left;
        let moveY = targetRect.top - scene.top;

        switch (this.direction) {
            // 上
          case 'up' :
            moveY = targetRect.top - scene.top - move;
            break;
            // 下
          case 'down' :
            moveY = targetRect.top - scene.top + move;
            break;
            // 左
          case 'right' :
            moveX = targetRect.left - scene.left - move;
            break;
            // 右
          case 'left' :
            moveX = targetRect.left - scene.left + move;
            break;
            // 撞到地圖邊界
          case 0 :
            return;
        }

        // const limitMoveX = scene.style.width.slice('px','') - target.style.width.slice('px','');
        // const limitMoveY = scene.style.height - target.style.height;

        // 地圖邊界
        if(moveX > this.scene.limit.X || moveX < 0 || moveY > this.scene.limit.Y || moveY < 0){
          this.direction = 0;
          return;
        }

        // this.$refs.pacman.style.setProperty('transform',`translate(${moveX}px,${moveY}px) rotate(${rotate}deg)`);
        role.style.setProperty('transform',`translate(${moveX}px,${moveY}px)`);

        // console.log("moveX:" + moveX)
        // console.log("moveY:" + moveY)


      },
    }
  }
</script>

<style scoped>

</style>