<template>
  <div v-if="loading" class="loading-spinner">Загрузка...</div>
  <div v-if="error" class="error-message">{{ error }}</div>
  <div class="bestiary-tab">
    <div class="book-master__viwe-create" @click="$emit('open-create')">
      + Создать новое существо
      <span class="book-master__line-bottom"></span>
    </div>

    <div class="book-master__viwe-serche">
      <form class="book-master__search-wrapper" @submit.prevent="handleSearch">
        <div class="book-master__search-container">
          <div class="search-input__all-input">
            <input
              type="text"
              :value="searchQuery"
              @input="$emit('update:search-query', $event.target.value)"
              class="book-master__search-input"
              placeholder="Search here!"
              name="text"
              maxlength="30"
            />
            <span class="search-input__line-bottom"></span>
          </div>
          <button type="submit" class="book-master__search-button" name="submit">
            <img class="search-button__bacground-icon" src="@/views/style/img/button-search.png" alt="Поиск">
          </button>
        </div>
      </form>
    </div>

    <div class="book-master__viwe-filtr">
      <div class="viwe-filtr__all-select">
        <select :value="filterType" @change="$emit('update:filter-type', $event.target.value)" class="filter-select">
          <option value="all">Все</option>
          <option value="monster">Монстры</option>
          <option value="npc">NPC</option>
        </select>
        <span class="viwe-filtr__line-bottom"></span>
      </div>
      <div class="viwe-filtr__all-select">
        <select :value="filterCr" @change="$emit('update:filter-cr', $event.target.value)" class="filter-select">
          <option value="all">Любой CR</option>
          <option value="0">CR 0</option>
          <option value="1/8">CR 1/8</option>
          <option value="1/4">CR 1/4</option>
          <option value="1/2">CR 1/2</option>
          <option v-for="n in 30" :key="n" :value="n">CR {{ n }}</option>
        </select>
        <span class="viwe-filtr__line-bottom"></span>
      </div>
      <div class="viwe-filtr__all-select">
        <select :value="filterHabitat" @change="$emit('update:filter-habitat', $event.target.value)" class="filter-select">
          <option value="all">Любая местность</option>
          <option value="forest">Лес</option>
          <option value="mountains">Горы</option>
          <option value="swamp">Болото</option>
          <option value="underdark">Подземье</option>
          <option value="urban">Город</option>
        </select>
        <span class="viwe-filtr__line-bottom"></span>
      </div>
      <button class="reset-filters" @click="$emit('reset-filters')">
        Сброс
        <span class="reset-filters__line-bottom"></span>
      </button>
    </div>

    <div class="viwe-display__all-item">
      <div v-if="creatures.length" class="creature-grid">
        <div
          v-for="creature in creatures"
          :key="creature.id"
          class="creature-card"
          @click="$emit('open-detail', creature)"
        >
          <div class="viwe-display__line-cart">
            <div class="card-header">
              <h3 class="card-header cart-header__title-name">{{ creature.name }}</h3>
            </div>
            <div class="creature-card__cart-item">
              <div class="card-actions">
                <button class="card-actions__button card-actions__button-edit" @click.stop="$emit('edit', creature)">🖋️</button>
                <button class="card-actions__button card-actions__button-duplicat" @click.stop="$emit('duplicate', creature.id)">📜</button>
                <button class="card-actions__button card-actions__button-delete" @click.stop="$emit('delete', creature.id)">🗑️</button>
              </div>
              <div class="text-cart card-type">
                {{ creature.type === 'monster' ? 'Монстр' : 'NPC' }}
                <span class="text-cart" v-if="creature.cr"> | CR {{ creature.cr }} | </span>
              </div>
              <div class="text-cart card-stats">
                <span class="text-cart">AC {{ creature.ac }} |</span>
                <span class="text-cart"> HP {{ creature.hp }}</span>
              </div>
            </div>
          </div>
          <div class="creature-card__line-item">
            <span class="creature-card__line-button"></span>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>Нет существ. Создайте первое!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  creatures: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
  searchQuery: { type: String, required: true },
  filterType: { type: String, required: true },
  filterCr: { type: String, required: true },
  filterHabitat: { type: String, required: true }
})

defineEmits([
  'update:search-query',
  'update:filter-type',
  'update:filter-cr',
  'update:filter-habitat',
  'reset-filters',
  'open-create',
  'open-detail',
  'edit',
  'duplicate',
  'delete'
])

