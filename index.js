const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'app')))
  .set('views', path.join(__dirname, 'app'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('app/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
