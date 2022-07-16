const getBtn = document.getElementById('get-btn')
const postBtn = document.getElementById('post-btn')

//It takes the post and get method
const sendHttpRequest = (method, url, data) => {
   return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { 'Content-Type': 'application/json' } : {}
   }).then((response) => {
      if (response.status >= 400) {
         // !response.ok
         return response.json().then((errResData) => {
            const error = new Error('Something went Wrong')
            error.data = errResData
            throw error
         })
      }
      return response.json()
   })
}

//It's for get
const getData = () => {
   sendHttpRequest('GET', 'https://reqres.in/api/users').then(
      (responseData) => {
         console.log(responseData)
      }
   )
}

//It's for post
const sendData = () => {
   sendHttpRequest('POST', 'https://reqres.in/api/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
   })
      .then((responseData) => {
         console.log(responseData)
      })
      .catch((err) => {
         console.log(err, err.data)
      })
}

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', sendData)
