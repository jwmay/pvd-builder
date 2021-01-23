import { Draggable } from './draggable'

export class AtomSmall extends Draggable {
  constructor(p, x, y, label) {
    const colors = { main: '#de781f', drag: '#b16018', over: '#e5924a' }
    super(p, x, y, 30, 30, colors, label)
  }
}
