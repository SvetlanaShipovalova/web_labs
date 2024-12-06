<template>
  <div>
    <h2>Прогрессивные матрицы Равена</h2>

    <div v-if="!isTestStarted">
      <button @click="startTest">Начать тест</button>
    </div>

    <div v-if="isTestStarted && !isAgeEntered">
      <label for="age">Введите ваш возраст:</label><br>
      <input type="number" v-model="age" id="age" min="0" /><br>
      <button @click="enterAge">Подтвердить возраст</button>
    </div>

    <div v-if="isTestStarted && isAgeEntered">
      <div v-if="currentQuestion">
        <img :src="currentQuestion.image" alt="Matrix" />
        <div class="options">
          <div
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option"
            @click="checkAnswer(option)"
          >
            <img :src="option" alt="Option" />
          </div>
        </div>
      </div>
      <div v-else>
        <h3>Тест завершен!</h3>
        <p>Ваши очки: {{ score }}</p>
        <p>Итоговый балл: {{ finalScore }}</p>
        <p>Затраченное время: {{ totalTime }} секунд</p>
        <p>{{ intelligenceLevel }}</p>
        <button @click="restartTest">Начать заново</button>
      </div>
      <div v-if="currentQuestion">Ограничение по времени: {{ remainingTime }} секунд</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestionIndex: 0,
      score: 0,
      isTestStarted: false,
      isAgeEntered: false,
      age: null,
      remainingTime: 1200, // 20 минут в секундах
      timer: null,
      questions: [
        {
          image: require('../assets/m_1.png'),
          options: [require('../assets/m_1.1.png'), require('../assets/m_1.2.png'), require('../assets/m_1.3.png')],
          correct: require('../assets/m_1.2.png'),
        },
        {
          image: require('../assets/m_2.png'),
          options: [require('../assets/m_2.1.png'), require('../assets/m_2.2.png'), require('../assets/m_2.3.png')],
          correct: require('../assets/m_2.3.png'),
        },
        {
          image: require('../assets/m_3.png'),
          options: [require('../assets/m_3.1.png'), require('../assets/m_3.2.png'), require('../assets/m_3.3.png')],
          correct: require('../assets/m_3.3.png'),
        },
        {
          image: require('../assets/m_4.png'),
          options: [require('../assets/m_4.1.png'), require('../assets/m_4.2.png'), require('../assets/m_4.3.png')],
          correct: require('../assets/m_4.2.png'),
        },
        {
          image: require('../assets/m_5.png'),
          options: [require('../assets/m_5.1.png'), require('../assets/m_5.2.png'), require('../assets/m_5.3.png')],
          correct: require('../assets/m_5.1.png'),
        },
        {
          image: require('../assets/m_6.png'),
          options: [require('../assets/m_6.1.png'), require('../assets/m_6.2.png'), require('../assets/m_6.3.png')],
          correct: require('../assets/m_6.1.png'),
        },
        {
          image: require('../assets/m_7.png'),
          options: [require('../assets/m_7.1.png'), require('../assets/m_7.2.png'), require('../assets/m_7.3.png')],
          correct: require('../assets/m_7.2.png'),
        },
        {
          image: require('../assets/m_8.png'),
          options: [require('../assets/m_8.1.png'), require('../assets/m_8.2.png'), require('../assets/m_8.3.png')],
          correct: require('../assets/m_8.3.png'),
        },
        {
          image: require('../assets/m_9.png'),
          options: [require('../assets/m_9.1.png'), require('../assets/m_9.2.png'), require('../assets/m_9.3.png')],
          correct: require('../assets/m_9.2.png'),
        },
        {
          image: require('../assets/m_10.png'),
          options: [require('../assets/m_10.1.png'), require('../assets/m_10.2.png'), require('../assets/m_10.3.png')],
          correct: require('../assets/m_10.1.png'),
        },
        {
          image: require('../assets/m_11.png'),
          options: [require('../assets/m_11.1.png'), require('../assets/m_11.2.png'), require('../assets/m_11.3.png')],
          correct: require('../assets/m_11.2.png'),
        },
        {
          image: require('../assets/m_12.png'),
          options: [require('../assets/m_12.1.png'), require('../assets/m_12.2.png'), require('../assets/m_12.3.png')],
          correct: require('../assets/m_12.3.png'),
        },
        {
          image: require('../assets/m_13.png'),
          options: [require('../assets/m_13.1.png'), require('../assets/m_13.2.png'), require('../assets/m_13.3.png')],
          correct: require('../assets/m_13.3.png'),
        },
        {
          image: require('../assets/m_14.png'),
          options: [require('../assets/m_14.1.png'), require('../assets/m_14.2.png'), require('../assets/m_14.3.png')],
          correct: require('../assets/m_14.1.png'),
        },
        {
          image: require('../assets/m_15.png'),
          options: [require('../assets/m_15.1.png'), require('../assets/m_15.2.png'), require('../assets/m_15.3.png')],
          correct: require('../assets/m_15.2.png'),
        },
        {
          image: require('../assets/m_16.png'),
          options: [require('../assets/m_16.1.png'), require('../assets/m_16.2.png'), require('../assets/m_16.3.png')],
          correct: require('../assets/m_16.2.png'),
        },
        {
          image: require('../assets/m_17.png'),
          options: [require('../assets/m_17.1.png'), require('../assets/m_17.2.png'), require('../assets/m_17.3.png')],
          correct: require('../assets/m_17.3.png'),
        },
        {
          image: require('../assets/m_18.png'),
          options: [require('../assets/m_18.1.png'), require('../assets/m_18.2.png'), require('../assets/m_18.3.png')],
          correct: require('../assets/m_18.1.png'),
        },
        {
          image: require('../assets/m_19.png'),
          options: [require('../assets/m_19.1.png'), require('../assets/m_19.2.png'), require('../assets/m_19.3.png')],
          correct: require('../assets/m_19.2.png'),
        },
         {
          image: require('../assets/m_20.png'),
          options: [require('../assets/m_20.1.png'), require('../assets/m_20.2.png'), require('../assets/m_20.3.png')],
          correct: require('../assets/m_20.2.png'),
        },
        {
          image: require('../assets/m_21.png'),
          options: [require('../assets/m_21.1.png'), require('../assets/m_21.2.png'), require('../assets/m_21.3.png')],
          correct: require('../assets/m_21.1.png'),
        },
        {
          image: require('../assets/m_22.png'),
          options: [require('../assets/m_22.1.png'), require('../assets/m_22.2.png'), require('../assets/m_22.3.png')],
          correct: require('../assets/m_22.3.png'),
        },
        {
          image: require('../assets/m_23.png'),
          options: [require('../assets/m_23.1.png'), require('../assets/m_23.2.png'), require('../assets/m_23.3.png')],
          correct: require('../assets/m_23.1.png'),
        },
        {
          image: require('../assets/m_24.png'),
          options: [require('../assets/m_24.1.png'), require('../assets/m_24.2.png'), require('../assets/m_24.3.png')],
          correct: require('../assets/m_24.2.png'),
        },
        {
          image: require('../assets/m_25.png'),
          options: [require('../assets/m_25.1.png'), require('../assets/m_25.2.png'), require('../assets/m_25.3.png')],
          correct: require('../assets/m_25.3.png'),
        },
      ],
      totalTime: 0, 
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    finalScore() {
      const coefficient = this.getCoefficient();
      return (this.score * 12) * coefficient; 
    },
    intelligenceLevel() {
      const score = this.finalScore;
      if (score > 140) return 'Незаурядный, выдающийся интеллект';
      else if (score >= 121) return 'Высокий уровень интеллекта';
      else if (score >= 111) return 'Интеллект выше среднего';
      else if (score >= 91) return 'Средний уровень интеллекта';
      else if (score >= 81) return 'Интеллект ниже среднего';
      else if (score >= 71) return 'Низкий уровень интеллекта';
      else if (score >= 51) return 'Легкая степень слабоумия';
      else if (score >= 21) return 'Средняя степень слабоумия';
      else return 'Тяжелая степень слабоумия';
    },
  },
  methods: {
    startTest() {
      this.isTestStarted = true;
      this.score = 0;
      this.currentQuestionIndex = 0;
      this.totalTime = 0; 
    },
    enterAge() {
      this.isAgeEntered = true;
      this.startTimer(); 
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          this.totalTime++;
        } else {
          clearInterval(this.timer);
          this.currentQuestionIndex = this.questions.length; 
        }
      }, 1000);
    },
    checkAnswer(option) {
      if (option === this.currentQuestion.correct) {
        this.score++;
      }
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        clearInterval(this.timer);
        this.currentQuestionIndex = this.questions.length; 
      }
    },
    restartTest() {
      this.remainingTime = 1200; 
      this.isTestStarted = false;
      this.isAgeEntered = false; 
      this.score = 0; 
      this.currentQuestionIndex = 0; 
      this.totalTime = 0; 
    },
    getCoefficient() {
      if (this.age >= 18 && this.age <= 25) return 0.8;
      else if (this.age >= 26 && this.age <= 35) return 0.7;
      else if (this.age >= 36 && this.age <= 45) return 0.6;
      else if (this.age >= 46) return 0.5;
      else return 1.0; 
    },
  },
  beforeUnmount() {
    clearInterval(this.timer); 
  },
};
</script>

<style scoped>
.options {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.option {
  margin: 0 10px;
  cursor: pointer;
}
.option img {
  width: 100px; 
  height: auto;
}
</style>
