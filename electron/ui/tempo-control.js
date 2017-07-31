const qel = require('qel')
const on = require('./util/on')

module.exports = createTempoControl

function createTempoControl (song, control) {
  const tempoSlider = qel('input[type=range]', control)
  const tempoTextbox = qel('input[type=text]', control)

  on(tempoSlider, 'mousemove', (e) => {
    song.setBPM(e.target.value)
    tempoTextbox.value = e.target.value
  })

  on(tempoSlider, 'change', (e) => {
    song.setBPM(e.target.value)
    tempoTextbox.value = e.target.value
  })

  on(tempoTextbox, 'change', (e) => {
    const value = parseInt(e.target.value)
    song.setBPM(value)
    tempoSlider.value = e.target.value
  })
}
