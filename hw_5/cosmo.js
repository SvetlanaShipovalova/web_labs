import { createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const planets = ref([]);
    const searchString = ref('');
    const sortKey = ref('mass');

    const fetchPlanets = async () => {
      const response = await fetch('data.json');
      planets.value = await response.json();
    };

    const sortedPlanets = computed(() => {
      // Фильтрация продуктов по строке поиска
      let filtered = planets.value.filter(planet => {
        const searchText = searchString.value.trim().toLowerCase();
        return (
          planet.planetname.toLowerCase().includes(searchText) ||
          planet.description.toLowerCase().includes(searchText)
        );
      });

      // Сортировка продуктов
      return filtered.sort((a, b) => {
        if (sortKey.value === 'mass') {
          return a.mass - b.mass;
        } else if (sortKey.value === 'planetname') {
          return a.planetname.localeCompare(b.planetname);
        }
      });
    });

    onMounted(fetchPlanets);

    return {
      planets,
      searchString,
      sortKey,
      sortedPlanets
    };
  }
}).mount('#app');