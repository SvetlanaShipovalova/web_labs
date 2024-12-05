<template>
  <div>
    <h1>Конвертер валют</h1>
    <input v-model.number="amount" placeholder="Введите сумму" />

    <select v-model="selectedCurrency" @change="resetConvertedAmount">
      <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
        {{ currency.name }}
      </option>
    </select>

    <button @click="convertCurrency">Конвертировать</button>

    <div v-if="convertedAmount !== null">
      <h2>Результат:</h2>
      <p>{{ amount }} {{ selectedCurrency }} = {{ convertedAmount }} {{ targetCurrency }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      selectedCurrency: 'USD',
      convertedAmount: null,
      targetCurrency: 'RUB',
      currencies: [
        { code: 'USD', name: 'Доллар США' },
        { code: 'EUR', name: 'Евро' },
        { code: 'GBP', name: 'Британский фунт' },
        { code: 'JPY', name: 'Японская иена' },
      ],
      exchangeRates: {
        USD: 103, 
        EUR: 109,
        GBP: 131,
        JPY: 0.68,
      },
    };
  },
  methods: {
    convertCurrency() {
      if (this.amount > 0 && this.exchangeRates[this.selectedCurrency]) {
        this.convertedAmount = (this.amount * this.exchangeRates[this.selectedCurrency]).toFixed(2);
      } else {
        this.convertedAmount = null;
      }
    },
    resetConvertedAmount() {
      this.convertedAmount = null;
    },
  },
};
</script>

<style scoped>
button,select {
    margin-left: 10px;
}
</style>
