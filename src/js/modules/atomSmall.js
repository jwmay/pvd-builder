import { Draggable } from './draggable'

export class AtomSmall extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: '#9bd42d', drag: '#749f20', over: '#b3de61' }
    super(p, x, y, 30, 30, colors, label)
  }
}
