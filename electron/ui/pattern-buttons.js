const qel = require('qel')
const classes = require('dom-classes')
const on = require('./util/on')

module.exports = createPatternButtons

function patternButtonFromEvent (e) {
  const target = e.target.nodeName === 'LIGHT'
  ? e.target.parentNode
  : e.target

  if (target.nodeName !== 'BUTTON') {
    return
  }

  return target
}

function toggleNote (song, e) {
  const button = patternButtonFromEvent(e)
  if (!button) {
    return
  }

  const cell = button.parentElement
  const instrument = cell.parentElement.firstElementChild.innerText.toLowerCase()
  const light = qel('light', button)

  const value = classes.has(light, 'on') ? 0 : 1
  song.patterns[instrument].setNote(cell.cellIndex - 1, value)
  classes.toggle(light, 'on')
}

function focus (ctx) {
  const el = qel('button', ctx)
  if (el) {
    el.focus()
  }
}

function createPatternButtons (song, allPatternButtons) {
  Array.from(allPatternButtons).forEach((button) => {
    on(button, 'click', (e) => {
      // This is somewhat nasty, but works around click+drag for
      // quickly filling ranges of a pattern while maintaining
      // accessiblity (e.g., tab for navigation and space for 'click')
      if (button.ignoreNextClick) {
        delete button.ignoreNextClick
        return
      }

      toggleNote(song, e)
    })

    on(button, 'mousedown', (e) => {
      toggleNote(song, e)
      button.ignoreNextClick = true
    })

    on(button, 'mouseenter', (e) => {
      if (e.buttons) {
        button.focus()
        toggleNote(song, e)
      }
    })

    on(button, 'keydown', (e) => {
      const cellIndex = button.parentElement.cellIndex
      const rowIndex = button.parentElement.parentElement.rowIndex
      const tr = button.parentElement.parentElement
      const tbody = tr.parentElement

      // 38 - up
      if (e.keyCode === 38) {
        const prevRow = tbody.children[rowIndex - 2]
        if (prevRow) {
          focus(prevRow.children[cellIndex])
        }
      }

      // 40 - down
      if (e.keyCode === 40) {
        const nextRow = tbody.children[rowIndex]
        if (nextRow) {
          focus(nextRow.children[cellIndex])
        }
      }

      // 37 - left
      if (e.keyCode === 37) {
        const prevCell = tr.children[cellIndex - 1]
        if (prevCell) {
          focus(prevCell)
        }
      }

      // 39 - right
      if (e.keyCode === 39) {
        const nextCell = tr.children[cellIndex + 1]
        if (nextCell) {
          focus(nextCell)
        }
      }
    })
  })
}
