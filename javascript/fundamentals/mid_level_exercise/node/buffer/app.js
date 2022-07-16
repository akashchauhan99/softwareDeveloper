// string to Buffer
const buf = Buffer.from('Hey World')
console.log(buf)
console.log(buf[0])
console.log(buf[6])

// buffer to String
console.log(buf.toString())

// length
console.log(buf.length)

// Iterate over the contents of a buffer
for (let item of buf) {
   console.log(item)
}

buf[3] = 'o'
console.log(buf)

const buff = Buffer.alloc(4)
buff.write('Hey!r')
console.log(buff)

buf.subarray(0).toString() //Hey!
console.log(buf)
const slice = buf.subarray(0, 2)
console.log(slice.toString()) //He
buf[1] = 111
console.log(slice.toString())

// Copy a buffer
let bufcopy = Buffer.from('Moo!')
bufcopy.set(buf.subarray(1, 3), 1)

console.log(bufcopy.toString())
