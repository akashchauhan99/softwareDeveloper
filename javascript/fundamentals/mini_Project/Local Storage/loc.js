let arr = []

let isRegister = true

const processor = () => {
   let gen = document.getElementsByName('gender')
   for (i = 0; i < gen.length; i++) {
      if (gen[i].checked) {
         gen = document.getElementById(gen[i].value).value
      }
   }
   let theData = {
      fname: document.getElementById('fname').value,
      lname: document.getElementById('lname').value,
      email: document.getElementById('email').value,
      gender: gen
   }
   return theData
}

const register = (e) => {
   arr.push(processor())
   updateStore()
   updateTable()
   e.preventDefault()
}

const updateStore = () => {
   for (let i in arr) {
      localStorage.setItem(i, JSON.stringify(arr[i]))
   }
}

const updateTable = () => {
   let tuples = document.getElementById('tuples')
   tuples.innerHTML = ``
   for (let i in arr) {
      let items = localStorage.getItem(i)
      items = JSON.parse(items)
      console.log(items.fname)
      tuples.innerHTML += `
        <tr>
        <td>${items.fname}</td>
        <td>${items.lname}</td>
        <td>${items.gender}</td>
        <td>${items.email}</td>
        <td class='delete' ><button onclick='delt(${i})'>Delete</button></td>
        <td class='edit' ><button onclick='edit(${i})'>Edit</button></td>
        </tr>
        `
   }
}

const delt = (item) => {
   console.log(item)
   arr.splice(item, 1)
   localStorage.removeItem(item)
   updateStore()
   updateTable()
}

const edit = (item) => {
   document.getElementById('fname').value = arr[item].fname
   document.getElementById('lname').value = arr[item].lname
   document.getElementById('email').value = arr[item].email
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
   event.preventDefault()
   document.getElementById('form').setAttribute('onsubmit', 'register(event)')
   document.getElementById('submit').value = 'Submit'
}
