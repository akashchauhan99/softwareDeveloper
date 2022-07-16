const exportUsersToExcel = require('./server');

const users = [
   {
      name: 'Akash'
   }
];

const workSheetColumnName = [
   "Name"
]

const workSheetName = 'Users';
const filePath = './excel-from-js.xlsx';

exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);