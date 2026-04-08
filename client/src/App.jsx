import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import Login         from './pages/Login';
import NotFound      from './pages/NotFound';

// Admin Pages
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManagement  from './pages/admin/MenuManagement';
import ReservationTracker from './pages/admin/ReservationTracker';
import InquiryInbox    from './pages/admin/InquiryInbox';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>

          {/* ── Public Access (Gated) ── */}
          <Route path="/login" element={<Login />} />

          {/* ── Authenticated Routes ── */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
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
              <ProtectedRoute redirectTo="/admin/login">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute redirectTo="/admin/login">
                <MenuManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute redirectTo="/admin/login">
                <ReservationTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute redirectTo="/admin/login">
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
