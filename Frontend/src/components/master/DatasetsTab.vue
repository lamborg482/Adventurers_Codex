<template>
  <div class="datasets-container">
    <!-- Панель поиска и фильтров -->
    <div class="datasets-filters">
      <div class="search-input__all-input">
        <input
          type="text"
          v-model="searchQuery"
          class="datasets-search-input"
          placeholder="Поиск..."
        />
        <span class="search-input__line-bottom"></span>
      </div>
      <div class="viwe-filtr__all-select">
        <select v-model="filterType" class="filter-select">
          <option value="all">Все</option>
          <option value="monster">Монстры</option>
          <option value="npc">NPC</option>
        </select>
        <span class="viwe-filtr__line-bottom"></span>
      </div>
      <div class="viwe-filtr__all-select">
        <select v-model="filterCr" class="filter-select">
          <option value="all">Любой CR</option>
          <option value="0">CR 0</option>
          <option value="1/8">CR 1/8</option>
          <option value="1/4">CR 1/4</option>
          <option value="1/2">CR 1/2</option>
          <option v-for="n in 30" :key="n" :value="n">CR {{ n }}</option>
        </select>
        <span class="viwe-filtr__line-bottom"></span>
      </div>
      <button class="reset-filters" @click="resetFilters">Сброс</button>
    </div>

    <div class="horizontal-scroll">
      <div
        v-for="creature in filteredCreatures"
        :key="creature.id"
        class="dataset-card"
        @click="$emit('open-detail', creature)"
      >
        <img v-if="creature.img" :src="creature.img" class="dataset-card__image" alt="">
        <div class="dataset-card__info">
          <h4>{{ creature.name }}</h4>
          <p>AC {{ creature.ac }} | HP {{ creature.hp }} | CR {{ creature.cr }}</p>
          <p>{{ creature.type === 'monster' ? 'Монстр' : 'NPC' }}</p>
          <button 
            class="add-to-bestiary-btn" 
            @click.stop="$emit('add-to-bestiary', creature)"
            title="Добавить в мой бестиарий"
          >
            ➕ Добавить в бестиарий
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  datasetCreatures: { type: Array, required: true }
})

const emit = defineEmits(['open-detail', 'add-to-bestiary'])

const searchQuery = ref('')
const filterType = ref('all')
const filterCr = ref('all')

const filteredCreatures = computed(() => {
  let result = props.datasetCreatures
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => c.name.toLowerCase().includes(q))
  }
  if (filterType.value !== 'all') {
    result = result.filter(c => c.type === filterType.value)
  }
  if (filterCr.value !== 'all') {
    result = result.filter(c => c.cr == filterCr.value)
  }
  return result
})

const resetFilters = () => {
  searchQuery.value = ''
  filterType.value = 'all'
  filterCr.value = 'all'
}
</script>

<style scoped>
.datasets-container {
  width: 32vw;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.datasets-filters {
  display: flex;
  gap: 0.5vw;
  margin-bottom: 1vw;
  align-items: flex-end;
}
.datasets-search-input {
  background: transparent;
  border: none;
  font-size: 1.2vw;
  width: 100%;
}
.search-input__all-input {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.search-input__line-bottom {
  width: 100%;
  height: 2px;
  background-color: black;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}
.search-input__all-input:hover .search-input__line-bottom {
  transform: scaleX(1.07);
}
.viwe-filtr__all-select {
  display: flex;
  flex-direction: column;
}
.viwe-filtr__line-bottom {
  width: 100%;
  height: 2px;
  background-color: black;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}
.viwe-filtr__all-select:hover .viwe-filtr__line-bottom {
  transform: scaleX(1.1);
}
.reset-filters {
  background: transparent;
  border: none;
  font-size: 1.2vw;
  cursor: pointer;
  position: relative;
  padding-bottom: 2px;
}
.reset-filters:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: black;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}
.reset-filters:hover:after {
  transform: scaleX(1.2);
}
.horizontal-scroll {
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  gap: 1rem;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: #790202 #ccc;
  flex-direction: column;
  max-height: 23vw;
}
.horizontal-scroll::-webkit-scrollbar {
  width: 6px;
}
.horizontal-scroll::-webkit-scrollbar-thumb {
  background-color: #790202;
  border-radius: 10px;
}
.dataset-card {
  flex: 0 0 auto;
  min-width: 150px;
  background: transparent;
  padding: 0.5rem 0.25rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  align-items: center;
  justify-content: space-between;
}
.dataset-card:hover {
  transform: scale(1.02) translateY(-2px);
}
.dataset-card__image {
  width: 6vw;
  height: 6vw;
  min-height: 80px;
  object-fit: contain;
  background: transparent;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.dataset-card__info {
  flex: 1;
  margin-right: 0.5rem;
}
.dataset-card__info h4 {
  margin: 0 0 0.2rem 0;
  font-size: 1.4vw;
  color: black;
  transition: color 0.3s ease;
}
.dataset-card:hover h4 {
  color: #790202;
}
.dataset-card__info p {
  margin: 0.1rem 0;
  font-size: 1.2vw;
  color: #333;
  transition: color 0.3s ease;
}
.dataset-card:hover p {
  color: #790202;
}
.dataset-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.09vw;
  background-color: black;
  transform: scaleX(1);
  transition: transform 0.3s ease;
  transform-origin: left;
}
.dataset-card:hover::after {
  transform: scaleX(1.1);
  background-color: black;
}
.add-to-bestiary-btn {
  background: transparent;
  border: 1px solid #790202;
  color: #790202;
  padding: 0.2vw 0.5vw;
  font-size: 1vw;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.3vw;
  width: 100%;
}
.add-to-bestiary-btn:hover {
  background: #790202;
  color: white;
}
</style>