const express = require('express')

const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 12345

const app = express()
// desactivar el header x-powered-by para que no se sepa que tecnologia estamos usando
app.disable('x-powered-by')

// middleware para parsear el body de las request que son POST y que tienen el header content-type: application/json
app.use(express.json())

/* app.use((req, res, next) => {
  if (req.method !== 'POST') return next()

  if (req.headers['content-type'] !== 'application/json') return next()

  // solo llegan request que son POST y que tienen el header content-type: application/json
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la información en el req.body
    req.body = data
    next()
  })
}) */

app.get('/pokemon/ditto', (req, res) => {
  res.setHeader('Content-Type', 'application/json', 'charset=utf8')
  return res.end(JSON.stringify(dittoJSON))
})

app.post('/pokemon', (req, res) => {
  res.json(req.body)
})

// Si no se encuentra ninguna ruta, entra en el siguiente middleware que es el 404
app.use((req, res) => {
  res.status(404).send('<h1>404 - Not found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening in port http://localhost:${PORT}`)
})

// El middleware es una funcion que se ejecuta entre el request y el response
