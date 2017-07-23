const Pattern = require('../models/pattern')
const test = require('tape')

test('new Pattern() (default length)', function (t) {
  const pattern = new Pattern()
  t.equal(pattern.notes.length, 8, 'defaults to 8 steps')
  t.deepEqual(pattern.notes, Array(8).fill(0))
  t.end()
})

test('new Pattern() (multiple of 8)', function (t) {
  const pattern = new Pattern(16)
  t.equal(pattern.notes.length, 16, '16 steps')
  t.deepEqual(pattern.notes, Array(16).fill(0))
  t.end()
})

test('Pattern#setNote (idx in bounds)', function (t) {
  const pattern = new Pattern(4)

  t.ok(pattern.setNote(3, 1), 'setNote in bounds')
  t.ok(pattern.setNote(2, 2), 'setNote in bounds')
  t.ok(pattern.setNote(1, 3), 'setNote in bounds')
  t.ok(pattern.setNote(0, 4), 'setNote in bounds')

  t.deepEqual(pattern.notes, [4, 3, 2, 1], 'notes retain value')
  t.end()
})

test('Pattern#setNote (idx invalid)', function (t) {
  const pattern = new Pattern(4)

  t.notOk(pattern.setNote(10, 1), 'setNote idx out of bounds')
  t.notOk(pattern.setNote(1 / 0, 1), 'setNote idx out of bounds')
  t.notOk(pattern.setNote('not valid', 1), 'setNote idx invalid')

  t.deepEqual(pattern.notes, [0, 0, 0, 0], 'no notes were set')
  t.end()
})

test('Pattern#setNote (velocity NaN/Infinity)', function (t) {
  const pattern = new Pattern(4)

  t.notOk(pattern.setNote(1, 'hello'), 'invalid velocity (NaN)')
  t.notOk(pattern.setNote(2, 1 / 0), 'invalid velocity (Infinity)')

  t.deepEqual(pattern.notes, [0, 0, 0, 0], 'no notes were set')
  t.end()
})

test('Pattern#setNote (velocity out of bounds)', function (t) {
  const pattern = new Pattern(4)

  t.ok(pattern.setNote(1, 123123), 'velocity out of bounds')
  t.deepEqual(pattern.notes, [0, 255, 0, 0], 'no notes were set')

  t.ok(pattern.setNote(1, -10), 'velocity out of bounds')
  t.deepEqual(pattern.notes, [0, 0, 0, 0], 'no notes were set')

  t.end()
})

test('Pattern#step (no notes)', function (t) {
  const pattern = new Pattern(4)

  const result = []
  const expected = Array(16).fill(0)
  for (var i = 0; i < 16; i++) {
    result.push(pattern.step(i))
  }

  t.deepEqual(result, expected, 'no notes played')
  t.end()
})

test('Pattern#step (every 4th)', function (t) {
  const pattern = new Pattern(4)
  const result = []
  const expected = [
    1, 0, 0, 0,
    1, 0, 0, 0,
    1, 0, 0, 0,
    1, 0, 0, 0
  ]

  pattern.setNote(0, 1)

  for (var i = 0; i < 16; i++) {
    result.push(pattern.step(i))
  }

  t.deepEqual(result, expected, 'every fourth')
  t.end()
})

test('Pattern#step (every note)', function (t) {
  const pattern = new Pattern(4)

  const result = []
  const expected = Array(16).fill(1)

  pattern.setNote(0, 1)
  pattern.setNote(1, 1)
  pattern.setNote(2, 1)
  pattern.setNote(3, 1)

  for (var i = 0; i < 16; i++) {
    result.push(pattern.step(i))
  }

  t.deepEqual(result, expected, 'every note')
  t.end()
})
