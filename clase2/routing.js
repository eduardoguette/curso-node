const http = require('node:http')

const port = process.env.PORT ?? 12345

const processRequest = (req, res) => {
  console.log('listening...')
}
const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`Server listening in port http://localhost:${port}`)
})
