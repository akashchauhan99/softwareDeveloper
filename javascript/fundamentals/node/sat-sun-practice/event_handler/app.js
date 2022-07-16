// 1. way
const EventEmitter = require('events')
const event = new EventEmitter()

// 2. way
// const event = require('events')
// const EventEmitter = new event.EventEmitter()

event.on('sayMyName', () => {
   console.log('Your name is Akash')
})

event.on('sayMyName', () => {
   console.log('Your name is Akash')
})

event.on('sayMyName', () => {
   console.log('Your name is Akash')
})
// without parameters
event.emit('sayMyName')

event.on('checkPage', (sc, msg) => {
   console.log(`The Status code of your page is ${sc} annd Message is ${msg}`)
})

// with parameters
event.emit('checkPage', 200, 'ok')
