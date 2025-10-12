# Project Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Photo Frame Web                         │
│                    Full-Stack Application                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │         │                  │         │                  │
│    Frontend      │◄───────►│     Backend      │◄───────►│    Database      │
│  React + Vite    │  HTTP   │   Express.js     │  MySQL  │     MySQL        │
│                  │  REST   │                  │  Pool   │                  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
     Port 5173                    Port 3001                   Port 3307

```

## Frontend Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐     │
│  │               User Interface Layer                     │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │     │
│  │  │  Header  │  │   Hero   │  │  Gallery │    ...       │     │
│  │  └──────────┘  └──────────┘  └──────────┘              │     │
│  └────────────────────────────────────────────────────────┘     │
│                           │                                     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │               Service Layer                            │     │
│  │  ┌─────────────────┐  ┌──────────────────┐             │     │
│  │  │  API Service    │  │ Database Service │             │     │
│  │  └─────────────────┘  └──────────────────┘             │     │
│  └────────────────────────────────────────────────────────┘     │
│                           │                                     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │               Utility Layer                            │     │
│  │  ┌─────────────┐  ┌──────────────┐                     │     │
│  │  │Translations │  │ Image Utils  │                     │     │
│  │  └─────────────┘  └──────────────┘                     │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Backend Architecture (MVC Pattern)

```
┌─────────────────────────────────────────────────────────────────┐
│                     Backend (Express.js)                        | 
├─────────────────────────────────────────────────────────────────│
│                                                                 │ 
│  ┌────────────────────────────────────────────────────────┐     │
│  │                  Routes Layer                          │     │
│  │  ┌─────────────────┐  ┌──────────────────┐             │     │ 
│  │  │  Order Routes   │  │  Catalog Routes  │             │     │ 
│  │  │  /api/orders    │  │  /api/categories │             │     │ 
│  │  └─────────────────┘  └──────────────────┘             │     │ 
│  └────────────────────────────────────────────────────────┘     │
│                           │                                     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Controllers Layer                         │     │
│  │  ┌──────────────────┐  ┌────────────────────┐          │     │
│  │  │ Order Controller │  │ Catalog Controller │          │     │
│  │  │ Business Logic   │  │  Business Logic    │          │     │
│  │  └──────────────────┘  └────────────────────┘          │     │
│  └────────────────────────────────────────────────────────┘     │
│                           │                                     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Configuration Layer                       │     │
│  │  ┌─────────────────────────────────────────┐           │     │
│  │  │       Database Config & Pool            │           │     │
│  │  │  - Connection pooling                   │           │     │
│  │  │  - Error handling                       │           │     │
│  │  └─────────────────────────────────────────┘           │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Database Schema Relationships

```
┌──────────────┐
│  categories  │
└──────────────┘
      │ 1
      │
      ├─────────────────┐
      │                 │
      │ *               │ *
┌────────────-─┐   ┌────────────┐
│design_samples│   │frame_types │
└─────────────-┘   └────────────┘
                       │ 1
                       │
              ┌────────┼────────┐
              │        │        │
              │ *      │ *      │ *
      ┌─────────-──┐ ┌──────────────┐ ┌─────────┐
      │frame_colors│ │frame_type_   │ │  sizes  │
      └──────────-─┘ │    sizes     │ └─────────┘
                     └──────────────┘
                           │ *
                           │
                           │ 1
                           │   
┌──────────┐         ┌──────────────┐
│  orders  │ 1 ──── *│ order_items  │
└──────────┘         └──────────────┘
                           │
                           │ (references all above)
```

## Request Flow

### 1. Create Order Flow

```
User Interface (OrderPage.jsx)
         │
         │ 1. Fill form
         │
         ▼
Service Layer (databaseService.js)
         │
         │ 2. POST /api/orders
         │
         ▼
Backend Routes (orders.js)
         │
         │ 3. Route to controller
         │
         ▼
Controller (orderController.js)
         │
         │ 4. Validate & Process
         │
         ▼
Database Pool (database.js)
         │
         │ 5. Execute SQL
         │
         ▼
MySQL Database
         │
         │ 6. Return result
         │
         ▼
Response ← ← ← ← ← ← ← ← ← ← Back to User
```

### 2. Load Categories Flow

```
User Interface (OrderPage.jsx)
         │
         │ 1. Component mount
         │
         ▼
Service Layer (apiService.js)
         │
         │ 2. GET /api/categories
         │
         ▼
Backend Routes (catalog.js)
         │
         │ 3. Route to controller
         │
         ▼
Controller (catalogController.js)
         │
         │ 4. Query database
         │
         ▼
Database Pool (database.js)
         │
         │ 5. SELECT from categories
         │
         ▼
MySQL Database
         │
         │ 6. Return categories
         │
         ▼
Response → → → Display in UI
```

## Folder Structure (Detailed)

