<template>
  <div class="image-checker">
    <h2>Найдите неточность на картинке</h2>
    <button v-if="!gameStarted" @click="startGame">Начать игру</button>
    <div v-if="gameStarted">
      <div class="image-container-wrapper">
        <div v-for="(image, index) in images" :key="index" class="image-container">
          <img :src="image.src" @click="checkSpot(index, $event)" />
          <div v-if="highlightedSpots[index]" class="highlight" :style="highlightedSpots[index].style"></div>
        </div>
      </div>
      <p v-if="!gameEnded">{{ timer }} секунд осталось</p> <!-- Таймер выводится только если игра не закончена -->
      <p v-if="gameEnded">Игра окончена!</p>
      <p v-if="gameEnded">Вы нашли {{ foundSpots }} из {{ totalSpots }} отличий.</p>
      <button v-if="gameEnded" @click="startGame">Начать заново</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: require('../assets/img_1.png'), correctSpot: { x: 218, y: 138 } },
        { src: require('../assets/img_2.png'), correctSpot: { x: 60, y: 25 } },
        { src: require('../assets/img_3.png'), correctSpot: { x: 245, y: 60 } },
        { src: require('../assets/img_4.png'), correctSpot: { x: 150, y: 80 } },
        { src: require('../assets/img_5.png'), correctSpot: { x: 100, y: 155 } },
        { src: require('../assets/img_6.png'), correctSpot: { x: 240, y: 90 } },
        { src: require('../assets/img_7.png'), correctSpot: { x: 25, y: 70 } },
        { src: require('../assets/img_8.png'), correctSpot: { x: 260, y: 135 } },
       
      ],
      highlightedSpots: {},
      gameEnded: false,
      gameStarted: false,
      timer: 60, 
      totalSpots: 8, 
      foundSpots: 0, 
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.gameEnded = false;
      this.timer = 60; 
      this.highlightedSpots = {};
      this.foundSpots = 0; 
      this.startTimer();
    },
    checkSpot(index, event) {
      const rect = event.target.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const correctSpot = this.images[index].correctSpot;
      const errorMargin = 20; // зона, где клик считается корректным

      if (
        clickX >= correctSpot.x - errorMargin && 
        clickX <= correctSpot.x + errorMargin &&
        clickY >= correctSpot.y - errorMargin && 
        clickY <= correctSpot.y + errorMargin
      ) {
        if (!this.highlightedSpots[index]) {
          this.highlightedSpots = {
            ...this.highlightedSpots,
            [index]: {
              style: {
                position: 'absolute',
                left: `${correctSpot.x - errorMargin}px`,
                top: `${correctSpot.y - errorMargin}px`,
                width: `${errorMargin * 2}px`,
                height: `${errorMargin * 2}px`,
                border: '2px solid red',
                borderRadius: '50%',
                pointerEvents: 'none'
              }
            }
          };
          this.foundSpots++;
          this.checkGameEnd();
        }
      }
    },
    checkGameEnd() {
      if (this.foundSpots === this.totalSpots || this.timer <= 0) {
        this.gameEnded = true;
        clearInterval(this.timerInterval);
      }
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.gameEnded = true;
          clearInterval(this.timerInterval);
        }
      }, 1000);
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() { 
    clearInterval(this.timerInterval);
  }
};
</script>

<style>

.image-container-wrapper {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
}

.image-container {
  position: relative;
  display: inline-block;
  margin: 10px;
  width: 300px; 
}

.image-container img {
  width: 100%; 
  height: auto; 
}

.highlight {
  position: absolute;
}
</style>
