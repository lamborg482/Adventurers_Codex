<template>
  <div class="book-master">
    <div class="book-master__all-items" :class="{ 'shift-left': isAnyModalOpen }">
      <!-- Левое меню -->
      <div class="book-master_menu-line">
        <div class="book-master__menu-all">
          <div class="menu-header">
            <h2>Мастер</h2>
          </div>
          <nav class="menu-nav">
            <div class="menu-nav__all-but">
              <button
                class="nav-btn"
                :class="{ active: currentTab === 'bestiary' }"
                @click="currentTab = 'bestiary'"
              >
                📖 Бестиарий
                <span class="nav-btn__line-bottom"></span>
              </button>
            </div>
            <div class="menu-nav__all-but">
              <button
                class="nav-btn"
                :class="{ active: currentTab === 'combat' }"
                @click="currentTab = 'combat'"
                :disabled="!combatEnabled"
              >
                ⚔️ Боевое окно
                <span class="nav-btn__line-bottom"></span>
              </button>
            </div>
            <div class="menu-nav__all-but">
              <button
                class="nav-btn"
                :class="{ active: currentTab === 'datasets' }"
                @click="currentTab = 'datasets'"
              >
                📦 Наборы данных
                <span class="nav-btn__line-bottom"></span>
              </button>
            </div>
          </nav>
          <router-link to="/" class="logout-btn menu-footer home-view__but-all home-view___button-master">
            <span class="button-line-bottom"></span>
            Выйти
          </router-link>
        </div>
        <div class="menu-line">
          <span class="menu-line_vertical"></span>
        </div>
      </div>

      <!-- Основная область просмотра с вкладками -->
      <div class="book-master__viwe-all">
        <BestiaryTab
          v-if="currentTab === 'bestiary'"
          :creatures="filteredCreatures"
          :loading="loading"
          :error="error"
          :search-query="searchQuery"
          :filter-type="filterType"
          :filter-cr="filterCr"
          :filter-habitat="filterHabitat"
          @update:search-query="searchQuery = $event"
          @update:filter-type="filterType = $event"
          @update:filter-cr="filterCr = $event"
          @update:filter-habitat="filterHabitat = $event"
          @reset-filters="resetFilters"
          @open-create="openCreateModal"
          @open-detail="openDetailModal"
          @edit="openEditModal"
          @duplicate="duplicateCreature"
          @delete="deleteCreature"
        />

        <CombatTab
          v-if="currentTab === 'combat'"
          :combatants="combatants"
          :current-turn-index="currentTurnIndex"
          :sorted-combatants="sortedCombatants"
          :roll-all-initiative="rollAllInitiative"
          :next-turn="nextTurn"
          :prev-turn="prevTurn"
          :remove-combatant="removeCombatant"
          :adjust-hp="adjustHp"
          :update-combatant="updateCombatant"
          :load-players-from-file="loadPlayersFromFile"
          @open-select="openSelectCreatureModal"
          @open-detail="openCombatantDetail"
        />

        <DatasetsTab
          v-if="currentTab === 'datasets'"
          :dataset-creatures="datasetCreatures"
          @open-detail="openSideDetail"
          @add-to-bestiary="addFromDatasetToBestiary"
        />
      </div>

      <div class="menu-line">
        <span class="menu-line_vertical"></span>
      </div>
    </div>

    <!-- Модальные окна -->
    <CreatureFormModal
      v-if="modalOpen"
      :editing-creature="editingCreature"
      @close="closeModal"
      @save="saveCreatureHandler"
    />

    <CreatureDetailModal
      v-if="detailModalOpen"
      :creature="selectedCreature"
      @close="closeDetailModal"
    />

    <SelectCreatureModal
      v-if="selectCreatureModalOpen"
      :creatures="allAvailableCreatures"
      @select="addCombatant"
      @close="closeSelectCreatureModal"
    />

    <SideDetailModal
      v-if="sideModalOpen"
      :creature="sideSelectedCreature"
      @close="closeSideModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Импорт composables
import { useBestiary } from '@/composables/useBestiary'
import { useDatasets } from '@/composables/useDatasets'
import { useCombat } from '@/composables/useCombat'
import { usePlayers } from '@/composables/usePlayers'
import { useModal } from '@/composables/useModal'

// Импорт компонентов
import BestiaryTab from '@/components/master/BestiaryTab.vue'
import CombatTab from '@/components/master/CombatTab.vue'
import DatasetsTab from '@/components/master/DatasetsTab.vue'
import CreatureFormModal from '@/components/master/CreatureFormModal.vue'
import CreatureDetailModal from '@/components/master/CreatureDetailModal.vue'
import SelectCreatureModal from '@/components/master/SelectCreatureModal.vue'
import SideDetailModal from '@/components/master/SideDetailModal.vue'

// Навигация
const currentTab = ref('bestiary')
const combatEnabled = ref(true)
const router = useRouter()

