<template>
  <div id="app">
    <h1>Тесты</h1>
    <div>
      <button v-for="(game, index) in games" :key="index" @click="selectGame(index)">
        Игра {{ index + 1 }}
      </button>
    </div>
    <component :is="currentGame" />
  </div>
</template>

<script>
import AnimalSoundGame from './components/AnimalSoundGame.vue';
import TestRavena from './components/TestRavena.vue';
import LogicalTest from './components/LogicalTest.vue';
import AttentionTest from './components/AttentionTest.vue';
import CoordTest from './components/CoordTest.vue';

export default {
  components: {
    AnimalSoundGame,
    TestRavena,
    LogicalTest,
    CoordTest,
    AttentionTest,
  },
  data() {
    return {
      games: ['AnimalSoundGame', 'TestRavena', 'LogicalTest', 'AttentionTest', 'CoordTest'], 
      currentGameIndex: 0,
    };
  },
  computed: {
    currentGame() {
      return this.games[this.currentGameIndex];
    },
  },
  methods: {
    selectGame(index) {
      this.currentGameIndex = index;
    },
  },
};
</script>

<style src="./assets/style.css"></style>
