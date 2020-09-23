function copyImage() {
  let canvas = document.getElementById('defaultCanvas0')
  canvas.toBlob((blob) =>
    navigator.clipboard
      .write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ])
      .then(() => {
        const copiedEvent = new Event('copied')
        document.dispatchEvent(copiedEvent)
      })
  )
}

export { copyImage }
