# Savory Skies - MERN Restaurant Implementation Plan

This document details the step-by-step approach to building the **Savory Skies** restaurant application, ensuring a modern, premium, and functional result.

---

## 🏗️ Phase 1: Project Setup & Architecture
**Goal:** Initialize the project directories, install dependencies, and define the base structure.

1.  **Repository Setup:** Done (Root initialized with `README.md`).
2.  **Server Initialization:**
    *   Create a `server/` directory.
    *   Initialize Node.js with `npm init -y`.
    *   Install: `express`, `mongoose`, `dotenv`, `cors`, `helmet`, `morgan`, `jsonwebtoken`, `bcryptjs`.
    *   Set up standard MVC folder structure (`models/`, `controllers/`, `routes/`, `middleware/`, `config/`).
3.  **Client Initialization:**
    *   Create a `client/` directory using Vite: `npx -y create-vite@latest client --template react`.
    *   Install: `tailwindcss`, `axios`, `framer-motion`, `lucide-react`, `react-router-dom`, `react-hot-toast`.
    *   Configure Tailwind CSS with a premium color palette (warm neutrals, gold accents, deep browns).

---

## 🔐 Phase 2: Database & Backend Core
**Goal:** Establish the MongoDB connection and core models.

1.  **Database Connection:**
    *   Connect to MongoDB Atlas using Mongoose.
    *   Implement error handling for the connection.
2.  **Data Modeling:**
    *   `MenuItem`: { name, description, price, category, image, isVeg, isFeatured, rating }.
    *   `Reservation`: { name, phone, date, time, guests, status, message }.
    *   `Contact`: { name, email, subject, message, date }.
    *   `User (Admin)`: { email, password, role }.
3.  **Core API Routes:**
    *   `GET /api/menu` - Fetch all items.
    *   `POST /api/reservations` - Create a booking.
    *   `POST /api/contact` - Submit contact form.

---

## 🎨 Phase 3: Frontend Foundation & Design System
**Goal:** Build the UI skeleton and implement the "Wow" factor.

1.  **Global Styles:**
    *   Register Google Fonts (**Outfit** for headings, **Inter** for body).
    *   Define CSS variables for the color palette.
2.  **Common Components:**
    *   `Navbar`: Sticky with a glassmorphism effect.
    *   `Footer`: Comprehensive links and hours.
    *   `Button`: Premium interactive states.
3.  **Mockups & Layouts:**
    *   Set up `react-router` for all pages.
    *   Implement a shared `Layout` wrapper for common elements.
4.  **Hero Section (Home):**
    *   High-res background with Parallax-like scrolling.
    *   Strong CTA buttons ("View Menu", "Reserve Table").

---

## 🍱 Phase 4: Core Pages Development
**Goal:** Build out the main user-facing functionality.

1.  **Menu Page:**
    *   Filtering system for categories (Starters, Main, etc.).
    *   Veg/Non-Veg toggle.
    *   Search bar for specific dishes.
    *   Skeleton loaders for when data is fetching.
2.  **Reservation Page:**
    *   Clean, interactive form using `react-hook-form`.
    *   Date picker and time selector integration.
    *   Success/Error Toast notifications.
3.  **Gallery & About:**
    *   Masonry grid for photos.
    *   Lightbox integration (`react-image-lightbox` or custom).
    *   Scroll-animations (Framer Motion) for the restaurant's story.

---

## 🛡️ Phase 5: Admin Features & Authentication
**Goal:** Empower the business owner with a management portal.

1.  **Auth Implementation:**
    *   Admin login page.
    *   JWT-based protected routes.
2.  **Admin Dashboard (Secure):**
    *   `Menu Management`: CRUD operations for menu items.
    *   `Reservation Tracker`: View and manage bookings.
    *   `Inquiry Inbox`: Read messages from the contact form.

---

## ✨ Phase 6: Polish, Performance & Deployment
**Goal:** Final refinement for a production-ready launch.

1.  **Animations:**
    *   Apply micro-animations to all buttons and cards.
    *   Add entrance animations for each page section.
2.  **Responsiveness:**
    *   Rigorous testing on mobile and tablet breakpoints.
3.  **Performance:**
    *   Lazy loading for images and components.
    *   API response caching where applicable.
4.  **Deployment:**
    *   Frontend on Vercel.
    *   Backend on Render/Railway.
    *   Database on MongoDB Atlas.

---