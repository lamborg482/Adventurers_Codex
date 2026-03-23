import { ref, computed } from 'vue'

export function useModal() {
  const modalOpen = ref(false)
  const detailModalOpen = ref(false)
  const selectCreatureModalOpen = ref(false)
  const sideModalOpen = ref(false)

  const editingCreature = ref(null)
  const selectedCreature = ref(null)
  const sideSelectedCreature = ref(null)

  const isAnyModalOpen = computed(() => 
    modalOpen.value || detailModalOpen.value || selectCreatureModalOpen.value || sideModalOpen.value
  )

  const openCreateModal = () => {
    editingCreature.value = null
    modalOpen.value = true
  }

  const openEditModal = (creature) => {
    editingCreature.value = creature
    modalOpen.value = true
  }

  const openDetailModal = (creature) => {
    selectedCreature.value = creature
    detailModalOpen.value = true
  }

  const openSelectCreatureModal = () => {
    selectCreatureModalOpen.value = true
  }

  const openSideDetail = (creature) => {
    sideSelectedCreature.value = creature
    sideModalOpen.value = true
  }

  const closeModal = () => {
    modalOpen.value = false
    editingCreature.value = null
  }

  const closeDetailModal = () => {
    detailModalOpen.value = false
    selectedCreature.value = null
  }

  const closeSelectCreatureModal = () => {
    selectCreatureModalOpen.value = false
  }

  const closeSideModal = () => {
    sideModalOpen.value = false
    sideSelectedCreature.value = null
  }

  return {
    // состояния
    modalOpen,
    detailModalOpen,
    selectCreatureModalOpen,
    sideModalOpen,
    isAnyModalOpen,
    editingCreature,
    selectedCreature,
    sideSelectedCreature,
    // открытие
    openCreateModal,
    openEditModal,
    openDetailModal,
    openSelectCreatureModal,
    openSideDetail,
    // закрытие
    closeModal,
    closeDetailModal,
    closeSelectCreatureModal,
    closeSideModal
  }
}