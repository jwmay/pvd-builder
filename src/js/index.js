import p5 from 'p5'
import { copyImage } from './modules/actions'
import { Alert } from './modules/alert'
import { Help } from './modules/help'
import { AtomSmall } from './modules/atomSmall'
import { AtomMedium } from './modules/atomMedium'
import { AtomLarge } from './modules/atomLarge'

// Control dispaly of help information
const help = new Help()
help.listen()

// Control display of slider labels when copying
let showSliderText = true
document.addEventListener('copied', () => (showSliderText = true))

// Control display of slider for setting sea of electrons
let hasSOE = false

// Handle alert
const alert = new Alert()
alert.listen()

// Handle clicks of the 'Copy' button
document
  .getElementById('copyImageButton')
  .addEventListener('click', function () {
    showSliderText = false
    setTimeout(() => copyImage(), 100)
  })

// Create the canvas
new p5((p) => {
  let inputs = { small: {}, medium: {}, large: {} }
  let sliders = { small: {}, medium: {}, large: {}, soe: {} }
  let seoCheckbox = {}
  let atoms = { small: [], medium: [], large: [] }
  const max = { small: 16, medium: 10, large: 8, soe: 30 }

  const inputSize = 60
  const inputMargin = 15

  const sliderSize = 80
  const sliderPosn = {
    bottom: 375,
    gap: 120,
    margin: 10,
    start: 10,
    textBottom: 379,
    textTop: 8,
    top: 6,
  }

  p.setup = function () {
    const parentId = 'canvas'
    const cv = p.createCanvas(605, 400).parent(parentId)

    // sliders
    sliders.small = p
      .createSlider(0, max.small, 0)
      .parent(parentId)
      .position(sliderPosn.start, sliderPosn.bottom)
      .size(sliderSize)
    sliders.medium = p
      .createSlider(0, max.medium, 0)
      .parent(parentId)
      .position(
        sliders.small.x + sliders.small.width + sliderPosn.gap - 10,
        sliderPosn.bottom
      )
      .size(sliderSize)
    sliders.large = p
      .createSlider(0, max.large, 0)
      .parent(parentId)
      .position(
        sliders.medium.x + sliders.medium.width + sliderPosn.gap + 10,
        sliderPosn.bottom
      )
      .size(sliderSize)
    sliders.soe = p
      .createSlider(0, max.soe, 0)
      .parent(parentId)
      .position(160, sliderPosn.top)
      .size(sliderSize)
      .hide()

    // handle input changes
    const onInput = {
      small: function () {
        atoms.small = getAtoms(p, 'small', inputs.small.value())
      },
      medium: function () {
        atoms.medium = getAtoms(p, 'medium', inputs.medium.value())
      },
      large: function () {
        atoms.large = getAtoms(p, 'large', inputs.large.value())
      },
    }

    // inputs
    inputs.small = p
      .createInput()
      .parent(parentId)
      .position(
        sliders.small.x + sliders.small.width + inputMargin,
        sliders.small.y - sliders.small.height - inputMargin
      )
      .size(inputSize)
      .input(onInput.small)
    inputs.medium = p
      .createInput()
      .parent(parentId)
      .position(
        sliders.medium.x + sliders.medium.width + inputMargin,
        sliders.medium.y - sliders.medium.height - inputMargin
      )
      .size(inputSize)
      .input(onInput.medium)
    inputs.large = p
      .createInput()
      .parent(parentId)
      .position(
        sliders.large.x + sliders.large.width + inputMargin,
        sliders.large.y - sliders.large.height - inputMargin
      )
      .size(inputSize)
      .input(onInput.large)

    // sea of electrons
    seoCheckbox = p
      .createCheckbox('sea of electrons', false)
      .parent(parentId)
      .position(sliderPosn.start, sliderPosn.top)
      .changed(setSOE)

    // atoms
    atoms.small = getAtoms(p, 'small', inputs.small.value())
    atoms.medium = getAtoms(p, 'medium', inputs.small.value())
    atoms.large = getAtoms(p, 'large', inputs.large.value())
  }

  p.draw = function () {
    // background color dependent on sea of electrons
    let backgroundColor = hasSOE ? 200 : 255
    p.background(backgroundColor)

    // sliders
    let atomQty = {
      small: sliders.small.value(),
      medium: sliders.medium.value(),
      large: sliders.large.value(),
      soe: sliders.soe.value(),
    }
    showSliderText &&
      p
        .fill(120)
        .noStroke()
        .textAlign(p.LEFT, p.TOP)
        .textSize(14)
        .textStyle(p.NORMAL)
        .text(
          `${atomQty.small} small atom${atomQty.small !== 1 ? 's' : ''}`,
          sliders.small.x + sliders.small.width + sliderPosn.margin,
          sliderPosn.textBottom
        )
        .text(
          `${atomQty.medium} medium atom${atomQty.medium !== 1 ? 's' : ''}`,
          sliders.medium.x + sliders.medium.width + sliderPosn.margin,
          sliderPosn.textBottom
        )
        .text(
          `${atomQty.large} large atom${atomQty.large !== 1 ? 's' : ''}`,
          sliders.large.x + sliders.large.width + sliderPosn.margin,
          sliderPosn.textBottom
        )

    // show sea of electrons slider and text only if checkbox selected
    if (hasSOE) {
      sliders.soe.show()
      showSliderText &&
        p.text(
          `${atomQty.soe} electron${atomQty.soe !== 1 ? 's' : ''} in the sea`,
          sliders.soe.x + sliders.soe.width + sliderPosn.margin,
          sliderPosn.textTop
        )
      p.fill(255)
        .textAlign(p.LEFT, p.TOP)
        .textSize(80)
        .text(`${atomQty.soe} e-`, 400, 30)
    } else {
      sliders.soe.hide()
    }

    // atoms
    atoms.small.forEach((atom, index) => index < atomQty.small && atom.create())
    atoms.medium.forEach(
      (atom, index) => index < atomQty.medium && atom.create()
    )
    atoms.large.forEach((atom, index) => index < atomQty.large && atom.create())
  }

  p.mousePressed = function () {
    atoms.small.forEach((atom) => atom.pressed())
    atoms.medium.forEach((atom) => atom.pressed())
    atoms.large.forEach((atom) => atom.pressed())
  }

  p.mouseReleased = function () {
    atoms.small.forEach((atom) => atom.released())
    atoms.medium.forEach((atom) => atom.released())
    atoms.large.forEach((atom) => atom.released())
  }

  const getAtoms = function (p, size, label) {
    const posn = {
      small: { gap: 35, left: 20, top: 45 },
      medium: { gap: 55, left: 30, top: 90 },
      large: { gap: 75, left: 40, top: 155 },
    }
    const atoms = []

    for (let i = 0; i <= max[size]; i++) {
      atoms.push(
        getAtom(
          p,
          size,
          posn[size].left + posn[size].gap * i,
          posn[size].top,
          label
        )
      )
    }

    return atoms
  }

  const getAtom = function (p, size, x, y, label) {
    switch (size) {
      case 'small':
        return new AtomSmall(p, x, y, label)
      case 'medium':
        return new AtomMedium(p, x, y, label)
      case 'large':
        return new AtomLarge(p, x, y, label)
    }
  }

  const setSOE = function () {
    if (this.checked()) {
      hasSOE = true
    } else {
      hasSOE = false
    }
  }
})
