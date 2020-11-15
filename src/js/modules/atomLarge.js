import { Draggable } from './draggable'

export class AtomLarge extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: '#63b5df', drag: '#2d9bd4', over: '#82c3e5' }
    super(p, x, y, 70, 70, colors, label)
  }
}
