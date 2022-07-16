var weekdays = [
   // Sunday
   {
      allday: false // Closed all day
   },
   // Monday
   {
      open: '08.00',
      close: '05.00'
   },
   // Tuesday
   {
      open: '09.00',
      close: '19.00'
   },
   // Wednesday
   {
      open: '09.00',
      close: '19.00'
   },
   // Thursday
   {
      open: '09.00',
      close: '19.00'
   },
   // Friday
   {
      open: '09.00',
      close: '19.00'
   },
   // Saturday
   {
      allday: false // Closed all day
   }
]

// This is a starting point of our program
function calculate() {
   const start = document.getElementById('start').value
   const end = document.getElementById('end').value
   const day = document.getElementById('day').value
   // console.log(`${start}, ${end}, ${day}`)
   isOpen(start, end, day)
}

// It'll check the open or close status of our shop
function isOpen(startTime, endTime, days) {
   let n = days
   let start = parseFloat(startTime)
   let end = parseFloat(endTime)

   let checkTime = checkCorrectTime(startTime, endTime)
   let checkDay = checkCorrectDay(parseInt(n))

   if (checkDay) {
      if (checkTime) {
         if (n == 0 || n == 6) {
            alert("It'll be open on Monday at 08.00 AM")
         } else {
            let dayOpen = parseFloat(weekdays[n].open)
            let dayClose = parseFloat(weekdays[n].close)
            if (start >= dayOpen && end < dayClose) {
               // console.log('if before res')
               alert('It is open right now!')
               let res = 18.59 - end
               // console.log('if after res')
               alert(`It'll be close in ${res} hours`)
            } else {
               // console.log('else before res')
               alert('It is close right now!')
               let res = 18.59 - start
               // console.log('else after res')
               alert(`It'll be open in ${res} hours`)
            }
         }
      } else {
         alert('Please enter correct time!')
      }
   } else {
      alert('Please enter correct day!')
   }
}

// it'll check the time it should be <60 min and <24 hour
function checkCorrectTime(startTime, endTime) {
   let splitStart = startTime.split('.')
   let splitEnd = endTime.split('.')
   console.log(splitStart[0], splitStart[1])
   console.log(splitEnd[0], splitEnd[1])
   if (
      splitStart[0] >= 0 &&
      splitStart[0] < 24 &&
      splitStart[1] >= 0 &&
      splitStart[1] < 60 &&
      splitEnd[0] >= 0 &&
      splitEnd[0] < 24 &&
      splitEnd[1] >= 0 &&
      splitEnd[1] < 60
   ) {
      return true
   } else {
      return false
   }
}

// it'll check the day it should be day>1 and day<7
function checkCorrectDay(day) {
   if (day >= 0 && day <= 6) {
      return true
   } else {
      false
   }
}
