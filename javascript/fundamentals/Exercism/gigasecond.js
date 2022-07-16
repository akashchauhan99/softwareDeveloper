const gigasecond = (time) => {
   let date = time.getTime()
   const gs = Math.pow(10, 9)
   let futuretime = date + gs
   return new Date(futuretime)
}
let date = new Date(2021, 10, 8, 7, 6, 2)
alert(gigasecond(date))
