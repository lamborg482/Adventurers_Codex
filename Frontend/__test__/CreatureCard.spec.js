import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CreatureCard from '@/components/master/CreatureCard.vue'

describe('CreatureCard.vue', () => {
  const mockCreature = {
    id: '1',
    name: 'Гоблин',
    type: 'monster',
    cr: '1/4',
    ac: 15,
    hp: 7
  }

  it('отображает имя существа', () => {
    const wrapper = mount(CreatureCard, {
      props: { creature: mockCreature }
    })
    expect(wrapper.text()).toContain('Гоблин')
  })

  it('отображает тип и CR', () => {
    const wrapper = mount(CreatureCard, {
      props: { creature: mockCreature }
    })
    expect(wrapper.text()).toContain('Монстр')
    expect(wrapper.text()).toContain('CR 1/4')
  })

  it('отображает AC и HP', () => {
    const wrapper = mount(CreatureCard, {
      props: { creature: mockCreature }
    })
    expect(wrapper.text()).toContain('AC 15')
    expect(wrapper.text()).toContain('HP 7')
  })
})