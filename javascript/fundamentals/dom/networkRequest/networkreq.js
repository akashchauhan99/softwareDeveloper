// fetch('https://reqres.in/api/users').then((res) => console.log(typeof res))

// fetch('https://reqres.in/api/users/', {
//    method: 'POST',
//    headers: {
//       'Content-type': 'application/json'
//    },
//    body: JSON.stringify({
//       id: 7,
//       name: 'user1'
//    })
// })
//    .then((res) => {
//       if (res.ok) {
//          console.log('Success')
//       } else {
//          console.log('Fail')
//       }
//       return res.json()
//    })
//    .then((data) => {
//       console.log(data)
//    })
//    .catch((data) => {
//       console.log(data)
//    })

async function loadUsers() {
   return (await fetch('./users.json')).json()
   // const response = await fetch('./users.json')
   // const users = await response.json()
   // return users
   // fetch('data/users.json').then((response) => {
   //    console.log(response)
   // })
   // console.log(response)
}

// document.addEventListener('DOMContentLoaded', async () => {
//    let users = []

//    try {
//       users = await loadUsers()
//    } catch (e) {
//       console.log('Error!')
//       console.log(e)
//    }
//    console.log(users)
// })

loadUsers().then((jsonData) => console.log(jsonData))
