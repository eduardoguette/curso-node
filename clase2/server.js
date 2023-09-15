const http = require('node:http')
const fs = require('node:fs')
const port = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  console.log('Request recived ', req.url)
  res.setHeader('Content-Type', 'text/html; charset=utf8')
  res.statusCode = 200
  if (req.url === '/') {
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./imagen.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal server error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>Not found</h1>')
  }
}
const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`Escuchando en el puerto http://localhost:${port}`)
})