const handleSearch = () => {
  // Просто предотвращаем отправку формы, поиск идёт через v-model
}
</script>

<style scoped>
@import "@/views/style/global_style.css";

.bestiary-tab {
  width: 100%;
}

.book-master__viwe-create {
  font-size: 1.6vw;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0;
  margin-bottom: 1.6vw;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.book-master__viwe-create:hover {
  color: rgb(109, 9, 9);
  transform: translateY(-4px) scale(1.01);
}

.book-master__line-bottom {
  width: 100%;
  height: 2px;
  background-color: black;
  pointer-events: none;
  overflow: hidden;
  transition: transform 0.9s ease, background-color 0.3s ease;
  transform-origin: left;
}

.book-master__viwe-create:hover .book-master__line-bottom {
  transform: scaleX(1.2);
  background-color: black;
}

.book-master__viwe-serche {
  width: 100%;
}

.book-master__search-container {
  display: flex;
  margin-bottom: 2vw;
}

.search-input__all-input {
  display: flex;
  width: 62%;
  flex-direction: column;
}

.book-master__search-input {
  background-color: transparent;
  border: none;
  font-size: 1.5vw;
  width: 100%;
}

.search-input__line-bottom {
  width: 100%;
  height: 2px;
  background-color: black;
  pointer-events: none;
  overflow: hidden;
  transition: transform 0.9s ease, background-color 0.3s ease;
  transform-origin: left;
}

.search-input__all-input:hover .search-input__line-bottom {
  transform: scaleX(1.07);
  background-color: black;
}

.book-master__search-input:focus {
  outline: none;
}

.book-master__search-button {
  width: 3vw;
  height: 3vw;
  background: transparent;
  border: none;
}

.search-button__bacground-icon {
  width: 4vw;
  height: 3vw;
  transition: all 0.3s ease-in-out;
}

.search-button__bacground-icon:hover {
  transform: translateY(-4px) scale(1.01);
}

.book-master__viwe-filtr {
  display: flex;
  width: 32vw;
  justify-content: space-between;
}

.filter-select {
  background-color: transparent;
  border: none;
  font-size: 1.2vw;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.viwe-filtr__all-select {
  display: flex;
  flex-direction: column;
}

.viwe-filtr__line-bottom {
  width: 100%;
  height: 2px;
  background-color: black;
  pointer-events: none;
  overflow: hidden;
  transition: transform 0.9s ease, background-color 0.3s ease;
  transform-origin: left;
}

.viwe-filtr__all-select:hover .viwe-filtr__line-bottom {
  transform: scaleX(1.1);
  background-color: black;
}

.reset-filters {
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  font-size: 1.2vw;
  cursor: pointer;
}

.reset-filters__line-bottom {
  width: 100%;
  height: 2px;
  background-color: black;
  pointer-events: none;
  overflow: hidden;
  transition: transform 0.9s ease, background-color 0.3s ease;
  transform-origin: left;
}

.reset-filters:hover .reset-filters__line-bottom {
  transform: scaleX(1.2);
  background-color: black;
}

.viwe-display__all-item {
  width: 32vw;
}

.creature-grid {
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  max-height: 15vw;
  scrollbar-color: #790202 #ccc;
}

.creature-card {
  width: 32vw;
  cursor: pointer;
  position: relative;
  padding: 0.5vw 0;
}

.creature-card__cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25vw;
}

.card-actions__button {
  background-color: transparent;
  font-size: 1.5vw;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.card-actions__button:hover {
  transform: scale(1.1);
  color: #790202;
}

.text-cart {
  font-size: 1.35vw;
  transition: all 0.3s ease-in-out;
}

.creature-card:hover .text-cart {
  color: rgb(109, 9, 9);
  transform: translateY(-4px) scale(1.01);
}

.card-header {
  font-size: 1.5vw;
  transition: all 0.3s ease-in-out;
}

.creature-card:hover .card-header {
  color: rgb(109, 9, 9);
  transform: scale(1.01);
}

.creature-card__line-item {
  height: 0.09vw;
  width: 30vw;
  background-color: black;
  pointer-events: none;
  overflow: hidden;
  transition: transform 0.9s ease, background-color 0.3s ease;
}

.creature-card:hover .creature-card__line-item {
  transform: scaleX(1.1);
  background-color: black;
}

.empty-state {
  text-align: center;
  color: #777;
  font-size: 1.4vw;
  margin-top: 2vw;
}
</style>
