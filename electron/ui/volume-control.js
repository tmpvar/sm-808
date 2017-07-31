const qel = require('qel')
const on = require('./util/on')

module.exports = createVolumeControl

function createVolumeControl (song, gainNode, control) {
  const volumeSlider = qel('input[type=range]', control)
  const volumeTextbox = qel('input[type=text]', control)

  gainNode.gain.value = volumeSlider.value / 100

  on(volumeSlider, 'mousemove', (e) => {
    gainNode.gain.value = e.target.value / 100
    volumeTextbox.value = e.target.value
  })

  on(volumeSlider, 'change', (e) => {
    gainNode.gain.value = e.target.value / 100
    volumeTextbox.value = e.target.value
  })

  on(volumeTextbox, 'change', (e) => {
    const value = parseInt(e.target.value)
    gainNode.gain.value = value / 100
    volumeSlider.value = e.target.value
  })
}
