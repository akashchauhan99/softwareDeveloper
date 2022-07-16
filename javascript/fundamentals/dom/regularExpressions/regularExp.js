function validate() {
   let username = document.getElementById('uname').value
   let invalid = document.getElementById('invalidusername')

   // i == for case insensitive
   // g == for all num/character or words

   //literal way
   // let regex = /E00/gi
   // let regex = /[a-x]00/i

   // if we want to exclude something
   // let regex = /[^1-9][a-z]/i

   // object way
   // regex = new RegExp('EOO', 'i')

   // if (regex.test(username)) {
   //    alert('Valid Username')
   //    invalid.style.visibility = 'hidden'
   // } else {
   //    alert('Invalid Username')
   //    invalid.style.visibility = 'visible'
   // }

   let regex = /[a-z][1-9$]/i

   if (regex.test(username)) {
      alert('Valid Username')
      invalid.style.visibility = 'hidden'
   } else {
      alert('Invalid Username')
      invalid.style.visibility = 'visible'
   }

   // let regexNum = /[0-9]/g
   // let regexNum = /\W/g
   // if (username.match(regexNum)) {
   //    console.log(username.match(regexNum))
   //    console.log(username.match(regexNum).join(''))
   // } else {
   //    alert('Invalid Username')
   // }
}
