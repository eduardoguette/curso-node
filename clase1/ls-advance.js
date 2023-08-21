const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] || __dirname

async function ls (folder) {
  let files = null
  try {
    files = await fs.readdir(folder)
  } catch (err) {
    console.log(`No se puede leer el directorio ${folder}`)
    process.exit(1)
  }
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats = null
    try {
      stats = await fs.stat(filePath)
    } catch (err) {
      console.log(`No se puede leer el archivo ${filePath}`)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'dir' : 'file'
    const fileSize = stats.size
    const fileEdited = stats.mtime.toLocaleString()
    return `${fileType.padEnd(5)}${file.padEnd(100)} ${fileSize
      .toString()
      .padEnd(10)} ${fileEdited.padEnd(20)}`
  })
  const filesInfo = await Promise.all(filesPromises)
  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
