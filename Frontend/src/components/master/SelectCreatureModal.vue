<template>
  <transition name="modal-fade">
    <div v-if="creatures.length" class="modal-overlay combat-select-modal" @click.self="$emit('close')">
      <div class="modal-content modal-lg">
        <h2>Выберите существо для добавления</h2>

        <!-- Вкладки -->
        <div class="tabs">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'all' }"
            @click="activeTab = 'all'"
          >Все</button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'monster' }"
            @click="activeTab = 'monster'"
          >Монстры</button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'npc' }"
            @click="activeTab = 'npc'"
          >NPC</button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'player' }"
            @click="activeTab = 'player'"
          >Игроки</button>
        </div>

        <!-- Поиск и фильтр CR -->
        <div class="modal-filters">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Поиск по имени..."
            class="modal-search"
          />
          <select v-model="filterCr" class="filter-select">
            <option value="all">Любой CR</option>
            <option value="0">CR 0</option>
            <option value="1/8">CR 1/8</option>
            <option value="1/4">CR 1/4</option>
            <option value="1/2">CR 1/2</option>
            <option v-for="n in 30" :key="n" :value="n">CR {{ n }}</option>
          </select>
        </div>

        <div class="creature-select-list">
          <div
            v-for="creature in filteredCreatures"
            :key="creature.id"
            class="creature-select-item"
            @click="$emit('select', creature)"
          >
            <span class="creature-name">{{ creature.name }}</span>
            <span class="creature-type">
              {{ creature.type === 'monster' ? 'Монстр' : creature.type === 'player' ? 'Игрок' : 'NPC' }}
            </span>
            <span class="creature-cr" v-if="creature.cr">CR {{ creature.cr }}</span>
          </div>
        </div>
        <div class="modal-actions">
          <button class="modal-actions__close-but" @click="$emit('close')">
            <span class="button-line-top"></span>
            <span class="button-line-bottom"></span>
            Отмена
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  creatures: { type: Array, required: true }
})

const emit = defineEmits(['select', 'close'])

const activeTab = ref('all')
const searchQuery = ref('')
const filterCr = ref('all')

const filteredCreatures = computed(() => {
  let result = props.creatures
  if (activeTab.value !== 'all') {
    result = result.filter(c => c.type === activeTab.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => c.name.toLowerCase().includes(q))
  }
  if (filterCr.value !== 'all') {
    result = result.filter(c => c.cr == filterCr.value)
  }
  return result
})
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 1vw;
  margin-bottom: 1vw;
  border-bottom: 1px solid #ccc;
}
.tab-btn {
  background: transparent;
  border: none;
  padding: 0.5vw 1vw;
  font-size: 1.2vw;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  position: relative;
}
.tab-btn.active {
  color: #790202;
}
.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #790202;
}
.modal-filters {
  display: flex;
  gap: 1vw;
  margin-bottom: 1vw;
}
.modal-search {
  background: transparent;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.2vw;
  flex: 1;
  outline: none;
}
.filter-select {
  background: transparent;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.2vw;
  outline: none;
}
.creature-select-list {
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  max-height: 60vh;
  overflow-y: auto;
  margin: 1vw 0;
  overflow-x: clip;
}
.creature-select-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5vw 1vw;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.2vw;
  position: relative;
  border-bottom: none;
}
.creature-select-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: black;
  transform: scaleX(1);
  transition: transform 0.3s ease;
  transform-origin: left;
}
.creature-select-item:hover {
  background: #f5f5f5;
  color: #790202;
}
.creature-select-item:hover::after {
  transform: scaleX(1.1);
  background-color: black;
}
.creature-select-item .creature-name {
  font-weight: bold;
  color: inherit;
}
.creature-select-item .creature-type {
  color: #555;
}
.creature-select-item .creature-cr {
  color: #790202;
}
.modal-actions {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1vw;
}
.modal-actions__close-but {
  background-color: transparent;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 24px;
  font-size: 18px;
  color: #2c2c2c;
  border: none;
  transition: transform 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}
.modal-actions__close-but::before,
.modal-actions__close-but::after {
  content: "";
  width: 50px;
  height: 50px;
  background-image: url('@/views/style/img/button-img.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}
.modal-actions__close-but::before {
  margin-right: 10px;
}
.modal-actions__close-but::after {
  margin-left: 10px;
}
.button-line-top,
.button-line-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  transition: transform 0.8s ease, background-color 0.3s ease;
  transform-origin: center;
}
.button-line-top {
  top: 0;
}
.button-line-bottom {
  bottom: 0;
}
.modal-actions__close-but:hover {
  transform: scale(1.1);
}
.modal-actions__close-but:hover .button-line-top,
.modal-actions__close-but:hover .button-line-bottom {
  transform: scaleX(0.2);
  background-color: black;
}
</style>