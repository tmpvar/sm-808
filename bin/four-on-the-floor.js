const Song = require('../models/song')
const song = new Song(123)

song.setPattern('kick', [1, 0, 0, 0, 1, 0, 0, 0])
song.setPattern('snare', [0, 0, 0, 0, 1, 0, 0, 0])
song.setPattern('hihat', [0, 0, 1, 0, 0, 0, 1, 0])

song.play(onStep)
setTimeout(() => {
  song.stop()
  console.log('') // make a clean break w.r.t. stdout
}, 8000)

// called every time the song steps
function onStep (position, notes) {
  process.stdout.write('|')

  if (notes.length) {
    process.stdout.write(notes.join('+'))
  } else {
    process.stdout.write('_')
  }

  if ((position + 1) % 8 === 0) {
    process.stdout.write('|\n')
  }
}
