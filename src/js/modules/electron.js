import { Draggable } from './draggable'

export class Electron extends Draggable {
  constructor(p, x, y) {
    const colors = { main: 'red', drag: 'darkred', over: 'crimson' }
    super(p, x, y, 20, 20, colors, 'e⁻')
  }
}
