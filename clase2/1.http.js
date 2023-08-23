const http = require('node:http') // protocolo http

const desiredPort = process.env.PORT || 1234

const server = http.createServer((req, res) => {
  console.log('Request received', req.url)
  res.end('Hello world')
})

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
