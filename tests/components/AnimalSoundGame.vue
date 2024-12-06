<template>
  <div>
    <h2>Найди звуки животных!</h2>
    <div v-if="!gameStarted && !gameFinished">
      <button @click="startGame">Старт</button>
    </div>
    <div v-else-if="!gameFinished">
      <div class="game-container">
        <div class="animal-cards">
          <h2>Карточки с животными</h2>
          <div class="card-container">
            <div 
              v-for="(animal, index) in shuffledAnimals" 
              :key="index" 
              class="card" 
              :class="{ matched: isMatched(animal) }" 
              @click="selectAnimal(animal)"
            >
              <img :src="animal.image" alt="animal" />
            </div>
          </div>
          <p>Осталось времени: {{ timeLeft }}</p>
          <p>Набранные очки: {{ score }}</p>
        </div>
        <div class="sound-cards">
          <h2>Карточки со звуками</h2>
          <div v-for="(sound, index) in shuffledSounds" :key="index" class="card">
            <audio controls>
              <source :src="sound.audio" type="audio/mpeg">
            </audio>
            <button @click="selectSound(sound)">
              Нажмите для выбора
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Игра окончена!</h2>
      <p>Вы набрали: {{ score }} очков!</p>
      <p>Оценка: {{ grade }}</p>
      <button @click="restartGame">Начать заново</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animals: [
        { name: "Собака", image: require("../assets/dog.png") },
        { name: "Кошка", image: require("../assets/cat.png") },
        { name: "Лошадь", image: require("../assets/horse.png") },
        { name: "Корова", image: require("../assets/cow.png") },
        { name: "Птица", image: require("../assets/bird.png") },
        { name: "Овца", image: require("../assets/sheep.png") },
        { name: "Крыса", image: require("../assets/rat.png") }, 
        { name: "Свинья", image: require("../assets/pig.png") }, 
        { name: "Утка", image: require("../assets/duck.png") }, 
        { name: "Кабан", image: require("../assets/wild_boar.png") }, 
      ],
      sounds: [
        { name: "Собака", audio: require("../assets/dog.mp3") },
        { name: "Кошка", audio: require("../assets/cat.mp3") },
        { name: "Лошадь", audio: require("../assets/horse.mp3") },
        { name: "Корова", audio: require("../assets/cow.mp3") },
        { name: "Птица", audio: require("../assets/bird.mp3") },
        { name: "Овца", audio: require("../assets/sheep.mp3") },
        { name: "Крыса", audio: require("../assets/rat.mp3") }, 
        { name: "Свинья", audio: require("../assets/pig.mp3") }, 
        { name: "Утка", audio: require("../assets/duck.mp3") }, 
        { name: "Кабан", audio: require("../assets/wild_boar.mp3") }, 
      ],
      matchedPairs: [],
      selectedAnimal: null,
      selectedSound: null,
      score: 0,
      timeLeft: 60,
      gameFinished: false,
      gameStarted: false,
      timer: null,
      shuffledAnimals: [],
      shuffledSounds: []
    };
  },
  computed: {
    grade() {
      if (this.score <= 2) return "Плохо";
      else if (this.score <= 3) return "Хорошо";
      else return "Отлично";
    },
  },
  methods: {
    shuffleAnimals() {
      this.shuffledAnimals = this.animals.sort(() => Math.random() - 0.5);
    },
    shuffleSounds() {
      this.shuffledSounds = this.sounds.sort(() => Math.random() - 0.5);
    },
    selectAnimal(animal) {
      if (this.isMatched(animal)) return; 
      this.selectedAnimal = animal;
      this.checkMatch();
    },
    selectSound(sound) {
      this.selectedSound = sound;
      this.checkMatch();
    },
    checkMatch() {
      if (this.selectedAnimal && this.selectedSound) {
        if (this.selectedAnimal.name === this.selectedSound.name && !this.isMatched(this.selectedAnimal)) {
          this.matchedPairs.push(this.selectedAnimal);
          this.score++;
        }
        this.selectedAnimal = null;
        this.selectedSound = null;

        if (this.matchedPairs.length === this.animals.length) {
          this.endGame(); 
        }
      }
    },
    isMatched(animal) {
      return this.matchedPairs.includes(animal);
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.endGame();
        }
      }, 1000);
    },
    endGame() {
      this.gameFinished = true;
      clearInterval(this.timer);
    },
    restartGame() {
      this.score = 0;
      this.timeLeft = 60;
      this.matchedPairs = [];
      this.gameFinished = false;
      this.gameStarted = false; 
      this.shuffleAnimals(); 
      this.shuffleSounds(); 
    },
    startGame() {
      this.gameStarted = true; 
      this.shuffleAnimals(); 
      this.shuffleSounds(); 
      this.startTimer(); 
    },
  },
  mounted() {
    this.shuffleAnimals(); 
    this.shuffleSounds(); 
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.animal-cards {
  flex: 1; 
  margin-right: 20px; 
}

.sound-cards {
  flex: 0.5; 
}

.card-container {
  display: flex;
  flex-wrap: wrap; 
  margin-left: 10%;
}

.card {
  width: fit-content; 
  display: flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}

.card img {
  justify-content: center;
  max-width: 100px;
  max-height: 100px;
}

</style>