# ReDrape — Circular Luxury Occasionwear Marketplace

A premium peer-to-peer fashion rental platform built with React + Express + MongoDB.

---

## 🚀 Quick Start

### Frontend (http://localhost:5173)
```bash
cd frontend
npm install    # if not done
npm run dev
```

### Backend API (http://localhost:5000)
```bash
cd backend
npm install    # if not done
node server.js
```

> **Note:** On first run, `mongodb-memory-server` automatically downloads a MongoDB binary (~780MB) and self-hosts the database — **no MongoDB installation required**.

---

## 🔑 Demo Credentials

| Role  | Email                  | Password      |
|-------|------------------------|---------------|
| Admin | admin@redrape.in       | admin123      |
| User  | user@redrape.in        | password123   |

---

## 📁 Project Structure

```
redrape/
├── frontend/                # React + Vite + Tailwind
│   └── src/
│       ├── api/index.js     # Axios API client
│       ├── components/      # Navbar, Footer
│       ├── context/         # AuthContext (JWT)
│       └── pages/           # 14 pages (see below)
│
└── backend/                 # Express + Mongoose
    ├── server.js            # Entry point + auto-seed
    ├── models/              # User, Outfit, Booking, Wishlist
    ├── routes/              # auth, outfits, bookings, wishlist, wardrobe, admin
    ├── middleware/          # JWT auth + role guards
    └── seed.js              # Manual seed script
```

---

## 📄 Pages

| Route              | Page                    |
|--------------------|-------------------------|
| `/`                | Home (Hero, Occasions, Featured Outfits) |
| `/explore`         | Browse with filters     |
| `/outfit/:id`      | Outfit Detail + Booking |
| `/checkout/:id`    | Booking Checkout        |
| `/list-outfit`     | Lend Your Outfit        |
| `/find-my-look`    | Style Quiz              |
| `/profile`         | Member Profile          |
| `/my-wardrobe`     | Lender Dashboard        |
| `/wishlist`        | Saved Outfits           |
| `/rent-vs-buy`     | Cost Calculator         |
| `/trust-safety`    | Trust & Safety          |
| `/admin`           | Admin Console           |
| `/login`           | Login                   |
| `/register`        | Register                |

---

## 🔌 API Endpoints

| Method | Route                        | Auth     | Description             |
|--------|------------------------------|----------|-------------------------|
| POST   | `/api/auth/register`         | Public   | Register user           |
| POST   | `/api/auth/login`            | Public   | Login + JWT             |
| GET    | `/api/auth/me`               | Private  | Current user            |
| PUT    | `/api/auth/profile`          | Private  | Update profile          |
| GET    | `/api/outfits`               | Public   | List outfits (filters)  |
| GET    | `/api/outfits/:id`           | Public   | Outfit detail           |
| POST   | `/api/outfits`               | Private  | Create listing          |
| PUT    | `/api/outfits/:id`           | Private  | Update listing          |
| DELETE | `/api/outfits/:id`           | Private  | Delete listing          |
| POST   | `/api/bookings`              | Private  | Create booking          |
| GET    | `/api/bookings/my`           | Private  | My bookings             |
| GET    | `/api/bookings/lending`      | Private  | Bookings as lender      |
| PUT    | `/api/bookings/:id/cancel`   | Private  | Cancel booking          |
| GET    | `/api/wishlist`              | Private  | Get wishlist            |
| POST   | `/api/wishlist`              | Private  | Add to wishlist         |
| DELETE | `/api/wishlist/:outfitId`    | Private  | Remove from wishlist    |
| GET    | `/api/wardrobe`              | Private  | My listings             |
| GET    | `/api/wardrobe/stats`        | Private  | Earnings & stats        |
| GET    | `/api/admin/stats`           | Admin    | Platform stats          |
| GET    | `/api/admin/users`           | Admin    | All users               |
| GET    | `/api/admin/outfits`         | Admin    | All outfits             |
| PUT    | `/api/admin/outfits/:id/approve` | Admin | Approve/reject listing |

---

## 🌱 Using MongoDB Atlas (Production)

Update `backend/.env`:
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/redrape
```

Then run `node seed.js` to populate demo data.
