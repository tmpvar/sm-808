const classes = require('dom-classes')
const on = require('./util/on')

module.exports = createPlaybackButton

function createPlaybackButton (song, playbackButton, stepCells, onSongStep) {
  function togglePlay () {
    if (classes.has(playbackButton, 'playing')) {
      classes.remove(playbackButton, 'playing')
      song.stop()
      stepCells.forEach((cell) => { classes.remove(cell, 'active') })
    } else {
      classes.add(playbackButton, 'playing')
      song.play(onSongStep)
    }
  }

  on(playbackButton, 'mousedown', () => {
    classes.add(playbackButton, 'down')
  })

  on(playbackButton, 'click', (e) => {
    console.log(e)
    classes.remove(playbackButton, 'down')
    togglePlay()
  })
}
