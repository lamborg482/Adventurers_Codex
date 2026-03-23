import { ref } from 'vue'

export function useDatasets() {
  const datasetCreatures = ref([])

  // Используем import.meta.glob для загрузки всех JSON из папки assets/datasets
  const datasetModules = import.meta.glob('@/assets/datasets/*.json')

  const loadAllDatasets = async () => {
    if (datasetCreatures.value.length > 0) return
    try {
      const loadPromises = Object.values(datasetModules).map(loader => loader())
      const modules = await Promise.all(loadPromises)
      const creatures = modules.map(m => transformCreature(m.default))
      datasetCreatures.value = creatures
    } catch (error) {
      console.error('Ошибка загрузки наборов данных:', error)
      // Тестовые данные при ошибке
      datasetCreatures.value = [{
        id: 'fallback-1',
        name: 'Тестовый монстр',
        type: 'monster',
        cr: '1',
        ac: 12,
        hp: 20,
        speed: '30 фт',
        stats: { str: 14, dex: 12, con: 14, int: 8, wis: 10, cha: 8 },
        actions: 'Коготь: +4, 1к6+2',
        description: 'Заглушка для отладки'
      }]
    }
  }

  function transformCreature(raw) {
    const { name, img, items, system } = raw
    const stats = {}
    if (system?.abilities) {
      for (const [key, value] of Object.entries(system.abilities)) {
        stats[key] = value.value
      }
    }
    let ac = system?.attributes?.ac?.flat || 10
    const hp = system?.attributes?.hp?.value || 0
    let speed = system?.attributes?.movement?.walk || 0
    speed = speed + ' фт'
    let cr = system?.details?.cr || 0
    cr = formatCR(cr)
    let actionsText = items?.map(item => item.name).join(', ') || ''
    const description = system?.details?.biography?.value || ''
    return {
      id: raw._id || Date.now().toString() + '-dataset',
      name: name || 'Без имени',
      type: system?.details?.type?.value === 'beast' ? 'monster' : 'npc',
      img: img || '',
      ac,
      hp,
      speed,
      cr,
      stats,
      actions: actionsText,
      description,
      rawData: raw
    }
  }

  function formatCR(cr) {
    if (cr === 0.125) return '1/8'
    if (cr === 0.25) return '1/4'
    if (cr === 0.5) return '1/2'
    return String(cr)
  }

  return {
    datasetCreatures,
    loadAllDatasets
  }
}