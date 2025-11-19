# GreenAgriculture - Admin Dashboard

## 📋 Mô tả dự án

**GreenAgriculture** là một hệ thống quản lý cửa hàng nông nghiệp toàn diện, bao gồm website bán hàng cho khách hàng và trang quản trị cho admin. Dự án được xây dựng với kiến trúc MERN Stack (MongoDB, Express.js, React.js, Node.js), cung cấp giải pháp hoàn chỉnh cho việc quản lý sản phẩm, đơn hàng, khách hàng và danh mục sản phẩm nông nghiệp.

## Công nghệ sử dụng

### Frontend (Admin)

- **React.js 18** - Thư viện UI component
- **Vite** - Build tool hiện đại, nhanh chóng
- **React Router DOM** - Điều hướng SPA
- **TanStack Query (React Query)** - Quản lý state server và caching
- **Axios** - HTTP client
- **Tailwind CSS** - CSS framework utility-first
- **React Toastify** - Thông báo người dùng
- **XLSX** - Xuất dữ liệu Excel
- **Lucide React** - Icon library

### Backend

- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - NoSQL database
- **JWT** - Xác thực và phân quyền
- **Cloudinary** - Lưu trữ và quản lý hình ảnh
- **Multer** - Upload file middleware
- **Nodemailer** - Gửi email

### Client Website

- **React.js** - Frontend framework
- **Vite** - Build tool
- **React Context API** - State management
- **React Query** - Data fetching

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 16.x
- MongoDB
- npm hoặc yarn

### Bước 1: Clone repository

```bash
git clone https://github.com/52200130MinhTu/GreenAgriculture.git
cd GreenAgriculture
```

### Bước 2: Cài đặt dependencies

```bash
# Cài đặt backend
cd server
npm install

# Cài đặt admin
cd ../admin
npm install

# Cài đặt client
cd ../client
npm install
```

### Bước 3: Cấu hình môi trường

### Bước 4: Chạy ứng dụng

```bash
# Chạy backend (terminal 1)
cd server
npm run dev

# Chạy admin (terminal 2)
cd admin
npm run dev

# Chạy client (terminal 3)
cd client
npm run dev
```

- Backend: http://localhost:5000
- Admin: http://localhost:5173
- Client: http://localhost:5174

## Tính năng chính

### Admin Dashboard

- Đăng nhập bảo mật với JWT
- Dashboard tổng quan với biểu đồ thống kê
- CRUD sản phẩm với upload nhiều ảnh
- Quản lý danh mục và thương hiệu
- Theo dõi đơn hàng với cập nhật trạng thái real-time
- Lọc và tìm kiếm nâng cao
- Xuất báo cáo Excel
- Quản lý khách hàng

### Client Website

- Giao diện responsive, thân thiện
- Tìm kiếm sản phẩm theo tên, mã vạch
- Giỏ hàng với cập nhật tức thời
- Đặt hàng trực tuyến
- Theo dõi đơn hàng
- Xác thực người dùng (đăng ký, đăng nhập)

## Bảo mật

- JWT authentication với refresh token
- Bcrypt password hashing
- Role-based access control (RBAC)
- Input validation và sanitization
- CORS configuration
- Rate limiting

## API Endpoints

### Products

- `GET /api/products` - Lấy danh sách sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Orders

- `GET /api/orders` - Lấy danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật trạng thái đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

### Categories & Brands

- `GET /api/categories` - Lấy danh sách danh mục
- `POST /api/categories` - Tạo danh mục mới
- `GET /api/brands` - Lấy danh sách thương hiệu
- `POST /api/brands` - Tạo thương hiệu mới

## 👨Tác giả

**Võ Minh Tú**

- GitHub: [@52200130MinhTu](https://github.com/52200130MinhTu)
- Email: vominhtu1212004@gmail.com
