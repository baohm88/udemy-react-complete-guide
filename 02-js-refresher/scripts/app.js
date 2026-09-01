// import { apiKey } from "./utils.js";
// import apiKey, {abc as content} from "./utils.js";
// console.log(apiKey);
// alert(`hello, this is apiKey : ${content}`)

// VARs
// const userMessage = 'hi there'
// console.log(userMessage);

// OPERATORS
// alert(5 === 6)


// FUNCTIOINS
// function greetUser(userName, message) {
//   console.log(userName)
//   console.log(message)
// }
//
//
// greetUser('Bao', 'hello world!');


// RETURN functions
// function createGreating(userName, message = 'Hello') {
//     return `hi ${userName}. ${message}`
// }
//
//
// const greetinging1 = createGreating ('Bao')
//
// const greetinging2 = createGreating ('Trang', 'Hi there!')
// console.log(greetinging1)
// console.log(greetinging2)


// ARROW functions
// const greetUser = (name, message) => {
//   console.log('hi ' + name)
//   console.log(message)
// } 
//
// greetUser('Bảo', 'Xin chào!')


// OBJECTS
// const user = {
//   name: 'Bao',
//   age: 37,
//   greet() {
//     console.log('hello there');
//     console.log(this.age);
    
//   }
// }

// console.log(user.name);
// console.log(user.age);
// console.log(user.greet());

// CLASSS
// class User{
//   constructor(name = 'Bao', age=30) {
//     this.name = name
//     this.age = age
//   }

//   greet() {
//     console.log('hi there');
    
//   }
// }

// const user1 = new User('Bảo', 37)
// console.log(user1.name);
// console.log(user1.age);
// console.log(user1.greet());


// ARRAY & ARRAY METHODS
// const hobbies = ['cooking', 'fishing', 'hiking']
// console.log(hobbies[0]);

// hobbies.push('working')
// for (let i = 0; i < hobbies.length; i++) {
//   console.log(hobbies[i]);
// }

// console.log('--------------------------');
// const index = hobbies.findIndex(item => item === 'hiking')
// console.log(index);

// hobbies.map(item => console.log('I like ' + item))

// const newHobbies = hobbies.map(item => ({text: item}))
// console.log(newHobbies);

// DESTRUCTURING
// const userNameData = ['Bao', 'Ha']
// const firstName = userNameData[0]
// const lastName = userNameData[1]
// console.log(firstName);
// console.log(lastName);

// const [firstName, lastName] = ['Bao', 'Ha']
// console.log(firstName);
// console.log(lastName);

// const {name: userName, age: userAge} = {name: "Bao", age: 37}
// console.log(userName);
// console.log(userAge);


// SPREAD OPERATORS
// const hobbies = ['sports', 'cooking']
// const user = {name: 'Bao', age: 37}

// const newHobbies = ['reading']
// const mergedHobbiesl = [...hobbies, ...newHobbies]
// console.log(mergedHobbiesl);

// const extendedUser = {...user, isAdmin: true}
// console.log(extendedUser);


// CONTROL STATEMENTS
// const password = prompt('your password')
// if (password === 'Hello') {
//   console.log('access granted');
// } else if (password === 'hello') {
//   console.log('access granted');
// } else {
//   console.log('access denied');
// }

// const hobbies = ['cooking', 'reading']
// hobbies.forEach(hobby => {
//   console.log(hobby);
// });

// for (const hobby of hobbies) {
//   console.log('i like ' + hobby);
// }

// for (const hobby in hobbies) {
//   console.log('i like ' + hobby);
// }

// function handleTimeout() {
//   console.log('Timed out!')
// }
//
// const handleTimeout2 = () => {
//   console.log('Timed out ... again!')
// }
//
// setTimeout(handleTimeout, 2000)
// setTimeout(handleTimeout2, 3000)
// setTimeout(() => {
//   console.log('more timeing out...')
// }, 4000);
//
// function greeter(greetFn) {
//  greetFn()
// }
//
// greeter(() =>  console.log('hi there'))
//

// function init() {
//  function greet() {
//   console.log('hi there from init()')
//   }

//   greet()
// }

// init()


// REF VS PREMITIVE
