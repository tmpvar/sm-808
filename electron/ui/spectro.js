module.exports = createSpectro

const spectroColors = [
  'hsl(200, 100%, 46%)',
  'hsl(53, 100%, 46%)',
  'hsl(0, 100%, 46%)'
]

const backgroundColor = 'rgba(39, 60, 30, .25)'
const borderColor = '#000'

function createSpectro (analyser, canvas) {
  const bufferLength = analyser.fftSize
  const dataArray = new Uint8Array(bufferLength)
  const ctx = canvas.getContext('2d')

  const ledWidth = 12
  const ledHeight = 6

  function draw () {
    const width = canvas.width
    const height = canvas.height
    window.requestAnimationFrame(draw)

    analyser.getByteTimeDomainData(dataArray)

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    ctx.lineWidth = 1
    ctx.strokeStyle = borderColor
    ctx.save()
    ctx.scale(1, -1)
    ctx.translate(5, -height + 5)
    ctx.beginPath()

    for (var i = 0; i < bufferLength; i += 2) {
      var valuePercent = (((dataArray[i] + dataArray[i + 1] - 260)) / 265)
      var v = 10 * valuePercent

      for (var j = 0; j < 10; j++) {
        if (v < j) continue

        var color = spectroColors[Math.floor(3 * j / 10)]

        ctx.fillStyle = color
        ctx.fillRect(
          ((i / 2) * ledWidth) | 0,
          j * ledHeight,
          ledWidth - 1,
          ledHeight - 1
        )
      }
    }

    ctx.stroke()
    ctx.restore()
  };

  draw()
}
