function add(a, b) {
   return a + b
}

function sub(a, b) {
   return a - b
}

// 1. way
module.exports.add = add

// 2. Way
exports = module.exports
exports.sub = sub

// 3. Way
exports.mul = function mul(a, b) {
   return a * b
}

exports.div = function div(a, b) {
   return a / b
}
