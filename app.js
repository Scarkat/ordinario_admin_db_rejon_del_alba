// Estructura básica.

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/', (req, res) => {
    res.json(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
