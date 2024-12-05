<template>
    <div class="container">
        <h2>Погода</h2>
        <div>
            <div>
                <select v-model="selectedCountry">
                    <option value="" disabled>Выберите страну</option>
                    <option v-for="country in countries" :key="country.id" :value="country.id">
                        {{ country.name }}
                    </option>
                </select>
                <button @click="getAverageTemperature">Узнать</button>
            </div>
            <div v-if="averageTemperature !== null">
                <p>Средняя температура. {{ selectedCountryName }}: 
                    <span>{{ averageTemperature }}°C</span>
                </p>
            </div>
            <div v-else-if="error">
                <h2 style="color: red;">Ошибка: {{ error }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            countries: [
                { id: 'Russia', name: 'Russia', cities: [ { name: 'Moscow' }, { name: 'Novosibirsk' }, { name: 'Yekaterinburg' }, { name: 'Nizhny Novgorod' }, { name: 'Kazan' }, { name: 'Chelyabinsk' }, { name: 'Rostov-on-Don' }, { name: 'Krasnoyarsk' }, { name: 'Krasnodar' }, { name: 'Sochi' }] },
                { id: 'Germany', name: 'Germany', cities: [ { name: 'Berlin' }, { name: 'Munich' }, { name: 'Hamburg' }, { name: 'Cologne' }, { name: 'Frankfurt' }, { name: 'Stuttgart' }, { name: 'Düsseldorf' }, { name: 'Dortmund' }, { name: 'Essen' }, { name: 'Leipzig' }] },
                { id: 'Australia', name: 'Australia', cities: [ { name: 'Sydney' }, { name: 'Melbourne' }, { name: 'Brisbane' }, { name: 'Perth' }, { name: 'Adelaide' }, { name: 'Gold Coast' }, { name: 'Canberra' }, { name: 'Hobart' }, { name: 'Darwin' }, { name: 'Newcastle' }] },
                { id: 'Canada', name: 'Canada', cities: [ { name: 'Toronto' }, { name: 'Vancouver' }, { name: 'Montreal' }, { name: 'Calgary' }, { name: 'Ottawa' }, { name: 'Edmonton' }, { name: 'Quebec City' }, { name: 'Winnipeg' }, { name: 'Hamilton' }, { name: 'Kitchener' }] },
                { id: 'UAE', name: 'United Arab Emirates', cities: [ { name: 'Abu Dhabi' }, { name: 'Dubai' }, { name: 'Sharjah' }, { name: 'Ajman' }, { name: 'Ras Al Khaimah' }, { name: 'Fujairah' }, { name: 'Umm Al-Quwain' }, { name: 'Al Ain' }, { name: 'Khalifa City' }, { name: 'Dubai Marina' }] }
            ],
            selectedCountry: '',
            selectedCountryName: '',
            averageTemperature: null,
            error: null,
            apiKey: 'eb1e7ab4af7e456e3fd77014f74e3632', 
        };
    },
    methods: {
        async getAverageTemperature() {
            this.averageTemperature = null;
            this.error = null;
            this.selectedCountryName = this.countries.find(c => c.id === this.selectedCountry)?.name || '';

            if (this.selectedCountry) {
                const country = this.countries.find(c => c.id === this.selectedCountry);
                if (country && country.cities) {
                    const temperatures = await Promise.all(
                        country.cities.map(async (city) => {
                            try {
                                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${this.apiKey}&units=metric&lang=ru`;
                                const response = await fetch(apiUrl);
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status} for city ${city.name}`);
                                }
                                const data = await response.json();
                                return data.main.temp;
                            } catch (error) {
                                console.error(`Error fetching weather for ${city.name}:`, error);
                                return null;
                            }
                        })
                    );
                    const validTemperatures = temperatures.filter(temp => temp !== null);
                    if (validTemperatures.length > 0) {
                        this.averageTemperature = Math.round(validTemperatures.reduce((sum, temp) => sum + temp, 0) / validTemperatures.length);
                    } else {
                        this.error = "Не удалось получить данные о погоде ни для одного города.";
                    }
                }
            }
        },
    },
};
</script>

<style scoped>
button {
    margin-left: 10px;
}
</style>
