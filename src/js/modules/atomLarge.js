import { Draggable } from './draggable'

export class AtomLarge extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: 'orange', drag: 'darkred', over: 'crimson' }
    super(p, x, y, 70, 70, colors, label)
  }
}
