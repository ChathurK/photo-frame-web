"# Photo Frame Web - Order Management System

A full-stack web application for ordering custom photo frames with various designs, sizes, and frame types. Built with React, Express.js, and MySQL.

## 🚀 Features

- **Multi-Category Support**: Oil Painting, 100 Designs, Cute Collections, Mini Frames
- **Customization Options**: 
  - Multiple design samples per category
  - Various frame types and colors
  - Different size options
  - Custom background colors
  - Image upload support
- **Customer Management**: Order tracking with customer details
- **WhatsApp Integration**: Direct order communication via WhatsApp
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Multi-language Support**: English and Sinhala translations

## 📁 Project Structure

```
photo-frame-web/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   └── database.js    # Database connection setup
│   │   ├── controllers/       # Business logic
│   │   │   ├── orderController.js
│   │   │   └── catalogController.js
│   │   ├── routes/            # API route definitions
│   │   │   ├── orders.js
│   │   │   └── catalog.js
│   │   └── server.js          # Main server entry point
│   ├── .env                   # Backend environment variables
│   ├── .env.example           # Environment template
│   └── package.json           # Backend dependencies
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Header.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── OrderPage.jsx
│   │   │   ├── GallerySection.jsx
│   │   │   └── ...
│   │   ├── services/          # API service layer
│   │   │   ├── apiService.js
│   │   │   └── databaseService.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── translations.js
│   │   │   └── imageUtils.js
│   │   ├── assets/            # Static assets (images)
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Application entry point
│   ├── public/                # Public static files
│   ├── index.html             # HTML template
│   ├── .env                   # Frontend environment variables
│   ├── .env.example           # Environment template
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── package.json           # Frontend dependencies
│
├── database/                   # Database files
│   ├── schema/                # Database schema definitions
│   │   ├── schema.sql         # Initial schema
│   │   └── updated_schema.sql # Updated schema
│   ├── seeds/                 # Seed data
│   │   └── seed_data.sql      # Initial data
│   └── dumps/                 # SQL dumps (backups)
│       ├── photoframe_categories.sql
│       ├── photoframe_orders.sql
│       └── ...
│
├── scripts/                    # Utility and maintenance scripts
│   ├── database/              # Database utility scripts
│   │   ├── check-database.js
│   │   ├── check-schema.cjs
│   │   ├── add-delivery-date-column.cjs
│   │   └── fix-image-column.cjs
│   └── test/                  # Test scripts
│       ├── test-order.js
│       ├── test-api.cjs
│       └── test-categories.cjs
│
├── docs/                       # Documentation
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🛠️ Technologies Used

### Frontend
- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MySQL2 3.15.1** - Database client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MySQL** - Relational database
- Tables: orders, order_items, categories, design_samples, frame_types, sizes, frame_colors, customers

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd photo-frame-web
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE photoframe;

# Import schema
mysql -u root -p photoframe < database/schema/updated_schema.sql

# Import seed data (optional)
mysql -u root -p photoframe < database/seeds/seed_data.sql

# Or import from dumps
mysql -u root -p photoframe < database/dumps/photoframe_categories.sql
# Repeat for other dump files
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=photoframe
# DB_PORT=3307
# API_PORT=3001

# Start the backend server
npm start

# For development with auto-reload
npm run dev
```

The backend API will run on `http://localhost:3001`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your configuration
# VITE_API_URL=http://localhost:3001/api
# VITE_WHATSAPP_NUMBER=+94XXXXXXXXXX

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Orders
- `GET /api/orders` - Get all orders with items
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Catalog
- `GET /api/categories` - Get all categories
- `GET /api/design-samples/:categoryId` - Get design samples for category
- `GET /api/frame-types/:categoryId` - Get frame types for category
- `GET /api/sizes/:frameTypeId` - Get sizes for frame type
- `GET /api/frame-colors/:frameTypeId` - Get colors for frame type
- `GET /api/customers` - Get all customers

### Health Check
- `GET /api/health` - Server health status

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Build output will be in frontend/dist/
```

### Backend
The backend is production-ready. Deploy using:
```bash
cd backend
npm start
```

## 🧪 Testing

Test scripts are available in the `scripts/test/` directory:

```bash
# Test order creation
node scripts/test/test-order.js

# Test API endpoints
node scripts/test/test-api.cjs

# Test categories
node scripts/test/test-categories.cjs
```

## 🗄️ Database Maintenance

Database utility scripts are in `scripts/database/`:

```bash
# Check database connection
node scripts/database/check-database.js

# Check schema
node scripts/database/check-schema.cjs

# Add delivery date column
node scripts/database/add-delivery-date-column.cjs

# Fix image column
node scripts/database/fix-image-column.cjs
```

## 🌐 Environment Variables

### Backend (.env)
```env
API_PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=photoframe
DB_PORT=3307
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_WHATSAPP_NUMBER=+94XXXXXXXXXX
```

## 📝 License

[Add your license here]

## 👥 Contributors

[Add contributors here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email [your-email] or create an issue in the repository.
" 
