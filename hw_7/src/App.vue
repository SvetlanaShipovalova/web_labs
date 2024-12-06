<template>
    <div id="app">
        <div class="section weather-section">
            <ConvertApp />
        </div>
        <div class="section bitcoin-section">
            <WeatherApp />
        </div>
    </div>
</template>

<script>
import ConvertApp from './components/ConvertApp.vue';
import WeatherApp from './components/WeatherApp.vue';

export default {
    components: {
        ConvertApp,
        WeatherApp,
    }
};
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
}

.section {
    width: 100%;
    max-width: 600px;
    padding: 20px;
    margin: 10px 0;
    border-radius: 8px;
}

.weather-section {
    background-color: #ADD8E6; /* Голубой цвет */
}

.bitcoin-section {
    background-color: #DAA520; /* Цвет охра */
}

h1, h2, h3 {
    margin: 0 0 10px;
}

button {
    margin-top: 10px;
}
</style>
