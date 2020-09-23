export class Nucleus {
  constructor(p, parentId) {
    this.p = p
    this.parentId = parentId
    this.inputSize = 24
  }

  draw(protonQty, neutronQty) {
    // background circle
    this.p.fill(220).noStroke().ellipse(200, 200, 100)

    // proton and neutron labels
    this.p
      .fill(140)
      .textStyle(this.p.ITALIC)
      .textAlign(this.p.CENTER, this.p.CENTER)
      .textSize(22)
      .text(`${protonQty} p⁺`, 200, 185)
      .text(`${neutronQty} n⁰`, 200, 215)
  }
}
