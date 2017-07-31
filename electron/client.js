const path = require('path')
const fs = require('fs')

const qel = require('qel')
const classes = require('dom-classes')
const Song = require('../models/song')

const createSpectro = require('./ui/spectro')
const createPowerButton = require('./ui/power-button')
const createPatternButtons = require('./ui/pattern-buttons')
const createPlaybackButton = require('./ui/playback-button')
const createTempoControl = require('./ui/tempo-control')
const createVolumeControl = require('./ui/volume-control')

const song = new Song(128)

const stepCells = Array.from(qel('#pattern thead th', null, true)).slice(1, -1)

const audio = new window.AudioContext()
const gainNode = audio.createGain()
const analyser = audio.createAnalyser()

gainNode.connect(audio.destination)
analyser.fftSize = 32
analyser.connect(gainNode)

// Load up all the sounds we're going to need
const sounds = {}
loadSound(audio, 'kick')
loadSound(audio, 'hat')
loadSound(audio, 'snare')

// Playback button
createPlaybackButton(
  song,
  qel('#pattern .playback'),
  stepCells,
  onSongStep
)

// Power buttons
createPowerButton(qel('#pattern .power'))

// Pattern buttons
createPatternButtons(
  song,
  qel('#pattern table tbody button', null, true)
)

// Tempo
createTempoControl(song, qel('#pattern .sliders .tempo'))

// Volume
createVolumeControl(song, gainNode, qel('#pattern .sliders .volume'))

// Spectro Analyzer
createSpectro(analyser, qel('#pattern canvas.analyzer'))

// Playback
function playSound (ctx, buffer, destination) {
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.connect(destination)
  source.start(0)
}

function loadSound (ctx, name) {
  const buffer = fs.readFileSync(path.join(__dirname, 'assets', 'sound', `${name}.wav`))

  ctx.decodeAudioData(
    buffer.buffer,
    onBufferDecoded,
    onBufferDecodeError
  )

  function onBufferDecoded (buffer) {
    sounds[name] = buffer
    song.setPattern(name, Array(16).fill(0))
  }

  function onBufferDecodeError (err) {
    console.log('problem decoding %s', name)
    console.log(err.stack)
    process.exit(0)
  }
}

function onSongStep (position, notes) {
  stepCells.forEach((cell) => { classes.remove(cell, 'active') })
  classes.add(stepCells[position % 16], 'active')

  notes.forEach((note) => {
    playSound(audio, sounds[note], analyser)
  })
}
