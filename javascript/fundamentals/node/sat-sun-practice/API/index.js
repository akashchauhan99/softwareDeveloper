const bioData = {
   name: 'Akash',
   age: 22
}

// console.log(bioData.age)
// console.log(bioData.name)

const jsonData = JSON.stringify(bioData)
console.log(jsonData)

const objData = JSON.parse(jsonData)
console.log(objData)
console.log(objData.age)
