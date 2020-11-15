import { Draggable } from './draggable'

export class AtomMedium extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: '#df63b5', drag: '#d42d9b', over: '#e582c3' }
    super(p, x, y, 50, 50, colors, label)
  }
}
