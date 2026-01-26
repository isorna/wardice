import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ScenarioMap from './ScenarioMap.vue'

describe('ScenarioMap.vue', () => {
  it('renders deployment zones correctly', () => {
    const wrapper = mount(ScenarioMap, {
      props: {
        p1Deploy: 6,
        p2Deploy: 11
      }
    })

    // Scale is 12.5. 6 * 12.5 = 75. 11 * 12.5 = 137.5.
    const p1Zone = wrapper.find('.bg-player1')
    expect(p1Zone.exists()).toBe(true)
    expect(p1Zone.attributes('height')).toBe('75')

    const p2Zone = wrapper.find('.bg-player2')
    expect(p2Zone.exists()).toBe(true)
    // p2 y = 600 - 137.5 = 462.5
    expect(p2Zone.attributes('height')).toBe('137.5')
    expect(p2Zone.attributes('y')).toBe('462.5')
  })

  it('renders objectives correctly', () => {
    const objectives = [
      { type: 'flag', owner: 'p1', x: 18, xFrom: 'left', y: 16, yFrom: 'top' }
    ]
    const wrapper = mount(ScenarioMap, {
      props: {
        objectives
      }
    })

    const circles = wrapper.findAll('circle')
    // Flag radius (visual) = 30mm diameter -> ~15 units radius?
    // Logic: r = (30 / 25.4) * 12.5 = 14.7637...
    // x = 18 * 12.5 = 225.
    // cx = 225 + 14.76... = 239.76...
    // cy = 16 * 12.5 = 200.
    // cy = 200 + 14.76... = 214.76...

    expect(circles.length).toBe(1)
    const circle = circles[0]
    expect(circle.classes()).toContain('flag-cache')

    const cx = parseFloat(circle.attributes('cx'))
    const cy = parseFloat(circle.attributes('cy'))

    expect(Math.abs(cx - 239.76)).toBeLessThan(0.1)
    expect(Math.abs(cy - 214.76)).toBeLessThan(0.1)

    // Check lines
    // Should have:
    // 1 center line
    // 2 deployment lines
    // 2 objective lines
    const lines = wrapper.findAll('line')
    expect(lines.length).toBeGreaterThanOrEqual(5)

    const objLines = wrapper.findAll('.line-p1')
    expect(objLines.length).toBe(2)
  })
})
