module.exports = Pattern

/**
 * Create a pattern, which will house a sequence of note velocities
 *
 * @constructor
 * @param {Number} length - optional, defaults to 8 (1 bar of 8th notes)
 */
function Pattern (length) {
  // TODO: store the incoming length and use it in the step function while
  //       clamping this.notes length to 32. This should allow for a dynamic
  //       resize of the pattern without losing previously placed notes
  this.notes = Array(length || 8).fill(0)
}

/**
 * Set a note's velocity in this pattern
 *
 * @param {Number} idx - which note to set (index into the this.notes array)
 * @param {Number} velocity - 0-255 where 0 is off
 * @returns {Boolean} true if in idx is inbounds and false if out of bounds
 */
Pattern.prototype.setNote = function (idx, velocity) {
  if (isNaN(idx) || !isFinite(idx)) {
    return false
  }

  if (isNaN(velocity) || !isFinite(velocity)) {
    return false
  }

  // cast args to int
  idx = idx | 0
  velocity = velocity | 0

  const notes = this.notes
  if (idx >= notes.length) {
    return false
  }

  // clamp to 0-255
  notes[idx] = Math.min(255, Math.max(velocity, 0))
  return true
}

/**
 * Determine if this pattern contains a note that needs to be played at the
 * current global position.
 *
 * @param {int} position - the global step position
 * @returns {int} return the note velocity of the current position
 */
Pattern.prototype.step = function (position) {
  const idx = position % this.notes.length
  return this.notes[idx]
}
