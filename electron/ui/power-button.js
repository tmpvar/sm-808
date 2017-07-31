const classes = require('dom-classes')
const on = require('./util/on')

module.exports = createPowerButton

function createPowerButton (powerButton) {
  // Power button
  on(powerButton, 'mousedown', (e) => {
    classes.add(powerButton, 'down')
    console.log('down')
  })

  on(powerButton, 'mouseleave', (e) => {
    if (classes.has(powerButton, 'down')) {
      classes.remove(powerButton, 'down')
    }
  })

  on(powerButton, 'mouseenter', (e) => {
    if (e.buttons) {
      classes.add(powerButton, 'down')
    }
  })

  on(powerButton, 'click', (e) => {
    window.close()
  })
}
