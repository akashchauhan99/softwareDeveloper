const fs = require('fs')

//Write the file
fs.writeFileSync(
   'sync_file.txt',
   'Hello world! I am create by write file sync.\n'
)

// Append the file
fs.appendFileSync('sync_file.txt', 'I am appended by append file sync')

// buffer Storage
const buf_data = fs.readFileSync('sync_file.txt')
console.log(buf_data)

// buffer to String
const org_data = buf_data.toString()
console.log(org_data)

// Rename a file
fs.renameSync('sync_file.txt', 'read_write_sync.txt')
