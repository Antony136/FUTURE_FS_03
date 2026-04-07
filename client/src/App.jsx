import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout & Guards
import Layout        from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home          from './pages/Home';
import Menu          from './pages/Menu';
import About         from './pages/About';
import Gallery       from './pages/Gallery';
import Contact       from './pages/Contact';
import Reservations  from './pages/Reservations';
import NotFound      from './pages/NotFound';

// Admin Pages
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManagement  from './pages/admin/MenuManagement';
import ReservationTracker from './pages/admin/ReservationTracker';
import InquiryInbox    from './pages/admin/InquiryInbox';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ── Public Routes — all share Navbar + Footer via Layout ─ */}
          <Route element={<Layout />}>
            <Route index          element={<Home />}         />
            <Route path="menu"    element={<Menu />}         />
            <Route path="about"   element={<About />}        />
            <Route path="gallery" element={<Gallery />}      />
            <Route path="contact" element={<Contact />}      />
            <Route path="reservations" element={<Reservations />} />
            <Route path="*"       element={<NotFound />}     />
          </Route>

          {/* ── Admin Login (standalone, no Navbar/Footer) ─────────── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ── Protected Admin Dashboard ──────────────────────────── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute>
                <MenuManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute>
                <ReservationTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <InquiryInbox />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
