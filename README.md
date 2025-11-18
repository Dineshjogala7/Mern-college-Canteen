# 🍴 MERN College Canteen


A comprehensive full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to modernize and streamline college canteen operations. This system provides an intuitive digital platform for students to browse menus and place orders, while empowering administrators with powerful management tools and analytics.

---

## ✨ Key Features

### 🎓 Student Interface
- **Browse Menu** – View categorized food items with images, descriptions, and pricing
- **Smart Search** – Debounced search functionality for quick item discovery
- **Shopping Cart** – Add, update, and remove items with real-time price calculations
- **Order Tracking** – Monitor order status from preparation to delivery
- **Order History** – Access past orders and reorder favorite items

### 🛠️ Admin Dashboard
- **Order Management** – View and update order statuses in real-time
- **Inventory Control** – Complete CRUD operations for menu items
- **Sales Analytics** – Comprehensive statistics including:
  - Daily and monthly revenue tracking
  - Popular item analytics
  - Order completion rates
  - Revenue trends and insights
- **User Management** – Monitor registered users and order patterns

### 🔐 Security & Performance
- JWT-based authentication with secure token management
- Bcrypt password hashing for user data protection
- Role-based access control (Student/Admin)
- Optimized API responses with pagination
- Debounced search inputs to reduce server load

---

## 🏗️ Architecture

```
Canteen/
├── backend/                    # Node.js + Express REST API
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Items.js
│   │   ├── Orders.js
│   │   └── Cart.js
│   ├── routes/                 # API endpoints
│   │   ├── auth.js
│   │   ├── items.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── sales.js
│   ├── controllers/            # Business logic
│   ├── middlewares/            # Auth, upload, error handlers
│   ├── utils/                  # Helper functions
│   ├── connect.js              # Database connection
│   └── server.js               # Application entry point
│
├── admin/                      # React admin dashboard
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/              # Dashboard views
│       ├── context/            # Global state management
│       └── utils/              # Helper utilities
│
└── client/                     # React student application
    └── src/
        ├── components/         # UI components
        ├── pages/              # Application views
        ├── context/            # Cart & auth state
        └── utils/              # API helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dineshjogala7/Mern-college-Canteen.git
   cd Mern-college-Canteen
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/canteen
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```
   
   Start the backend server:
   ```bash
   npm start
   ```

3. **Client Setup**
   ```bash
   cd ../client
   npm install
   npm start
   ```

4. **Admin Dashboard Setup**
   ```bash
   cd ../admin
   npm install
   npm start
   ```

The application will be available at:
- Client: `http://localhost:3000`
- Admin: `http://localhost:3001`
- API: `http://localhost:5000`

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/cred/signup` | Register new user | No |
| POST | `/cred/login` | Authenticate user & receive JWT | No |

### Cart Operations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/cart/addcartitem/:userid` | Add item to cart | Yes |
| PATCH | `/user/cart/updatecartitem/:userid` | Update item quantity | Yes |
| DELETE | `/user/cart/deletecartitem/:userid` | Remove item from cart | Yes |
| GET | `/user/cart/getcartitems/:userid` | Retrieve user's cart | Yes |

### Menu Items

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/items/additem` | Create new menu item | Admin |
| GET | `/user/items/getitems/:category` | Get items by category | Yes |
| DELETE | `/admin/items/deleteitem/:itemid` | Remove menu item | Admin |
| PATCH | `/admin/items/update/:itemid` | Update item stock | Admin |
| PATCH | `/admin/items/updateadmin/:itemid` | Update item details | Admin |

### Order Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/orders/placeorder/:userid` | Create new order | Yes |
| GET | `/admin/orders/gettotalorders` | Retrieve all orders | Admin |
| GET | `/user/orders/getuserorders/:userid` | Get user's order history | Yes |
| PATCH | `/admin/orders/updateuserorder/:orderid` | Update order status | Admin |

### Sales Analytics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/sales` | Retrieve sales statistics | Admin |

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt for password hashing
- **File Upload:** Multer middleware
- **Cloud Storage:** Cloudinary

### Frontend
- **Library:** React.js (Functional Components + Hooks)
- **State Management:** Context API
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** Custom CSS with responsive design
- **Performance:** Debouncing for search optimization

---

## 📊 Sample Analytics

The admin dashboard provides comprehensive insights:

```
📈 Today's Overview
├── Total Orders: 120
├── Revenue: ₹8,450
└── Average Order Value: ₹70.42

📅 Monthly Statistics
├── Total Orders: 3,240
├── Revenue: ₹45,000
└── Growth: +15% from last month

🔥 Top Performers
├── 1. Veg Burger (320 orders)
├── 2. Masala Dosa (285 orders)
└── 3. Cold Coffee (240 orders)

📦 Order Status
├── Pending: 12 orders
├── Preparing: 8 orders
├── Out for Delivery: 5 orders
└── Completed: 95 orders (85%)
```

---

## 🔮 Roadmap

- [ ] **Payment Integration** – Stripe/Razorpay for cashless transactions
- [ ] **Push Notifications** – Real-time order updates via FCM
- [ ] **AI Recommendations** – Personalized menu suggestions
- [ ] **Report Generation** – Export sales data (CSV/PDF)
- [ ] **Multi-language Support** – Internationalization (i18n)
- [ ] **Mobile App** – React Native version
- [ ] **Rating System** – Item reviews and ratings
- [ ] **Loyalty Program** – Reward points for frequent customers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Dinesh Jogala**

- 🌐 MERN Stack Developer
- 💡 Problem Solver & Innovator
- 🚀 Open Source Contributor

[![GitHub](https://img.shields.io/badge/GitHub-Dineshjogala7-181717?logo=github)](https://github.com/Dineshjogala7)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?logo=linkedin)](https://linkedin.com/in/dinesh-jogala)

---

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB team for the robust database solution
- Cloudinary for reliable image hosting
- All contributors who help improve this project

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for the college community

</div>
