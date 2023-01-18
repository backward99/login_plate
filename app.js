const express = require('express')
const app = express()
const port = 5500

app.get('/', (req, res) => {
  res.send('후...  시작이다')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})