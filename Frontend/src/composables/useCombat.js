import { ref, computed } from 'vue'

export function useCombat() {
  const combatants = ref([])
  const currentTurnIndex = ref(0)

  const sortedCombatants = computed(() => {
    return [...combatants.value].sort((a, b) => (b.initiative || 0) - (a.initiative || 0))
  })

  const addCombatant = (creature) => {
    const newCombatant = {
      id: 'combat-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      name: creature.name,
      ac: creature.ac,
      hp: creature.hp,
      maxHp: creature.hp,
      initiative: null,
      unconscious: false,
      type: creature.type,
      speed: creature.speed,
      stats: { ...creature.stats },
      actions: creature.actions,
      description: creature.description,
      img: creature.img,
      cr: creature.cr
    }
    combatants.value.push(newCombatant)
  }

  const removeCombatant = (id) => {
    combatants.value = combatants.value.filter(c => c.id !== id)
    if (currentTurnIndex.value >= combatants.value.length) {
      currentTurnIndex.value = Math.max(0, combatants.value.length - 1)
    }
  }

  const adjustHp = (id, delta) => {
    const combatant = combatants.value.find(c => c.id === id)
    if (combatant) {
      combatant.hp = Math.min(combatant.maxHp, Math.max(0, combatant.hp + delta))
      if (combatant.hp <= 0) combatant.unconscious = true
      else combatant.unconscious = false
    }
  }

  const updateCombatant = () => {
    // реактивность уже работает
  }

  const rollAllInitiative = () => {
    combatants.value.forEach(c => {
      let dexMod = 0
      if (c.stats && c.stats.dex) {
        dexMod = Math.floor((c.stats.dex - 10) / 2)
      }
      c.initiative = Math.floor(Math.random() * 20) + 1 + dexMod
    })
    currentTurnIndex.value = 0
  }

  const nextTurn = () => {
    if (combatants.value.length === 0) return
    currentTurnIndex.value = (currentTurnIndex.value + 1) % combatants.value.length
  }

  const prevTurn = () => {
    if (combatants.value.length === 0) return
    currentTurnIndex.value = (currentTurnIndex.value - 1 + combatants.value.length) % combatants.value.length
  }

  return {
    combatants,
    currentTurnIndex,
    sortedCombatants,
    addCombatant,
    removeCombatant,
    adjustHp,
    updateCombatant,
    rollAllInitiative,
    nextTurn,
    prevTurn
  }
}