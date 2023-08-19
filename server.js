const http = require('node:http')
const { findPortAvailable } = require('./free-port.js')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request recived ')
  res.end('Hola')
})
findPortAvailable(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(
      `Escuchando en el puerto http://localhost:${server.address().port}`
    )
  })
})
