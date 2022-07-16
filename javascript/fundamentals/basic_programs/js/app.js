// Find index in multidimensional array
// const arr = [[1,2], [3,4], [8,6]]
// const d = arr.flat(1)
// console.log(d)
// for (const value of d) {
//     console.log(value);
//   }
// const obj = {
//     a: 10,
//     check: function(){
//         console.log('test')
//     }
// }
// console.log(JSON.stringify(arr));
// const val = JSON.stringify([3,4])

// console.log("Welcome to Programiz!", arr.findIndex(d => JSON.stringify(d)===val));
let x= {}, y = {name:"Ronny"},z = {name:"John"};
x[y] = {name:"Vivek"};
x[z] = {name:"Akki"};
console.log(x[y]);
