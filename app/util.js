import config from './config'
const circle = config.circle
const global = config.global

const util = {
  degreeToRadian: degree => Math.PI / 180 * degree,
  orbit: {
    x: (p, element, index, times) => {
      const orbitDegree = p.frameCount / global.speed_rate * times * 2
      const eachDegree = 360 / element.children.length * index
      const radian = util.degreeToRadian(orbitDegree + eachDegree)

      return element.x + Math.cos(radian) * circle.distance * (10 - times * times / 1.3) / 10
    },
    y: (p, element, index, times) => {
      const orbitDegree = p.frameCount / global.speed_rate * times * 2
      const eachDegree = 360 / element.children.length * index
      const radian = util.degreeToRadian(orbitDegree + eachDegree)

      return element.y + Math.sin(radian) * circle.distance * (10 - times * times / 1.3) / 10
    }
  },
  drawChild: (elem, p, times = 1) => {
    if (!elem.children) return

    elem.children.forEach((elem2, index) => {
      const x = util.orbit.x(p, elem, index, times)
      const y = util.orbit.y(p, elem, index, times)

      p.stroke(config.color.line)
      p.line(elem.x, elem.y, x, y)
      p.noStroke()

      const c = config.color.circle.map((e, i) => i === 1 || i === 2 ? 100 - times * 15 : e)
      p.fill(c)
      const size = config.circle.size / times
      p.ellipse(x, y, size, size)

      p.fill(config.color.text)
      p.text(elem2.name, x, y)

      if (elem2.children) {
        const data = Object.assign({ x: x, y: y }, elem2)
        util.drawChild(data, p, times + 1)
      }
    })
  },
  getDistance: (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
  }
}

export default util
