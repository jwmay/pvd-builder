import { Draggable } from './draggable'

export class AtomSmall extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: '#b5df63', drag: '#9bd42d', over: '#c3e582' }
    super(p, x, y, 30, 30, colors, label)
  }
}
