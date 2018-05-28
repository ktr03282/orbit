import config from './config'
import axios from 'axios'
import util from './util'

const URL = 'http://localhost:3000/data'

let data = []
axios.get(URL).then(res => {
  data = res.data
})

export default {
  sketch: p => {
    p.setup = () => p.createCanvas(config.canvas.w, config.canvas.h)

    p.preload = () => {
      p.colorMode(p.HSB)
    }

    p.draw = () => {
      // p.clear()
      p.smooth()
      p.noStroke()
      p.background(config.color.canvas)

      p.textAlign(p.CENTER, p.CENTER)
      p.ellipseMode(p.CENTER)

      data.forEach(elem => {
        util.drawChild(elem, p)

        p.fill(config.color.circle)
        const size = config.circle.size * 2
        p.ellipse(elem.x, elem.y, size, size)

        p.fill(config.color.text)
        p.text(elem.name, elem.x, elem.y)
      })
    }
    p.mouseDragged = () => {
      let count = 0
      data = data.map(e => {
        if (count === 0 && util.getDistance(e.x, e.y, p.mouseX, p.mouseY) < config.circle.size) {
          e.x = p.mouseX
          e.y = p.mouseY
          count++
        }
        return e
      })
    }
  }
}
