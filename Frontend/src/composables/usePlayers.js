import { ref } from 'vue'

export function usePlayers(creaturesRef) {
  const loadPlayersFromFile = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result)
        const players = Array.isArray(json) ? json : [json]
        players.forEach((p, index) => {
          const newCreature = {
            id: 'player-' + Date.now() + '-' + index,
            name: p.name || 'Безымянный',
            type: 'player', // в бестиарии они будут отображаться как NPC
            ac: p.ac || 10,
            hp: p.hp || 10,
            maxHp: p.hp || 10,
            speed: p.speed || '30 фт',
            stats: p.stats || { str:10, dex:10, con:10, int:10, wis:10, cha:10 },
            actions: p.actions || '',
            description: p.description || '',
            img: p.img || '',
            cr: p.cr || null,
            rawData: p
          }
          creaturesRef.value.push(newCreature)
        })
        // Сохраняем в localStorage (если нужно)
        localStorage.setItem('creatures', JSON.stringify(creaturesRef.value))
      } catch (error) {
        console.error('Ошибка парсинга JSON', error)
        alert('Неверный формат файла')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return {
    loadPlayersFromFile
  }
}