import { ref, computed } from 'vue'
import axios from '@/plugins/axios'

export function useBestiary() {
  const creatures = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Загрузка списка с сервера
  const fetchCreatures = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get('/creatures')
      creatures.value = response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Ошибка загрузки'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Создание
  const createCreature = async (creatureData) => {
    try {
      const response = await axios.post('/creatures', creatureData)
      creatures.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Ошибка создания'
      throw err
    }
  }

  // Обновление
  const updateCreature = async (id, creatureData) => {
    try {
      const response = await axios.put(`/creatures/${id}`, creatureData)
      const index = creatures.value.findIndex(c => c.id === id)
      if (index !== -1) creatures.value[index] = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Ошибка обновления'
      throw err
    }
  }

  // Удаление
  const deleteCreature = async (id) => {
    try {
      await axios.delete(`/creatures/${id}`)
      creatures.value = creatures.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err.response?.data?.detail || 'Ошибка удаления'
      throw err
    }
  }

  // Дублирование
  const duplicateCreature = async (id) => {
    const original = creatures.value.find(c => c.id === id)
    if (original) {
      const copy = { ...original }
      delete copy.id
      delete copy.user_id
      delete copy.created_at
      delete copy.updated_at
      copy.name = `${original.name} (копия)`
      await createCreature(copy)
    }
  }

  // Сохранение (создание или обновление)
  const saveCreature = async (creatureData, editingId = null) => {
    if (editingId) {
      return await updateCreature(editingId, creatureData)
    } else {
      return await createCreature(creatureData)
    }
  }

  // Фильтры (работают с creatures.value)
  const searchQuery = ref('')
  const filterType = ref('all')
  const filterCr = ref('all')
  const filterHabitat = ref('all')

  const filteredCreatures = computed(() => {
    let result = creatures.value
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
    filterHabitat.value = 'all'
  }

  return {
    creatures,
    loading,
    error,
    fetchCreatures,
    createCreature,
    updateCreature,
    deleteCreature,
    duplicateCreature,
    saveCreature,
    searchQuery,
    filterType,
    filterCr,
    filterHabitat,
    filteredCreatures,
    resetFilters,
  }
}