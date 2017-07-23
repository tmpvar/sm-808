const test = require('tape')
const Song = require('../models/song')

test('Song() (default bpm)', function (t) {
  const song = new Song()
  t.equal(song.bpm, 60, '60bpm')
  t.end()
})

test('Song() (128bpm)', function (t) {
  const song = new Song(128)
  t.equal(song.bpm, 128, '128bpm')
  t.end()
})

test('Song#addPattern', function (t) {
  const song = new Song(128)
  const notes = [1, 2, 3, 4, 5, 6, 7, 8]

  song.setPattern('trombone', notes)

  t.deepEqual(song.patterns.trombone.notes, notes, 'trombone notes set')
  t.end()
})

test('Song#play (no onStep)', function (t) {
  const song = new Song(500)
  const notes = [1, 2, 3, 4, 5, 6, 7, 8]
  song.setPattern('trombone', notes)

  song.play()
  setTimeout(() => {
    song.stop()
    t.end()
  }, 100)
})

test('Song#play (w/ onStep)', function (t) {
  const song = new Song(1000)
  song.setPattern('kick', [1, 2, 3, 4, 5, 6, 7, 8])
  song.setPattern('trombone', [1, 0, 1, 0])

  song.play(onStep)

  const result = []
  const expect = [
    ['kick', 'trombone'],
    ['kick'],
    ['kick', 'trombone'],
    ['kick'],
    ['kick', 'trombone'],
    ['kick'],
    ['kick', 'trombone'],
    ['kick']
  ]

  function onStep (position, notes) {
    result.push(notes)
    if (result.length === 8) {
      t.deepEqual(result, expect, 'notes were played as expected')
      song.stop()
      t.end()
    }
  }
})

test('Song#pause', function (t) {
  const song = new Song(1000)
  const notes = [1, 2, 3, 4, 5, 6, 7, 8]
  song.setPattern('trombone', notes)

  song.play()
  setTimeout(() => {
    song.play() // ensure playing again while playing does nothing
    song.pause()
    t.ok(song.position > 0, 'playhead moved: ' + song.position)

    song.stop()
    t.equal(song.position, 0, 'playhead reset to 0')

    t.end()
  }, 100)
})
