import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Map from '../Map.vue'

describe('Map', () => {
  it('renders properly', () => {
    const wrapper = mount(Map, { props: { title: 'Test if app renders' } })
    expect(wrapper.text()).toContain('Test if app renders')
  })
})
