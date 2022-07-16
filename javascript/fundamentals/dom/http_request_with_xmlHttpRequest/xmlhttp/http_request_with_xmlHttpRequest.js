const getBTn = document.getElementById('get-btn')
const postBtn = document.getElementById('post-btn')

const request = new XMLHttpRequest()
request.open('GET', 'https://jsonplaceholder.typicode.com/todos/')
request.send()

getBTn.addEventListener('click', () => {
   if (request.readyState === 4) {
      console.log(request.responseText)
   }
})
