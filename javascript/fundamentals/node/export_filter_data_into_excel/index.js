const exportUsersToExcel = require('./exportService')

const users = [
   {
      id: 0,
      name: 'Peter',
      age: 31
   },
   {
      id: 1,
      name: 'John',
      age: 23
   },
   {
      id: 2,
      name: 'Peter',
      age: 21
   },
   {
      id: 3,
      name: 'Shaw',
      age: 28
   }
]

const workSheetColumnName = ['ID', 'Name', 'Age']

const filterdUsers = users.filter((user) => {
   return user.name == 'Peter'
})

const workSheetName = 'Users'
const filePath = './excel-from-js.xlsx'
const filepath2 = './filter-excel-js.xlsx'

exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath)
exportUsersToExcel(filterdUsers, workSheetColumnName, workSheetName, filepath2)
