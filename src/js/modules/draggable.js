/**
 * Click and drag an object
 *
 * Author: Daniel Shiffman <http://www.shiffman.net>
 * Source: https://editor.p5js.org/icm/sketches/BkRHbimhm
 */
export class Draggable {
  constructor(p, x, y, w, h, fill, label) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h || w

    this.fill = fill || { main: [175, 200], drag: 50, over: 100 }
    this.label = label || null

    this.p = p

    this.dragging = false // Is the object being dragged?
    this.rollover = false // Is the mouse over the ellipse?

    this.offsetX = 0
    this.offsetY = 0
  }

  create() {
    this._over()
    this._update()
    this._show()
  }

  pressed() {
    // Did I click on the object?
    if (this._isOver()) {
      this.dragging = true
      // If so, keep track of relative location of click to corner of object
      this.offsetX = this.x - this.p.mouseX
      this.offsetY = this.y - this.p.mouseY
    }
  }

  released() {
    // Quit dragging
    this.dragging = false
  }

  _over() {
    // Is mouse over object
    if (this._isOver()) {
      this.rollover = true
    } else {
      this.rollover = false
    }
  }

  _update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = this.p.mouseX + this.offsetX
      this.y = this.p.mouseY + this.offsetY
    }
  }

  _show() {
    this.p.noStroke()

    // Different fill based on state
    if (this.dragging) {
      this.p.fill(this.fill.drag)
    } else if (this.rollover) {
      this.p.fill(this.fill.over)
    } else {
      this.p.fill(this.fill.main)
    }
    this.p.ellipse(this.x, this.y, this.w, this.h)

    this.label &&
      this.p
        .fill(255)
        .textAlign(this.p.CENTER, this.p.CENTER)
        .textSize(16)
        .text(this.label, this.x, this.y)
  }

  _isOver() {
    const radX = this.w / 2
    const radY = this.h / 2
    return (
      this.p.mouseX > this.x - radX &&
      this.p.mouseX < this.x + radX &&
      this.p.mouseY > this.y - radY &&
      this.p.mouseY < this.y + radY
    )
  }
}
