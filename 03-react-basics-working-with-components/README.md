# 📚 Section 03: React Basics & Working with Components - Tổng Hợp Kiến Thức Cốt Lõi

> Khóa học: **[React - The Complete Guide (incl. Next.js, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)** - Giảng viên: Maximilian Schwarzmüller.

Tài liệu này tổng hợp toàn bộ các khái niệm nền tảng của React được thực hành trong dự án **React Essentials** (Section 3 & 4), kèm code minh họa chi tiết, best practices và các mẫu thiết kế component (Component Patterns) hiện đại.

---

## 📑 Mục Lục

1. [Cấu Trúc Dự Án (Project Structure)](#1-cấu-trúc-dự-án-project-structure)
2. [Components & Cú Pháp JSX](#2-components--cú-pháp-jsx)
3. [Tổ Chức File & Component Architecture](#3-tổ-chức-file--component-architecture)
4. [Props (Truyền & Quản Lý Dữ Liệu)](#4-props-truyền--quản-lý-dữ-liệu)
5. [Event Handling & Truyền Hàm Làm Props](#5-event-handling--truyền-hàm-làm-props)
6. [State Management Với `useState`](#6-state-management-với-usestate)
7. [Conditional Rendering (Render Theo Điều Kiện)](#7-conditional-rendering-render-theo-điều-kiện)
8. [List Rendering & `key` Prop](#8-list-rendering--key-prop)
9. [Forwarding Props / Proxy Props Pattern (`...props`)](#9-forwarding-props--proxy-props-pattern-props)
10. [Setting Component Types Dynamically](#10-setting-component-types-dynamically)
11. [Multiple Component Slots Pattern](#11-multiple-component-slots-pattern)
12. [Hướng Dẫn Cài Đặt & Khởi Chạy Dự Án](#12-hướng-dẫn-cài-đặt--khởi-chạy-dự-án)

---

## 1. Cấu Trúc Dự Án (Project Structure)

Dự án được xây dựng bằng **Vite + React**, phân tách rõ ràng giữa các UI components, dữ liệu tĩnh và styles:

```text
03-react-basics-working-with-components/
├── public/
├── src/
│   ├── assets/                  # Hình ảnh minh họa tĩnh (png, svg)
│   ├── components/              # Các UI Components tái sử dụng
│   │   ├── CoreConcepts.jsx     # Section danh sách Core Concepts
│   │   ├── CoreConcept.jsx      # Từng thẻ Card Core Concept
│   │   ├── CoreConcept.css      # Style riêng cho Core Concept
│   │   ├── Examples.jsx         # Section demo ví dụ & điều khiển Tabs
│   │   ├── Header.jsx           # Header của ứng dụng
│   │   ├── Header.css           # Style cho Header
│   │   ├── Section.jsx          # Wrapper component bọc thẻ <section>
│   │   ├── TabButton.jsx        # Nút tab tùy biến với Forwarded Props
│   │   └── Tabs.jsx             # Component quản lý layout Tabs & Dynamic Container
│   ├── data.js                  # Dữ liệu tĩnh (CORE_CONCEPTS, EXAMPLES)
│   ├── App.jsx                  # Root Component định hình bố cục chính
│   ├── index.css                # Global Styles & Typography
│   └── index.jsx                # Entry point render ứng dụng vào root DOM
├── index.html                   # File HTML gốc
├── vite.config.js               # Cấu hình Vite (Port 3000, tự mở Chrome)
└── package.json                 # Khai báo dependencies và scripts
```

---

## 2. Components & Cú Pháp JSX

### 🔹 Functional Components

Component trong React thực chất là các JavaScript function trả về mã JSX đại diện cho giao diện người dùng.

- **Quy tắc bắt buộc:** Tên Component phải viết hoa chữ cái đầu (**PascalCase**), ví dụ: `Header`, `CoreConcept`, `TabButton`.
- Mỗi component chỉ trả về một phần tử gốc (Root Element) hoặc bọc trong React Fragment `<> ... </>`.

```jsx
export default function Header() {
  return (
    <header>
      <h1>React Essentials</h1>
    </header>
  );
}
```

### 🔹 Cú pháp JSX (JavaScript XML)

Cho phép viết code giống HTML ngay trong file JavaScript.

- **Thẻ tự đóng:** Tất cả các thẻ rỗng (không có thẻ đóng) bắt buộc phải có dấu gạch chéo tự đóng: `<img ... />`, `<input ... />`, `<br />`.
- **Thuộc tính chuẩn JSX:** Dùng `className` thay cho `class`, `htmlFor` thay cho `for`.
- **Nhúng biểu thức JavaScript:** Sử dụng cặp ngoặc nhọn `{}` để nhúng biến, chuỗi, phép toán hoặc lời gọi hàm vào JSX:

```jsx
const title = "React Essentials";

export default function Header() {
  return (
    <header>
      <img src={reactImg} alt="React logo" />
      <h1>{title}</h1>
      <p>{1 + 1} core concepts you need!</p>
    </header>
  );
}
```

---

## 3. Tổ Chức File & Component Architecture

Nhằm tối ưu khả năng **tái sử dụng**, **bảo trì** và **mở rộng**, ứng dụng tuân theo kiến trúc Component-Driven:

- **Single Responsibility Principle (Đơn nhiệm):** Mỗi component chỉ phụ trách một phần giao diện hoặc một khối logic độc lập.
- **Tách nhỏ từ `App.jsx`:** `App.jsx` không chứa state phức tạp hay markup dài dòng, chỉ đóng vai trò container chứa các section chính:

```jsx
// App.jsx tinh gọn
import CoreConcepts from "./components/CoreConcepts";
import Examples from "./components/Examples";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
```

> 💡 **Lưu ý về Naming Convention & Case Sensitivity:**
> Luôn đặt tên file component trùng khớp với tên hàm export (ví dụ `CoreConcept.jsx` export `CoreConcept`). Tránh lỗi lệch chữ hoa/thường (`Coreconcept` vs `CoreConcept`) vì hệ điều hành Linux trên server deploy (Vercel, Netlify) phân biệt chữ hoa thường rất nghiêm ngặt.

---

## 4. Props (Truyền & Quản Lý Dữ Liệu)

Props (Properties) là cơ chế truyền dữ liệu một chiều từ component cha xuống component con.

### 🔹 Truyền Props thông thường

```jsx
<CoreConcept
  title="Components"
  description="The core UI building block"
  image={componentsImg}
/>
```

### 🔹 Destructuring Props (Khuyên dùng)

Trích xuất trực tiếp các trường dữ liệu ngay tại danh sách tham số để code ngắn gọn, tường minh:

```jsx
function CoreConcept({ title, description, image }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
```

### 🔹 Spread Props (`{...object}`)

Khi các thuộc tính của object khớp với tên props của component, sử dụng toán tử spread để truyền nhanh toàn bộ object:

```jsx
{
  CORE_CONCEPTS.map((concept) => (
    <CoreConcept key={concept.title} {...concept} />
  ));
}
```

### 🔹 Special Prop `children` (Component Composition)

Prop đặc biệt đại diện cho nội dung nằm giữa thẻ mở và thẻ đóng của component:

```jsx
// Định nghĩa component
export default function TabButton({ children }) {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
}

// Sử dụng
<TabButton>Components</TabButton>;
```

---

## 5. Event Handling & Truyền Hàm Làm Props

Trong React, sự kiện được đặt tên theo chuẩn camelCase (`onClick`, `onChange`, `onSubmit`).

### 🔹 Truyền con trỏ hàm (Function Reference)

```jsx
function handleClick() {
  console.log("Clicked!");
}

// ✅ Đúng: Truyền tham chiếu hàm
<button onClick={handleClick}>Click me</button>

// ❌ Sai: Thực thi hàm ngay khi render
<button onClick={handleClick()}>Click me</button>
```

### 🔹 Truyền tham số cho Event Handler bằng Arrow Function

Khi cần truyền tham số cụ thể vào hàm xử lý sự kiện:

```jsx
<TabButton onClick={() => handleSelect("components")}>Components</TabButton>
```

---

## 6. State Management Với `useState`

Biến JavaScript thông thường thay đổi giá trị sẽ **không** làm component render lại giao diện. Muốn UI cập nhật theo dữ liệu, bắt buộc phải dùng **State**.

```jsx
import { useState } from "react";

export default function Examples() {
  // Khai báo state: [giá_trị_hiện_tại, hàm_cập_nhật_state]
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton); // Kích hoạt React re-render component
  }

  return (
    // ...
  );
}
```

> ⚠️ **Quy tắc của React Hooks:**
>
> 1. Chỉ gọi hook ở cấp cao nhất của component function (không đặt trong vòng lặp `for`, câu lệnh `if`, hoặc nested function).
> 2. Chỉ gọi hook bên trong React Component hoặc Custom Hook.

---

## 7. Conditional Rendering (Render Theo Điều Kiện)

Hiển thị nội dung linh hoạt dựa trên trạng thái của state `selectedTopic`.

### 🔹 Cách 1: Biến trung gian với câu lệnh `if` (Dễ đọc nhất)

```jsx
let tabContent = <p>Please select a topic.</p>;

if (selectedTopic) {
  tabContent = (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>{EXAMPLES[selectedTopic].code}</code>
      </pre>
    </div>
  );
}

return <div>{tabContent}</div>;
```

### 🔹 Cách 2: Toán tử ba ngôi (Ternary Operator)

```jsx
{
  !selectedTopic ? (
    <p>Please select a topic.</p>
  ) : (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
    </div>
  );
}
```

### 🔹 Cách 3: Toán tử logic AND (`&&`)

```jsx
{
  !selectedTopic && <p>Please select a topic.</p>;
}
{
  selectedTopic && (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
    </div>
  );
}
```

---

## 8. List Rendering & `key` Prop

Sử dụng phương thức `.map()` của Array để chuyển đổi danh sách dữ liệu thành các phần tử JSX.

```jsx
<section id="core-concepts">
  <h2>Core Concepts</h2>
  <ul>
    {CORE_CONCEPTS.map((concept) => (
      <CoreConcept key={concept.title} {...concept} />
    ))}
  </ul>
</section>
```

> 🌟 **Tại sao `key` prop lại bắt buộc?**
>
> - `key` giúp React nhận diện duy nhất từng phần tử trong danh sách ảo (Virtual DOM).
> - Khi danh sách thay đổi (thêm, sửa, xóa, sắp xếp lại), React chỉ cập nhật đúng phần tử có `key` thay đổi thay vì phải render lại toàn bộ danh sách, tối ưu hóa hiệu năng đáng kể.
> - Giá trị của `key` phải là duy nhất và ổn định (thường là `id` hoặc chuỗi độc nhất như `title`).

---

## 9. Forwarding Props / Proxy Props Pattern (`...props`)

Khi tạo Wrapper Component (như `Section` hoặc `TabButton`), thay vì phải liệt kê thủ công từng thuộc tính (`id`, `className`, `onClick`, `style`, `disabled`...), ta gom toàn bộ các props còn lại bằng **Rest Parameter (`...props`)** và trải rộng vào thẻ gốc bằng **Spread Operator**.

### 🔹 Áp dụng vào `Section.jsx`:

```jsx
export default function Section({ title, children, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

### 🔹 Áp dụng vào `TabButton.jsx`:

```jsx
export default function TabButton({ children, isSelected, ...props }) {
  return (
    <li>
      <button className={isSelected ? "active" : undefined} {...props}>
        {children}
      </button>
    </li>
  );
}
```

_👉 Bây giờ `TabButton` nhận trực tiếp sự kiện chuẩn `onClick`, `disabled`, `aria-_`như một thẻ`<button>` HTML nguyên bản mà không cần viết thêm code thừa.\*

---

## 10. Setting Component Types Dynamically

Cho phép component cha quyết định thẻ HTML hoặc custom component nào sẽ bọc bên ngoài nội dung.

### 🔑 Quy tắc cốt lõi:

- Tên thẻ **viết thường** (`<menu>`, `<div>`): React coi đó là thẻ HTML có sẵn.
- Tên thẻ **viết hoa chữ cái đầu** (`<ButtonContainer>`): React hiểu đó là một component function hoặc biến chứa component.

### 🔹 Định nghĩa trong `Tabs.jsx`:

```jsx
export default function Tabs({ children, buttons, ButtonContainer = "menu" }) {
  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>
  );
}
```

### 🔹 Sử dụng linh hoạt:

```jsx
{/* Sử dụng thẻ <menu> mặc định */}
<Tabs buttons={...}>{tabContent}</Tabs>

{/* Tùy biến thành thẻ <ul> */}
<Tabs ButtonContainer="ul" buttons={...}>{tabContent}</Tabs>

{/* Hoặc truyền một Custom Component: ButtonContainer={CustomContainer} */}
```

---

## 11. Multiple Component Slots Pattern

Thông thường một component dùng `children` để nhận nội dung. Khi cần đặt nội dung vào nhiều vị trí khác nhau trong layout (Multiple Slots), ta có thể truyền JSX qua các props có tên riêng biệt:

```jsx
<Section id="examples" title="Examples">
  <Tabs
    // Slot 1: Nơi chứa danh sách nút bấm
    buttons={
      <>
        {Object.keys(EXAMPLES).map((topic) => (
          <TabButton
            key={topic}
            isSelected={selectedTopic === topic}
            onClick={() => handleSelect(topic)}
          >
            {EXAMPLES[topic].title}
          </TabButton>
        ))}
      </>
    }
  >
    {/* Slot 2: Nội dung tab (truyền qua children) */}
    <div id="tab-content">{tabContent}</div>
  </Tabs>
</Section>
```

---

## 12. Hướng Dẫn Cài Đặt & Khởi Chạy Dự Án

### 1. Cài đặt các thư viện phụ thuộc:

```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Dev Server):

```bash
npm run dev
```

- Máy chủ phát triển chạy tại: `http://localhost:3000`
- Tự động mở Google Chrome theo cấu hình đã tối ưu trong `vite.config.js`.

### 3. Build mã nguồn production:

```bash
npm run build
```

---

Chúc bạn học tốt các phần tiếp theo của khóa học React! 🚀
