// @todo: add checkbox for sea of electrons
// @todo: SOE changes background to gray?
// @todo: add a resizable box?
// @todo: add label for number of electrons in the sea

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
  let sliders = { small: {}, medium: {}, large: {} }
  let atoms = { small: [], medium: [], large: [] }
  const max = { small: 16, medium: 10, large: 8 }

  const inputSize = 60
  const inputMargin = 15

  const sliderSize = 80
  const sliderPosn = {
    bottom: 375,
    gap: 120,
    margin: 10,
    start: 10,
    textBottom: 379,
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

    // atoms
    atoms.small = getAtoms(p, 'small', inputs.small.value())
    atoms.medium = getAtoms(p, 'medium', inputs.small.value())
    atoms.large = getAtoms(p, 'large', inputs.large.value())
  }

  p.draw = function () {
    // white background
    p.background(255)

    // sliders
    const atomQty = {
      small: sliders.small.value(),
      medium: sliders.medium.value(),
      large: sliders.large.value(),
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
      small: { gap: 35, left: 20, top: 20 },
      medium: { gap: 55, left: 30, top: 65 },
      large: { gap: 75, left: 40, top: 130 },
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
})
