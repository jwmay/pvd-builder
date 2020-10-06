import { Draggable } from './draggable'

export class AtomMedium extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: 'blue', drag: 'darkred', over: 'crimson' }
    super(p, x, y, 50, 50, colors, label)
  }
}