```
photo-frame-web/
│
├── backend/                          # Backend Application
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   │   └── database.js           # MySQL connection pool
│   │   │
│   │   ├── controllers/              # Business Logic
│   │   │   ├── orderController.js    # Order CRUD operations
│   │   │   └── catalogController.js  # Catalog queries
│   │   │
│   │   ├── routes/                   # API Routes
│   │   │   ├── orders.js             # Order endpoints
│   │   │   └── catalog.js            # Catalog endpoints
│   │   │
│   │   └── server.js                 # Application entry point
│   │
│   ├── .env                          # Environment variables (secret)
│   ├── .env.example                  # Environment template
│   └── package.json                  # Backend dependencies
│
├── frontend/                         # Frontend Application
│   ├── src/
│   │   ├── components/               # React Components
│   │   │   ├── Header.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── OrderPage.jsx
│   │   │   ├── GallerySection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── OrderSection.jsx
│   │   │   ├── WorksSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LanguageSelector.jsx
│   │   │
│   │   ├── services/                 # API Integration
│   │   │   ├── apiService.js         # Generic API calls
│   │   │   └── databaseService.js    # Database operations
│   │   │
│   │   ├── utils/                    # Utilities
│   │   │   ├── translations.js       # i18n support
│   │   │   └── imageUtils.js         # Image processing
│   │   │
│   │   ├── assets/                   # Static Assets
│   │   │   ├── Ghibli collection/
│   │   │   ├── oil paint collection/
│   │   │   ├── mini frames/
│   │   │   └── logo/
│   │   │
│   │   ├── App.jsx                   # Main App component
│   │   ├── App.css                   # App styles
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   │
│   ├── public/                       # Public static files
│   │   ├── logo.png
│   │   └── vite.svg
│   │
│   ├── index.html                    # HTML template
│   ├── .env                          # Frontend config
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS config
│   ├── postcss.config.js             # PostCSS config
│   ├── eslint.config.js              # ESLint rules
│   └── package.json                  # Frontend dependencies
│
├── database/                         # Database Files
│   ├── schema/                       # Schema Definitions
│   │   ├── schema.sql                # Initial schema
│   │   └── updated_schema.sql        # Current schema
│   │
│   ├── seeds/                        # Seed Data
│   │   └── seed_data.sql             # Sample data
│   │
│   └── dumps/                        # SQL Backups
│       ├── photoframe_categories.sql
│       ├── photoframe_design_samples.sql
│       ├── photoframe_frame_types.sql
│       ├── photoframe_sizes.sql
│       ├── photoframe_frame_colors.sql
│       ├── photoframe_frame_type_sizes.sql
│       ├── photoframe_orders.sql
│       └── photoframe_order_items.sql
│
├── scripts/                          # Utility Scripts
│   ├── database/                     # Database utilities
│   │   ├── check-database.js
│   │   ├── check-schema.cjs
│   │   ├── add-delivery-date-column.cjs
│   │   └── fix-image-column.cjs
│   │
│   └── test/                         # Test scripts
│       ├── test-order.js
│       ├── test-api.cjs
│       ├── test-categories.cjs
│       └── test-order-with-image.cjs
│
├── docs/                             # Documentation
│   ├── API.md                        # API Reference
│   └── DATABASE.md                   # Database Guide
│
├── .gitignore                        # Git ignore rules
├── README.md                         # Main documentation
├── QUICK_START.md                    # Quick setup guide
├── CLEANUP.md                        # Cleanup instructions
├── PROJECT_STATUS.md                 # Current status
└── REORGANIZATION_SUMMARY.md         # Change summary
```

## Technology Stack

### Frontend Stack
```
React 19.1.1
  ├── Vite 7.1.7 (Build tool)
  ├── Tailwind CSS 3.4.18 (Styling)
  ├── ESLint (Code quality)
  └── PostCSS (CSS processing)
```

### Backend Stack
```
Node.js
  └── Express 5.1.0
      ├── MySQL2 3.15.1 (Database driver)
      ├── CORS (Cross-origin support)
      ├── dotenv (Environment variables)
      └── Nodemon (Development auto-reload)
```

### Database
```
MySQL 8.0+
  ├── InnoDB Engine
  ├── Foreign Key Constraints
  ├── Indexes for performance
  └── Transaction support
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                   Production Setup                      │
└─────────────────────────────────────────────────────────┘

Frontend (Static Files)          Backend (API Server)
        │                                │
        ├── Vercel/Netlify               ├── Heroku/Railway
        │   - Static hosting             │   - Node.js hosting
        │   - CDN                        │   - Auto-scaling
        │   - SSL                        │   - SSL
        │                                │
        └────────────────┬───────────────┘
                         │
                         │ HTTPS
                         │
                    ┌────▼────┐
                    │ Database│
                    │  MySQL  │
                    │ AWS RDS │
                    └─────────┘
```

## Security Considerations

1. **Environment Variables** - Sensitive data in .env files
2. **CORS** - Configured for specific origins
3. **Input Validation** - Required fields validation
4. **SQL Injection Prevention** - Parameterized queries
5. **Connection Pooling** - Resource management
6. **Error Handling** - No sensitive data in errors

## Performance Optimizations

1. **Database Connection Pool** - Reuse connections
2. **Frontend Code Splitting** - Lazy loading components
3. **Image Optimization** - Proper formats and sizes
4. **Vite HMR** - Fast development reload
5. **MySQL Indexes** - Fast queries
6. **Tailwind JIT** - Optimized CSS

---

**Architecture designed for:** Scalability, Maintainability, Performance
