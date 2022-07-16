var selectRow = null // selecing row

function onFormSubmit() {
   //formdata is used to read data which is comming from input
   let formData = readFormData()
   if (selectRow == null) {
      // it'll insert data into table
      insertNewData(formData)
   } else {
      // it'll update saved data
      updateRecord(formData)
   }
   // it's used to reset the form's value
   resetForm()
}

// It'll read data from input
function readFormData() {
   let formData = {}
   formData['fname'] = document.getElementById('fname').value
   formData['lname'] = document.getElementById('lname').value
   formData['age'] = document.getElementById('age').value
   formData['email'] = document.getElementById('email').value
   return formData
}

// it'll insert data into table
function insertNewData(data) {
   let table = document
      .getElementById('formList')
      .getElementsByTagName('tbody')[0]
   let newRow = table.insertRow(table.length)
   cell1 = newRow.insertCell(0)
   cell1.innerHTML = data.fname
   cell2 = newRow.insertCell(1)
   cell2.innerHTML = data.lname
   cell3 = newRow.insertCell(2)
   cell3.innerHTML = data.age
   cell4 = newRow.insertCell(3)
   cell4.innerHTML = data.email
   cell1 = newRow.insertCell(4)
   cell1.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                      <a onClick="onDelete(this)">Delete</a>`
}

// it'll reset the form
function resetForm() {
   document.getElementById('fname').value = ''
   document.getElementById('lname').value = ''
   document.getElementById('age').value = ''
   document.getElementById('email').value = ''

   selectRow = null
}

// it's used to put data into form for update
function onEdit(td) {
   selectRow = td.parentElement.parentElement
   document.getElementById('fname').value = selectRow.cells[0].innerHTML
   document.getElementById('lname').value = selectRow.cells[1].innerHTML
   document.getElementById('age').value = selectRow.cells[2].innerHTML
   document.getElementById('email').value = selectRow.cells[3].innerHTML
}

// it'll update the data
function updateRecord(formData) {
   selectRow.cells[0].innerHTML = formData.fname
   selectRow.cells[1].innerHTML = formData.lname
   selectRow.cells[2].innerHTML = formData.age
   selectRow.cells[3].innerHTML = formData.email
}

// it'll delete the data
function onDelete(td) {
   if (confirm('Are you sure to delete this record?')) {
      row = td.parentElement.parentElement
      document.getElementById('formList').deleteRow(row.rowIndex)
      resetForm()
   }
}
