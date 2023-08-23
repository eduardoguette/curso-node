/*
  * Solo modulos nativos que no tienen promesas nativas 

  const { promisify } = require('node:util')
  const readFilePromise = promisify(fs.readFile) 

*/

const fs = require('node:fs/promises')

;(async () => {
  console.log('-> Leyendo el primer archivo...')

  const text = await fs.readFile('./file.txt', 'utf-8')
  console.log(text)

  console.log('-> Hacer cosas mientras lee el archivo...')

  console.log('-> Leyendo el segundo archivo...')

  const secondText = await fs.readFile('./file2.txt', 'utf-8')
  console.log(secondText)
})()
