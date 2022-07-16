let arr = []

let isRegister = true

const processor = () => {
   let gen = document.getElementsByName('gender')
   for (let i = 0; i < gen.length; i++) {
      if (gen[i].checked) {
         gen = document.getElementById(gen[i].value).value
      }
   }
   let theData = {
      fname: document.getElementById('fname').value,
      lname: document.getElementById('lname').value,
      email: document.getElementById('email').value,
      mobile: document.getElementById('mobile').value,
      gender: gen
   }
   return theData
}

const register = (e) => {
   arr.push(processor())
   updateStore()
   updateTable()
   e.preventDefault()
   reset()
}

const updateStore = () => {
   for (let i in arr) {
      // debugger
      localStorage.setItem(i, JSON.stringify(arr[i]))
   }
}

const updateTable = () => {
   let tuples = document.getElementById('tuples')
   tuples.innerHTML = ``
   for (let i in arr) {
      let items = localStorage.getItem(i)
      items = JSON.parse(items)
      // console.log(items.fname)
      tuples.innerHTML += `
      <tr>
         <td>${items.fname}</td>
         <td>${items.lname}</td>
         <td>${items.mobile}</td>
         <td>${items.email}</td>
         <td>${items.gender}</td>
         <td class='delete' ><button onclick='del(${i})'>Delete</button></td>
        <td class='edit' ><button onclick='edit(${i})'>Edit</button></td>
      </tr>
      `
   }
}

const del = (item) => {
   console.log(item)
   // debugger
   arr.splice(item, 1)
   localStorage.removeItem(item)
   // for (let i in arr) {
   //    console.log(arr[i])
   // }
   updateStore()
   updateTable()
}

const edit = (item) => {
   document.getElementById('fname').value = arr[item].fname
   document.getElementById('lname').value = arr[item].lname
   document.getElementById('email').value = arr[item].email
   document.getElementById('mobile').value = arr[item].mobile
   document.getElementById(arr[item].gender).checked = true
   document
      .getElementById('form')
      .setAttribute('onsubmit', `update(event, ${item})`)
   document.getElementById('submit').value = 'update'
}

const update = (event, item) => {
   arr.splice(item, 1, processor())
   updateStore()
   updateTable()
   reset()
   event.preventDefault()
   document.getElementById('form').setAttribute('onsubmit', 'register(event')
   document.getElementById('submit').value = 'submit'
}

const reset = () => {
   document.getElementById('fname').value = ''
   document.getElementById('lname').value = ''
   document.getElementById('email').value = ''
   document.getElementById('mobile').value = ''
   document.getElementsByName('gender').value = ''
}
