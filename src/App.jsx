import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// 🔹 Pages — urut dari login → fitur utama
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import ReservationSchedule from "./pages/ReservationSchedule";
import Report from "./pages/Report";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🏁 Default route: arahkan otomatis ke halaman Login */}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        {/* Halaman yang dilindungi (hanya bisa diakses jika sudah login) */}
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/Rooms"
          element={
            <PrivateRoute>
              <Rooms />
            </PrivateRoute>
          }
        />
        <Route
          path="/ReservationSchedule"
          element={
            <PrivateRoute>
              <ReservationSchedule />
            </PrivateRoute>
          }
        />
        <Route
          path="/Report"
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />
        <Route
          path="/Settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Halaman Auth (bebas diakses) */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        {/* 🚫 404 Fallback */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-2xl font-semibold text-gray-700">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}
