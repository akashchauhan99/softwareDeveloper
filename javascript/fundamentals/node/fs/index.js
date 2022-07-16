const fs = require('fs')
const file = 'index.txt'

fs.watch(file, () => {
   console.log('File Changed')
})
