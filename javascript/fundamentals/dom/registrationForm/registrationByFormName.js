// function reset() {
//    let name1 = (document.getElementById('name').value = '')
//    let dob1 = (document.getElementById('dob').value = '')
//    let gender1 = (document.getElementsById('gender').value = '')
//    let email1 = (document.getElementById('email').value = '')
//    let add1 = (document.getElementById('add').value = '')
//    let school1 = (document.getElementById('school').value = '')
//    let department1 = (document.getElementById('department').value = '')
//    let course1 = (document.getElementById('course').value = '')
//    let mobile1 = (document.getElementById('mobile').value = '')
// }

function register() {
   let name1 = document.myForm.name.value
   let dob1 = document.myForm.dob.value
   let gender1 = document.myForm.gender
   let email1 = document.myForm.email.value
   let add1 = document.myForm.add.value
   let school1 = document.myForm.school.value
   let department1 = document.myForm.department.value
   let course1 = document.myForm.course.value
   let mobile1 = document.myForm.mobile.value

   // alert(name1)
   // alert(dob1)

   //to get the value of gender
   for (let i = 0; i < gender1.length; i++) {
      if (gender1[i].checked) {
         gender1 = gender1[i].value
      }
   }
   // alert(gender1)

   let letters = /^[A-Za-z]+$/
   let num = /^[0-9]+$/

   // validation: it checks empty or alpha or numeric values
   if (name1 == '') {
      alert('Please enter your name')
   } else if (!letters.test(name1)) {
      alert('Name field required only alphabet characters')
   } else if (dob1 == '') {
      alert('Please enter you date of birth')
   } else if (gender1 == '') {
      alert('Please enter you date of gender')
   } else if (email1 == '') {
      alert('Please enter your email')
   } else if (add1 == '') {
      alert('Please enter your address')
   } else if (school1 == '') {
      alert('Please enter your school name')
   } else if (mobile1 == '') {
      alert('Please enter your mobile number')
   } else if (!num.test(mobile1)) {
      alert('Mobile number field required only numeric characters')
   } else if (mobile1.length != 10) {
      alert('Mobile number field required 10 characters')
   } else {
      alert('Thankyou for Registration!!!')
      let result = `${name1} \n ${dob1} \n ${gender1} \n
      ${email1} \n${add1} \n ${school1} \n ${department1}
      \n ${course1} \n ${mobile1}`
      alert(result)
   }
}

//it will show department name
function departmentChange() {
   let department1 = document.myForm.department.value
   alert(department1)
}

//it will show course name
function courseChange() {
   let course1 = document.myForm.course.value
   alert(course1)
}
