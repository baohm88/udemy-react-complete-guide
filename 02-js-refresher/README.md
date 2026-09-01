# 📚 Section 02: JavaScript Refresher - Tổng Hợp Kiến Thức Cốt Lõi Cho React

> Khóa học: **[React - The Complete Guide (incl. Next.js, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)** - Giảng viên: Maximilian Schwarzmüller.

Tài liệu này tổng hợp toàn bộ các khái niệm JavaScript hiện đại (ES6+) được học trong Section 2, kèm theo code minh họa và mối liên hệ thực tế khi áp dụng vào React.

---

## 📑 Mục Lục
1. [Import & Export (ES Modules)](#1-import--export-es-modules)
2. [Khai báo biến: `const` & `let`](#2-khai-báo-biến-const--let)
3. [Arrow Functions (Hàm mũi tên)](#3-arrow-functions-hàm-mũi-tên)
4. [Objects & Classes](#4-objects--classes)
5. [Arrays & Các hàm xử lý mảng (Quan trọng)](#5-arrays--các-hàm-xử-lý-mảng-quan-trọng)
6. [Destructuring (Phân rã mảng & Object)](#6-destructuring-phân-rã-mảng--object)
7. [Spread & Rest Operator (`...`)](#7-spread--rest-operator-)
8. [Cấu trúc điều khiển & Vòng lặp](#8-cấu-trúc-điều-khiển--vòng-lặp)
9. [Truyền hàm như một giá trị (Callbacks & Event Handlers)](#9-truyền-hàm-như-một-giá-trị-callbacks--event-handlers)
10. [Nested Functions & Closures](#10-nested-functions--closures)
11. [Tham Trị (Primitive) vs Tham Chiếu (Reference)](#11-tham-trị-primitive-vs-tham-chiếu-reference)

---

## 1. Import & Export (ES Modules)
Chia nhỏ code thành nhiều file độc lập để dễ quản lý.

### 🔹 Named Export (Export có tên)
Cho phép export nhiều biến/hàm từ một file. Khi import bắt buộc phải đặt trong cặp ngoặc `{}` và đúng tên.

```javascript
// utils.js
export const apiKey = 'abcd1234';
export const apiSecret = 'secret999';

// app.js
import { apiKey, apiSecret } from './utils.js';
// Đổi tên khi import bằng `as`
import { apiKey as key } from './utils.js';
// Import tất cả dưới dạng một object
import * as utils from './utils.js';
console.log(utils.apiKey);
```

### 🔹 Default Export (Export mặc định)
Mỗi file chỉ được có **duy nhất 1** `export default`. Khi import không dùng `{}` và có thể tự do đặt tên.

```javascript
// utils.js
export default 'abcd1234';

// app.js
import myApiKey from './utils.js';
```

> 💡 **Ứng dụng trong React:** Mỗi React Component thường được `export default ComponentName`, còn các helper/hook tiện ích thường dùng `Named Export`.

---

## 2. Khai báo biến: `const` & `let`

* **`const`** (Hằng số): Dùng cho các giá trị **không bị gán lại** (`re-assigned`). *Nên ưu tiên dùng mặc định.*
* **`let`**: Dùng cho các biến có giá trị sẽ thay đổi theo thời gian.
* **`var`**: Tránh sử dụng vì có phạm vi hàm (`function scope`) và cơ chế hoisting dễ gây lỗi.

```javascript
const userName = 'Bảo';
// userName = 'Hà'; // ❌ Lỗi: Assignment to constant variable.

let age = 30;
age = 37; // ✅ Hợp lệ
```

---

## 3. Arrow Functions (Hàm mũi tên)
Cú pháp ngắn gọn hơn để định nghĩa hàm, không bind lại từ khóa `this`.

```javascript
// Cú pháp chuẩn
const greetUser = (name, message) => {
  return `Hi ${name}, ${message}`;
};

// Rút gọn khi chỉ có 1 tham số (bỏ ngoặc tròn)
const double = num => num * 2;

// Rút gọn khi chỉ có 1 câu lệnh return (bỏ ngoặc nhọn và từ khóa return)
const add = (a, b) => a + b;

// Trả về một Object literal rút gọn (cần bọc trong ngoặc tròn)
const createItem = text => ({ id: Math.random(), text: text });
```

> 💡 **Ứng dụng trong React:** Arrow functions được dùng để viết Functional Components và inline Event Handlers:
> ```jsx
> <button onClick={() => handleClick(id)}>Delete</button>
> ```

---

## 4. Objects & Classes

### 🔹 Object Literals
Tập hợp các cặp `key: value` và phương thức (`methods`).

```javascript
const user = {
  name: 'Bao',
  age: 37,
  greet() {
    console.log(`Hello, I am ${this.name}, ${this.age} years old.`);
  }
};

user.greet();
```

### 🔹 Classes & Constructor
Dùng làm khuôn mẫu để tạo đối tượng (Object Blueprint).

```javascript
class User {
  constructor(name = 'Bảo', age = 30) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, my name is ${this.name}`);
  }
}

const user1 = new User('Bảo', 37);
user1.greet();
```

---

## 5. Arrays & Các hàm xử lý mảng (Quan trọng)

Các hàm xử lý mảng trả về mảng mới mà không làm biến đổi mảng gốc (cực kỳ quan trọng trong React để duy trì tính bất biến - Immutability).

### 🔹 `map()`: Biến đổi từng phần tử thành phần tử mới
```javascript
const hobbies = ['cooking', 'fishing', 'hiking'];

const formattedHobbies = hobbies.map(item => 'I like ' + item);
// ['I like cooking', 'I like fishing', 'I like hiking']

const hobbyObjects = hobbies.map(item => ({ text: item }));
// [{ text: 'cooking' }, { text: 'fishing' }, { text: 'hiking' }]
```
> 💡 **Trong React:** `map()` là cách chính thống để render danh sách phần tử JSX:
> ```jsx
> <ul>
>   {hobbies.map(hobby => <li key={hobby}>{hobby}</li>)}
> </ul>
> ```

### 🔹 `findIndex()` & `find()`: Tìm vị trí hoặc phần tử thỏa điều kiện
```javascript
const index = hobbies.findIndex(item => item === 'hiking'); // 2
const foundItem = hobbies.find(item => item === 'fishing'); // 'fishing'
```

### 🔹 `filter()`: Lọc các phần tử thỏa mãn điều kiện
```javascript
const shortHobbies = hobbies.filter(item => item.length <= 7);
```

---

## 6. Destructuring (Phân rã mảng & Object)

Trích xuất nhanh các giá trị từ mảng hoặc thuộc tính của object ra các biến riêng biệt.

### 🔹 Array Destructuring (Phân rã mảng - Theo thứ tự vị trí)
```javascript
const [firstName, lastName] = ['Bao', 'Ha'];
console.log(firstName); // 'Bao'
console.log(lastName);  // 'Ha'
```
> 💡 **Ứng dụng trong React:** Hook `useState` trả về một mảng gồm `[giá_trị_state, hàm_cập_nhật]`:
> ```javascript
> const [count, setCount] = useState(0);
> ```

### 🔹 Object Destructuring (Phân rã Object - Theo tên thuộc tính)
```javascript
const user = { name: 'Bao', age: 37 };

// Trích xuất đúng tên property
const { name, age } = user;

// Đổi tên biến với cú pháp `propertyName: newVariableName`
const { name: userName, age: userAge } = user;
```
> 💡 **Ứng dụng trong React:** Phân rã `props` trực tiếp trong tham số Component:
> ```jsx
> function UserProfile({ name, age }) {
>   return <h1>{name} ({age})</h1>;
> }
> ```

---

## 7. Spread & Rest Operator (`...`)

Dấu `...` có 2 vai trò tùy theo ngữ cảnh sử dụng:

### 🔹 Spread Operator (Trải rộng các phần tử)
Sao chép hoặc hợp nhất các mảng và object sang một bản sao mới:

```javascript
// Trải rộng mảng (Merge Arrays)
const hobbies = ['sports', 'cooking'];
const newHobbies = ['reading'];
const mergedHobbies = [...hobbies, ...newHobbies]; // ['sports', 'cooking', 'reading']

// Trải rộng Object (Clone & Extend Object)
const user = { name: 'Bao', age: 37 };
const extendedUser = { ...user, isAdmin: true };
// { name: 'Bao', age: 37, isAdmin: true }
```

### 🔹 Rest Parameters (Gom các tham số còn lại)
Gom các đối số truyền vào thành một mảng:

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
sum(1, 2, 3, 4); // 10
```

---

## 8. Cấu trúc điều khiển & Vòng lặp

### 🔹 If / Else & Ternary Operator (Toán tử 3 ngôi)
```javascript
const isLoggedIn = true;
const message = isLoggedIn ? 'Welcome back!' : 'Please log in';
```

### 🔹 Vòng lặp `for...of` & `forEach`
```javascript
const hobbies = ['cooking', 'reading'];

// forEach
hobbies.forEach(hobby => console.log(hobby));

// for...of (dùng cho mảng, iterable)
for (const hobby of hobbies) {
  console.log('I like ' + hobby);
}
```

---

## 9. Truyền hàm như một giá trị (Callbacks & Event Handlers)

Trong JS, hàm là **First-Class Citizens** (có thể gán vào biến, truyền làm tham số cho hàm khác).

```javascript
function handleTimeout() {
  console.log('Timed out!');
}

// Truyền tên hàm (không kèm dấu ngoặc tròn ())
setTimeout(handleTimeout, 2000);

// Truyền trực tiếp Arrow function (Anonymous Callback)
setTimeout(() => {
  console.log('Timed out again!');
}, 3000);

// Hàm nhận một hàm khác làm tham số
function greeter(greetFn) {
  greetFn();
}
greeter(() => console.log('Hi there!'));
```

> ⚠️ **Lưu ý trong React:** 
> * `<button onClick={handleClick}>` ➔ Đúng (truyền con trỏ hàm).
> * `<button onClick={handleClick()}>` ➔ Sai (hàm sẽ bị thực thi ngay khi component render).

---

## 10. Nested Functions & Closures

Hàm có thể được định nghĩa bên trong một hàm khác và có quyền truy cập vào các biến của hàm cha (Closure).

```javascript
function init() {
  const message = 'Hello from init!';
  
  function greet() {
    console.log(message); // Truy cập biến của scope bên ngoài
  }

  greet();
}

init();
```

---

## 11. Tham Trị (Primitive) vs Tham Chiếu (Reference)

Khái niệm cốt lõi giải thích vì sao React cần cơ chế cập nhật State bất biến (Immutability).

| Tiêu chí | Kiểu Tham Trị (Primitive) | Kiểu Tham Chiếu (Reference) |
| :--- | :--- | :--- |
| **Kiểu dữ liệu** | `string`, `number`, `boolean`, `null`, `undefined`, `symbol` | `Object`, `Array`, `Function` |
| **Lưu trữ** | Lưu trực tiếp giá trị vào bộ nhớ stack. | Lưu địa chỉ con trỏ trỏ tới vùng nhớ heap. |
| **Khi gán / sao chép** | Tạo bản sao độc lập của giá trị. | Sao chép **địa chỉ con trỏ**, cả hai cùng trỏ về 1 vùng nhớ. |

### 🔍 Minh họa:
```javascript
// 1. Primitive: Giá trị độc lập
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (không đổi)

// 2. Reference: Chung vùng nhớ
const hobbies = ['Sports', 'Cooking'];
const copiedHobbies = hobbies; // Chỉ sao chép địa chỉ
copiedHobbies.push('Reading');
console.log(hobbies); // ['Sports', 'Cooking', 'Reading'] (BỊ THAY ĐỔI THEO!)

// 3. Cách sao chép đúng trong React (Tạo mảng/object mới với Spread Operator):
const safeNewHobbies = [...hobbies, 'Gaming'];
```

> 🌟 **Tại sao React quan tâm đến điều này?**
> React so sánh state cũ và mới bằng **địa chỉ tham chiếu** (shallow comparison). Nếu bạn thay đổi trực tiếp mảng/object cũ (`state.push(...)`), địa chỉ vùng nhớ không đổi ➔ React không nhận ra thay đổi và **sẽ không re-render giao diện**. Do đó luôn dùng `[...oldArray]` hoặc `{...oldObj}` khi cập nhật state.

---

Chúc bạn học tốt các phần tiếp theo của khóa học React! 🚀
