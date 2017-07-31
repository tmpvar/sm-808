const Pattern = require('./pattern')

module.exports = Song

/**
 * Wrapper for song related functionality including:
 * - patterns
 * - bpm & associated timers
 * - playback controls
 * - sugar for pattern manipulation
 *
 * @constructor
 * @param {Number} bpm - unsigned integer representing the beats per minute
 */
function Song (bpm) {
  this.setBPM(bpm || 60)

  this.patterns = {}
  this.timer = null
  this.position = 0
  this.lastStep = 0
}

/**
 * Song#step onStep callback
 *
 * This is called every time the song steps, which is used to notify callers.
 *
 * @callback onStep
 * @param {int} position - the global position of the song
 * @param {array} notes - an array of notes to be played
 * @returns {undefined}
 */

/**
 * Performs a global step and computes/returns the notes that need to be played
 *
 * @param {onStep} onStep - callback when a step has occurred.
 * @returns {undefined}
 */
Song.prototype.step = function (onStep) {
  const now = Date.now()
  if (now - this.lastStep < this.msPerStep) {
    return
  }

  this.lastStep = now

  // compute the notes that need to be played at this moment in time
  const notes = Object.keys(this.patterns).map((instrument) => {
    if (this.patterns[instrument].step(this.position)) {
      // TODO: return an object that also contains the note velocity
      return instrument
    }
  })

  onStep(this.position, notes.filter(Boolean))
  this.position++
}

/**
 * Begin/resume playing the current song.
 *
 * This is accomplished by setting up timers that will fire Song#step
 *
 * @param {onStep} onStep - callback when a step has occurred.
 * @returns {undefined}
 */
Song.prototype.play = function (onStep) {
  if (this.timer) {
    return
  }

  // TODO: setInterval is not a very accurate timer, which will either make
  //       the beat super funky or make peoples ears bleed.
  onStep = onStep || Function.prototype
  this.setBPM(this.bpm)
  this.timer = setInterval(this.step.bind(this, onStep), 0)
  this.lastStep = 0
  this.step(onStep)
}

/**
  * Change the bpm of the song
  *
  * @param {int} bpm - beats per minute
  * @returns {undefined}
  */
Song.prototype.setBPM = function (bpm) {
  this.bpm = bpm
  this.msPerStep = 1000 * (((60 / this.bpm) * 4) / 8)
}

/**
 * Stop playing the current song and reset the global position
 *
 * @returns {undefined}
 */
Song.prototype.stop = function () {
  clearInterval(this.timer)
  this.timer = null
  this.position = 0
}

/**
 * Stop playing the current song but leave the global position intact
 *
 * @returns {undefined}
 */
Song.prototype.pause = function () {
  clearInterval(this.timer)
  this.timer = null
}

/**
 * Set a pattern directly by providing every note
 *
 * @param {String} instrument - name of the instrument
 * @param {Array} notes - an array of note velocities [0-255] where 0 is off
 * @returns {undefined}
 */
Song.prototype.setPattern = function (instrument, notes) {
  if (!this.patterns[instrument]) {
    this.patterns[instrument] = new Pattern(notes.length)
  } else {
    // TODO: resize the pattern
  }

  const pattern = this.patterns[instrument]
  notes.forEach((note, idx) => {
    pattern.setNote(idx, note)
  })
}
