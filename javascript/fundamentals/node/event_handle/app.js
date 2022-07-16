function timeOut() {
   setTimeout(function () {
      console.log('Set TimeOut')
   }, 2000)
}

function without() {
   console.log('Without')
}

function fact(n) {
   if (n >= 1) {
      return n * fact(n - 1)
   } else {
      return 1
   }
}

for (let i = 0; i < 5; i++) {
   without()
   timeOut()
   console.log(fact(i))
}
