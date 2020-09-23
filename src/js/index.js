import p5 from 'p5'
import { copyImage } from './modules/actions'
import { Alert } from './modules/alert'
import { Help } from './modules/help'
import { Nucleus } from './modules/nucleus'
import { Electron } from './modules/electron'

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
  let shellSlider, electronSlider, protonSlider, neutronSlider
  let nucleus
  let electrons = []

  const sliderSize = { large: 110, small: 110 } // small was 80
  const sliderPosn = {
    bottom: 375,
    gap: 80,
    margin: 10,
    start: 10,
    textBottom: 379,
    textTop: 9,
    top: 5,
  }

  p.setup = function () {
    const parentId = 'canvas'
    const cv = p.createCanvas(400, 400).parent(parentId)

    // sliders
    shellSlider = p
      .createSlider(0, 4, 0)
      .position(sliderPosn.start, sliderPosn.top)
      .size(sliderSize.small)
      .parent(parentId)
    electronSlider = p
      .createSlider(0, 30, 0)
      .parent(parentId)
      .position(
        shellSlider.x + shellSlider.width + sliderPosn.gap,
        sliderPosn.top
      )
      .size(sliderSize.large)
    protonSlider = p
      .createSlider(0, 30, 0)
      .parent(parentId)
      .position(sliderPosn.start, sliderPosn.bottom)
      .size(sliderSize.large)
    neutronSlider = p
      .createSlider(0, 30, 0)
      .parent(parentId)
      .position(
        protonSlider.x + protonSlider.width + sliderPosn.gap,
        sliderPosn.bottom
      )
      .size(sliderSize.large)

    // nucleus
    nucleus = new Nucleus(p, parentId)

    // electrons
    electrons = getElectrons(p)
  }

  p.draw = function () {
    // white background
    p.background(255)

    // sliders
    const shellQty = shellSlider.value()
    const electronQty = electronSlider.value()
    const protonQty = protonSlider.value()
    const neutronQty = neutronSlider.value()
    showSliderText &&
      p
        .fill(120)
        .noStroke()
        .textAlign(p.LEFT, p.TOP)
        .textSize(14)
        .textStyle(p.NORMAL)
        .text(
          `${shellQty} shell${shellQty !== 1 ? 's' : ''}`,
          shellSlider.x + shellSlider.width + sliderPosn.margin,
          sliderPosn.textTop
        )
        .text(
          `${electronQty} electron${electronQty !== 1 ? 's' : ''}`,
          electronSlider.x + electronSlider.width + sliderPosn.margin,
          sliderPosn.textTop
        )
        .text(
          `${protonQty} proton${protonQty !== 1 ? 's' : ''}`,
          protonSlider.x + protonSlider.width + sliderPosn.margin,
          sliderPosn.textBottom
        )
        .text(
          `${neutronQty} neutron${neutronQty !== 1 ? 's' : ''}`,
          neutronSlider.x + neutronSlider.width + sliderPosn.margin,
          sliderPosn.textBottom
        )

    // shells
    shellQty >= 4 && p.fill(255).stroke(180).ellipse(200, 200, 300)
    shellQty >= 3 && p.fill(255).stroke(180).ellipse(200, 200, 250)
    shellQty >= 2 && p.fill(255).stroke(180).ellipse(200, 200, 200)
    shellQty >= 1 && p.fill(255).stroke(180).ellipse(200, 200, 150)

    // nucleus
    nucleus.draw(protonQty, neutronQty)

    // electrons
    electrons.forEach(
      (electron, index) => index < electronQty && electron.create()
    )
  }

  p.mousePressed = function () {
    electrons.forEach((electron) => electron.pressed())
  }

  p.mouseReleased = function () {
    electrons.forEach((electron) => electron.released())
  }

  const getElectrons = function (p) {
    const maxQty = 30
    const posn = { gap: 23, left: 20, top: 40 }
    const electrons = []

    for (let i = 0; i <= maxQty; i++) {
      if (i < 15) {
        electrons.push(new Electron(p, posn.left, posn.top + posn.gap * i))
      } else {
        electrons.push(
          new Electron(p, posn.left + 360, posn.top + posn.gap * (i - 15))
        )
      }
    }

    return electrons
  }
})
