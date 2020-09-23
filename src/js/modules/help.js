export class Help {
  constructor() {
    this.button = document.getElementById('helpButton')
    this.content = document.getElementById('helpContent')
  }

  listen() {
    const self = this
    this.button.addEventListener('click', () => {
      self.content.style.display === 'none' ? self.show() : self.hide()
    })
  }

  hide() {
    this.content.style.display = 'none'
  }

  show() {
    this.content.style.display = 'block'
  }
}
