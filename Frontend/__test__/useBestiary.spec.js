import { useBestiary } from '@/composables/useBestiary'
import { describe, it, expect } from 'vitest'

describe('useBestiary', () => {
it('фильтрует существ по поисковому запросу', () => {
    const { creatures, searchQuery, filteredCreatures } = useBestiary()
    creatures.value = [
    { name: 'Гоблин', type: 'monster', cr: '1/4' },
    { name: 'Волк', type: 'monster', cr: '1/4' }
    ]
    searchQuery.value = 'гоб'
    expect(filteredCreatures.value).toHaveLength(1)
    expect(filteredCreatures.value[0].name).toBe('Гоблин')
})

it('фильтрует по типу', () => {
    const { creatures, filterType, filteredCreatures } = useBestiary()
    creatures.value = [
    { name: 'Гоблин', type: 'monster' },
    { name: 'Трактирщица', type: 'npc' }
    ]
    filterType.value = 'npc'
    expect(filteredCreatures.value).toHaveLength(1)
    expect(filteredCreatures.value[0].name).toBe('Трактирщица')
})

it('фильтрует по CR', () => {
    const { creatures, filterCr, filteredCreatures } = useBestiary()
    creatures.value = [
    { name: 'Гоблин', cr: '1/4' },
    { name: 'Волк', cr: '1/4' },
    { name: 'Дракон', cr: '10' }
    ]
    filterCr.value = '1/4'
    expect(filteredCreatures.value).toHaveLength(2)
})
})