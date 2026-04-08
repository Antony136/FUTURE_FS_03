# 🍽️ Simple Restaurant | Premium Management System

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/mern-stack)

**Simple Restaurant** is a high-end, full-stack MERN application designed for a luxury culinary experience. It features a bespoke design system, a sophisticated administrative hub, and a personalized customer journey.

## 📺 Live Demo

![Project Demo](demo.gif)

---

## ✨ Key Features

### 🌟 Guest Experience
- **Curated Menu**: Interactive digital menu with category filtering (Starters, Main Course, Desserts, etc.).
- **Smart Cart**: Persistent shopping cart with real-time total calculation and quantity management.
- **Bespoke Reservations**: Table booking system with automated confirmation codes and dietary/occasion notes.
- **"My Journey" Dashboard**: Personalized user account to track live **Order Status** (Pending → Delivered) and **Reservation Ledgers**.
- **Dark/Light Mode**: Seamlessly switch between themes to suit the dining atmosphere.

### 🛡️ Admin Intelligence Hub
- **Executive Analytics**: Real-time dashboard showing daily order velocity, booking rates, and inventory counts.
- **Fulfillment Registry**: Advanced order management system to advance fulfillment lifecycles.
- **Inventory Management**: Full CRUD operations for menu items including image uploads, spice levels, and featured status.
- **Concierge Ledger**: Manage guest arrivals and reservation statuses.
- **Inquiry Inbox**: Centralized communication hub for event requests and feedback.

---

## 🚀 Tech Stack

**Frontend:**
- **React (Vite)** — High-performance UI rendering.
- **Framer Motion** — Premium animations and transitions.
- **Lucide React** — Elegant, consistent iconography.
- **TailwindCSS** — Utility-first styling for the design system.
- **React Hot Toast** — Non-intrusive, custom-branded feedback.

**Backend:**
- **Node.js & Express** — Robust RESTful API architecture.
- **MongoDB & Mongoose** — Scalable NoSQL data modeling.
- **JWT (JSON Web Tokens)** — Secure, stateless authentication.
- **Helmet & Morgan** — Enhanced security headers and request logging.
- **Multer** — Multi-part form data for image assets.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/savory-skies.git
cd savory-skies
```

### 2. Backend Setup (`/server`)
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_random_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```
Run the seeder to populate the database:
```bash
npm run seed
npm run dev
```

### 3. Frontend Setup (`/client`)
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the development server:
```bash
npm run dev
```

---

## 🌐 Deployment

### Backend (Render)
1. Set the Root Directory to `server`.
2. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.

### Frontend (Vercel)
1. Set the Root Directory to `client`.
2. Framework Preset: `Vite`.
3. Add environment variable: `VITE_API_URL` (points to your Render URL + `/api`).
4. Build Command: `npm run build`.

---

## 📸 Design Philosophy
The project employs a **Bordeaux & Gold** color palette, emphasizing "Taste the Atmosphere." It utilizes **Glassmorphism** and a spacing-heavy layout to maintain a clean, professional, and elite aesthetic.

---

## 📄 License
This project is licensed under the MIT License.

---
*Simple Restaurant — Where technology meets culinary excellence.*
