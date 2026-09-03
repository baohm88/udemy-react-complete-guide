# React Essentials - Core Concepts & Basics

Dự án mẫu thực hành các kiến thức nền tảng trong React từ khóa học **React - The Complete Guide (Udemy)**.

---

## 📁 Cấu trúc thư mục dự án

```text
src/
├── assets/                  # Chứa hình ảnh tĩnh
├── components/              # Các UI Components tái sử dụng
│   ├── CoreConcepts.jsx     # Section chứa danh sách Core Concepts
│   ├── CoreConcept.jsx      # Từng item Card Core Concept
│   ├── CoreConcept.css      # Style cho Core Concept
│   ├── Examples.jsx         # Section chứa nội dung Examples và Tabs
│   ├── Header.jsx           # Header của ứng dụng
│   ├── Header.css           # Style cho Header
│   ├── Section.jsx          # Wrapper component cho các thẻ <section>
│   └── TabButton.jsx        # Nút tab tuỳ biến sử dụng Forwarded Props
├── data.js                  # Dữ liệu mẫu (CORE_CONCEPTS, EXAMPLES)
├── App.jsx                  # Component gốc kết nối toàn bộ layout
├── index.css                # Style chung toàn ứng dụng
└── index.jsx                # Entry point render ứng dụng vào DOM
```

---

## 📚 Tổng hợp kiến thức React trong dự án

### 1. Component & JSX
* **Function Component**: Là một JavaScript function trả về mã JSX (giao diện). Tên component bắt buộc phải viết hoa chữ cái đầu (PascalCase), ví dụ: `Header`, `Coreconcepts`, `TabButton`.
* **JSX (JavaScript XML)**: Cho phép viết cú pháp giống HTML bên trong JavaScript.
  * Mọi thẻ không có thẻ đóng bắt buộc phải tự đóng: `<img ... />`, `<input ... />`.
  * Dùng `className` thay vì `class` trong HTML.
  * Dùng cặp ngoặc nhọn `{}` để nhúng bất kỳ biểu thức JavaScript nào vào JSX (biến, hàm, toán tử logic, toán học).

---

### 2. Props (Truyền và quản lý dữ liệu giữa các Component)
Props (Properties) là cơ chế truyền dữ liệu từ component cha xuống component con (Data Flow một chiều).

* **Truyền Props thông thường:**
  ```jsx
  <Coreconcepts 
    title="Components" 
    description="The core UI building block" 
    image={componentsImg} 
  />
  ```

* **Destructuring Props:**
  Giúp code ngắn gọn thay vì phải dùng `props.title`, `props.image`:
  ```jsx
  function Coreconcepts({ title, description, image }) {
    return (
      <li>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    );
  }
  ```

* **Spread Props (`{...object}`):**
  Khi các thuộc tính của object trùng tên với props nhận vào:
  ```jsx
  {CORE_CONCEPTS.map((concept) => (
    <Coreconcepts key={concept.title} {...concept} />
  ))}
  ```

* **Special Prop `children` (Component Composition):**
  Cho phép truyền nội dung lồng nhau giữa thẻ mở và thẻ đóng của component.

* **Forwarding Props / Proxy Props Pattern (`...props`):**
  Truyền toàn bộ các props còn lại (như `id`, `className`, `onClick`, `disabled`,...) trực tiếp vào phần tử JSX gốc:
  ```jsx
  // Section.jsx
  export default function Section({ title, children, ...props }) {
    return (
      <section {...props}>
        <h2>{title}</h2>
        {children}
      </section>
    );
  }

  // TabButton.jsx
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

---

### 3. Event Handling (Xử lý sự kiện)
* Gán sự kiện trực tiếp vào thẻ JSX qua thuộc tính `onClick`, `onChange`,...
* Truyền tham số vào hàm xử lý sự kiện thông qua arrow function:
  ```jsx
  <TabButton
    isSelected={selectedTopic === topic}
    onClick={() => handleSelect(topic)}
  >
    {EXAMPLES[topic].title}
  </TabButton>
  ```

---

### 4. State Management với `useState`
* Biến thông thường khi thay đổi giá trị sẽ **không** làm component render lại giao diện.
* **`useState`** là một React Hook giúp lưu trữ trạng thái và yêu cầu React chạy lại (re-render) component khi state thay đổi:
  ```jsx
  import { useState } from "react";

  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton); // Cập nhật state -> component render lại
  }
  ```

---

### 5. Conditional Rendering (Render theo điều kiện)
Hiển thị giao diện khác nhau dựa trên trạng thái của dữ liệu.

* **Cách 1: Dùng biến trung gian với câu lệnh `if` (Dễ đọc, khuyến khích cho logic phức tạp)**
  ```jsx
  let tabContent = <p>Please select a topic</p>;

  if (selectedTopic) {
    tabContent = (
      <>
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </>
    );
  }

  return <div id="tab-content">{tabContent}</div>;
  ```

* **Cách 2: Dùng toán tử ba ngôi (Ternary Operator)**
  ```jsx
  {!selectedTopic ? (
    <p>Please select a topic</p>
  ) : (
    <div>
      <h3>{EXAMPLES[selectedTopic].title}</h3>
    </div>
  )}
  ```

* **Cách 3: Dùng toán tử logic AND (`&&`)**
  ```jsx
  {!selectedTopic && <p>Please select a topic</p>}
  {selectedTopic && <div><h3>{EXAMPLES[selectedTopic].title}</h3></div>}
  ```

---

### 6. List Rendering & `key` Prop
* Sử dụng phương thức `.map()` của Array để chuyển đổi mảng dữ liệu thành danh sách các phần tử JSX.
* **`key` prop**: Bắt buộc phải có khi render danh sách. React sử dụng `key` để định danh duy nhất từng phần tử, giúp tối ưu hiệu năng khi thêm, sửa, xoá hoặc sắp xếp lại danh sách.
  ```jsx
  <ul>
    {CORE_CONCEPTS.map((concept) => (
      <Coreconcepts key={concept.title} {...concept} />
    ))}
  </ul>
  ```

---

### 7. Dynamic Styling (Class động theo điều kiện)
Thay đổi class CSS linh hoạt dựa vào state hiện tại:
```jsx
<button className={isSelected ? "active" : undefined} onClick={onSelect}>
  {children}
</button>
```

---

## 🚀 Hướng dẫn chạy dự án

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy máy chủ phát triển (Dev server):**
   ```bash
   npm run dev
   ```
   * Server sẽ chạy tại: `http://localhost:3000`
   * Tự động mở Google Chrome theo cấu hình trong `vite.config.js`.
