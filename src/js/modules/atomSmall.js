import { Draggable } from './draggable'

export class AtomSmall extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: 'green', drag: 'darkred', over: 'crimson' }
    super(p, x, y, 30, 30, colors, label)
  }
}
