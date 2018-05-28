const express = require('express')
const router = express.Router()
const jsYaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

router.get('/data', (req, res) => {
  const yml = fs.readFileSync(path.resolve(__dirname, '../data.yml'))
  const data = jsYaml.safeLoad(yml)
  res.json(data)
})

module.exports = router
