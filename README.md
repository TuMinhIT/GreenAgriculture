# 🌱 GreenAgriculture

> **Nền tảng thương mại điện tử nông sản sạch**, kết nối trực tiếp từ nông trại đến người tiêu dùng với hệ thống quản lý toàn diện.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-blue)

## 📖 Giới thiệu
**GreenAgriculture** là một nền tảng **Full-stack E-commerce** được xây dựng để tối ưu hóa quá trình phân phối nông sản sạch.  
Hệ thống gồm 3 phân hệ:

1. **Customer Web App:** Tìm kiếm → xem chi tiết → đặt hàng.
2. **Admin Dashboard:** Quản trị sản phẩm, người dùng, đơn hàng, thống kê.
3. **Backend Server:** RESTful API xử lý toàn bộ logic và dữ liệu.

## 🚀 Công nghệ sử dụng (Tech Stack)

### Backend
- Node.js, Express.js  
- MongoDB, Mongoose  
- JWT, Bcrypt  
- Helmet, Express-Rate-Limit, XSS-Clean  
- Socket.io  
- Cloudinary, Nodemailer  
- Joi, Express-Validator  

### Frontend
- React 19, Vite  
- Tailwind CSS  
- TanStack Query (React Query)  
- Axios  
- Recharts, Lucide-React  
- XLSX, File-Saver  

## 🛠 Chức năng chính

### Người dùng (Customer)
- Đăng ký / Đăng nhập (Email/OTP)  
- Tìm kiếm & lọc sản phẩm  
- Giỏ hàng & thanh toán  
- Theo dõi trạng thái đơn hàng realtime  

### Quản trị viên (Admin)
- Dashboard thống kê  
- CRUD sản phẩm, danh mục, thương hiệu  
- Quản lý đơn hàng: cập nhật trạng thái, in hóa đơn  
- Xuất file Excel báo cáo doanh thu  

## ⚙️ Cài đặt & Chạy dự án

### Yêu cầu hệ thống
- Node.js v18+  
- MongoDB local hoặc Atlas  

## 1️⃣ Backend (Server)

```bash
cd server
npm install
```

Tạo file `.env`:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/green-agriculture
JWT_SECRET=your_secret_key
```

Chạy server:

```bash
npm run dev
```

## 2️⃣ Frontend (Client)

```bash
cd client
npm install
npm run dev
```

Truy cập: http://localhost:5173

## 3️⃣ Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

Truy cập: http://localhost:5174

## 👨‍💻 Tác giả
**Võ Minh Tú – TuMinhIT**
**Trịnh Minh Thắng – mthegn1212/mthegn3003** GitHub: github.com/mthegn1212

## 🤝 Đóng góp
Mọi đóng góp đều được hoan nghênh.  
Vui lòng tạo Pull Request hoặc mở Issue nếu bạn muốn đề xuất cải tiến.
