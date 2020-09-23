export class Alert {
  constructor() {
    this.el = document.getElementById('alert')
  }

  listen() {
    const alert = this
    document.addEventListener('copied', () => {
      alert.show()
      setTimeout(() => alert.hide(), 1500)
    })
  }

  hide() {
    this.el.style.display = 'none'
  }

  show() {
    this.el.style.display = 'block'
  }
}
