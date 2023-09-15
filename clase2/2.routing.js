const http = require('node:http')

const port = process.env.PORT ?? 12345

const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json', 'charset=utf8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html', 'charset=utf8')
          return res.end('404 Not found')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', (chunk) => {
            // el chunk es un buffer que recibe binarios y lo convertimos a string con el toString
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de dato para guardar la info por ejemplo
            res.writeHead(201, { 'Content-Type': 'application/json, charset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html', 'charset=utf8')
          return res.end('<h1>Not found</h1>')
      }
  }
}
const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`Server listening in port http://localhost:${port}`)
})
