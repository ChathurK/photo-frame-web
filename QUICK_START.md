# Quick Start Guide

Get the Photo Frame Web application up and running in minutes!

## Prerequisites Checklist

- [ ] Node.js (v18+) installed
- [ ] MySQL (v8.0+) installed and running
- [ ] Git installed (optional)

## 5-Minute Setup

### Step 1: Database Setup (2 minutes)

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE photoframe;
exit;

# Import schema
mysql -u root -p photoframe < database/schema/updated_schema.sql

# Import sample data (optional)
mysql -u root -p photoframe < database/seeds/seed_data.sql
```

### Step 2: Backend Setup (1 minute)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=photoframe
# DB_PORT=3307
# API_PORT=3001

# Start backend server
npm start
```

✅ Backend should now be running at `http://localhost:3001`

### Step 3: Frontend Setup (1 minute)

```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# VITE_API_URL=http://localhost:3001/api
# VITE_WHATSAPP_NUMBER=+94XXXXXXXXXX

# Start frontend development server
npm run dev
```

✅ Frontend should now be running at `http://localhost:5173`

### Step 4: Verify (1 minute)

Open your browser and visit:

1. **Frontend:** http://localhost:5173
2. **Backend Health Check:** http://localhost:3001/api/health
3. **Test API:** http://localhost:3001/api/categories

## Common Issues & Solutions

### Issue: "Database connection failed"
**Solution:** 
- Check if MySQL is running
- Verify credentials in `backend/.env`
- Ensure database `photoframe` exists

### Issue: "Port 3001 already in use"
**Solution:**
- Change `API_PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` accordingly

### Issue: "Cannot find module"
**Solution:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Issue: Frontend can't connect to backend
**Solution:**
- Ensure backend is running
- Check `VITE_API_URL` in `frontend/.env`
- Check browser console for CORS errors

## Development Workflow

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Making Changes

**Backend Changes:**
- Edit files in `backend/src/`
- Server auto-restarts with nodemon (if using `npm run dev`)
- Check terminal for errors

**Frontend Changes:**
- Edit files in `frontend/src/`
- Browser auto-refreshes via Vite HMR
- Check browser console for errors

### Testing

**Test API Endpoints:**
```bash
node scripts/test/test-api.cjs
```

**Test Order Creation:**
```bash
node scripts/test/test-order.js
```

**Test Categories:**
```bash
node scripts/test/test-categories.cjs
```

## Project Structure Quick Reference

```
backend/src/
├── config/         → Database configuration
├── controllers/    → Business logic
├── routes/         → API endpoints
└── server.js       → Main entry point

frontend/src/
├── components/     → React components
├── services/       → API calls
├── utils/          → Helper functions
└── App.jsx         → Main app component
```

## Useful Commands

### Backend
```bash
npm start          # Start production server
npm run dev        # Start with auto-reload
```

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Check code quality
```

### Database
```bash
# Backup database
mysqldump -u root -p photoframe > backup.sql

# Restore database
mysql -u root -p photoframe < backup.sql

# Check database
node scripts/database/check-database.js
```

## Need More Help?

- 📖 **Full Documentation:** See README.md
- 🔌 **API Reference:** See docs/API.md
- 🗄️ **Database Guide:** See docs/DATABASE.md
- 🧹 **Cleanup Guide:** See CLEANUP.md

## Next Steps

1. Explore the frontend at http://localhost:5173
2. Try creating a test order
3. Check the API documentation in `docs/API.md`
4. Customize the design and add your own features!

---

🎉 **You're all set! Happy coding!**