// Бестиарий (получаем все нужные переменные и методы)
const {
  creatures,
  loading,
  error,
  searchQuery,
  filterType,
  filterCr,
  filterHabitat,
  filteredCreatures,
  resetFilters,
  fetchCreatures,
  createCreature,
  updateCreature,
  deleteCreature,
  duplicateCreature,
  saveCreature: saveCreatureToApi
} = useBestiary()

// Наборы данных
const { datasetCreatures, loadAllDatasets } = useDatasets()

// Добавление существа из наборов данных в бестиарий
const addFromDatasetToBestiary = async (datasetCreature) => {
  try {
    // Убираем лишние поля (id, rawData, created_at, updated_at)
    const { id, rawData, created_at, updated_at, ...creatureData } = datasetCreature
    await createCreature(creatureData)
    alert('Существо добавлено в ваш бестиарий')
  } catch (err) {
    console.error('Ошибка добавления', err)
    alert('Не удалось добавить существо')
  }
}

// Бой
const {
  combatants,
  currentTurnIndex,
  sortedCombatants,
  addCombatant: addToCombat,
  removeCombatant,
  adjustHp,
  updateCombatant,
  rollAllInitiative,
  nextTurn,
  prevTurn
} = useCombat()

// Игроки (загрузка из JSON) – передаём функцию создания существа
const { loadPlayersFromFile } = usePlayers(creatures, createCreature)

// Модальные окна
const {
  modalOpen,
  detailModalOpen,
  selectCreatureModalOpen,
  sideModalOpen,
  isAnyModalOpen,
  editingCreature,
  selectedCreature,
  sideSelectedCreature,
  openCreateModal,
  openEditModal,
  openDetailModal,
  openSelectCreatureModal,
  openSideDetail,
  closeModal,
  closeDetailModal,
  closeSelectCreatureModal,
  closeSideModal
} = useModal()

// Все доступные существа для выбора в бою
const allAvailableCreatures = computed(() => [...creatures.value, ...datasetCreatures.value])

// Добавить участника боя (из модалки)
const addCombatant = (creature) => {
  addToCombat(creature)
  closeSelectCreatureModal()
}

// Сохранить существо из формы (вызывается из CreatureFormModal)
const saveCreatureHandler = async (creatureData) => {
  try {
    if (editingCreature.value) {
      // Редактирование существующего
      await updateCreature(editingCreature.value.id, creatureData)
    } else {
      // Создание нового
      await createCreature(creatureData)
    }
    closeModal()
  } catch (err) {
    console.error('Ошибка сохранения существа', err)
    alert('Не удалось сохранить существо')
  }
}

// Открыть детали участника боя (в боковой модалке)
const openCombatantDetail = (combatant) => {
  sideSelectedCreature.value = combatant
  sideModalOpen.value = true
}

// При монтировании загружаем существ пользователя и наборы данных
onMounted(async () => {
  await fetchCreatures()
  await loadAllDatasets()
})
</script>

<style scoped>
@import "@/views/style/global_style.css";

.book-master {
  display: flex;
  justify-content: center;
  margin-bottom: 1vw;
  align-items: center;
}

.book-master__all-items {
  display: flex;
  width: 56vw;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.4s ease, opacity 0.4s ease;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: flat;
  isolation: isolate;
}

.book-master__all-items.shift-left {
  transform: translateX(-2%);
  opacity: 0.6;
  pointer-events: none;
}

.book-master__menu-all {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 28vw;
}

.menu-header {
  font-size: 1.6vw;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 16vw;
}

.menu-nav__all-but {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 2.3vw;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 2.1vw;
  color: black;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 1.4vw;
  transition: transform 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.nav-btn.active {
  color: #790202;
}

.nav-btn.active:hover {
  color: #a00202;
}

.nav-btn:hover {
  transform: scale(1.1) translateY(-2px);
}

.nav-btn__line-bottom {
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  transition: transform 0.9s ease, background-color 0.3s ease;
  transform-origin: center;
}

.book-master__viwe-all {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30vw;
  height: 26vw;
  justify-content: flex-start;
}

.menu-line_vertical {
  height: 2vw;
  position: absolute;
}

.menu-line {
  height: 30vw;
  width: 0.09vw;
  background-color: rgba(0, 0, 0, 1);
  pointer-events: none;
  cursor: pointer;
}

.menu-line:hover {
  color: rgb(109, 9, 9);
  transform: translateY(-4px) scale(1.01);
}

.book-master_menu-line {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  width: 20vw;
  height: 32vw;
  align-items: flex-start;
}

.nav-btn:hover .nav-btn__line-bottom {
  transform: scaleX(0.3);
  background-color: black;
}

.nav-btn.active .nav-btn__line-bottom {
  transform: scaleX(1);
  background-color: black;
}

.nav-btn.active:hover .nav-btn__line-bottom {
  transform: scaleX(0.3);
  background-color: black;
}
</style>