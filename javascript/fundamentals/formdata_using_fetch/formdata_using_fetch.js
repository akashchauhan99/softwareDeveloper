const exampleForm = document.getElementById('example-form')
// exampleForm.addEventListener('submit', handleFormSubmit)

const getBtn = document.getElementById('get-btn')
const postBtn = document.getElementById('post-btn')

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

const getData = () => {
   sendHttpRequest('GET', './users.json').then((responseData) => {
      console.log(responseData)
   })
}

const sendData = (e) => {
   e.preventDefault()
   const obj = {}
   const form = new FormData(exampleForm)
   form.forEach((value, key) => (obj[key] = value))
   let res = JSON.stringify(obj)
   sendHttpRequest('POST', './users,json', { res })
      .then((responseData) => {
         console.log(responseData)
      })
      .catch((err) => {
         console.log(err, err.data)
      })
}

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', sendData)

// async function handleFormSubmit(event) {
//    event.preventDefault()
//    const form = event.currentTarget

//    // const url = form.action
//    const url =
//       '/home/user/practice/javascript/fundamentals/dom/http_request_with_xmlHttpRequest/formdata_using_fetch/users.json'

//    try {
//       const formData = new FormData(form)
//       const responseData = await postFormDataAsJson({ url, formData })

//       console.log({ responseData })
//    } catch (error) {
//       console.error(error)
//    }
// }

// async function postFormDataAsJson({ url, formData }) {
//    const plainFormData = Object.fromEntries(formData.entries())
//    const fromDataJsonString = JSON.stringify(plainFormData)

//    const fetchOptions = {
//       method: 'POST',
//       headers: {
//          'content-type': 'application/json',
//          Accept: 'application/json'
//       },
//       body: fromDataJsonString
//    }
//    const response = await fetch(url, fetchOptions)

//    if (!response.ok) {
//       const errorMessage = await response.text()
//       throw new Error(errorMessage)
//    }

//    return response.json
// }
