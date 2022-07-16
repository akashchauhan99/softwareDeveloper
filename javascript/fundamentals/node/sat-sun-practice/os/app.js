const os = require('os')

//architecture
console.log(os.arch())
console.log(os.constants)

//free space in ram
let res = os.freemem()
console.log(res)
res = res / 1024 / 1024 / 1024
console.log(res)

// total space in ram
let totalMem = os.totalmem()
console.log(totalMem)
totalMem = totalMem / 1024 / 1024 / 1024
console.log(totalMem)

console.log(os.homedir())
console.log(os.hostname())
console.log(os.platform())
console.log(os.tmpdir())
console.log(os.version())
