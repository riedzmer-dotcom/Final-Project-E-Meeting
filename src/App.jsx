import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 
import PrivateRoute from "./components/PrivateRoute";

// Pages (ordered from auth → main features)
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import ReservationSchedule from "./pages/ReservationSchedule";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import MasterDataTest from "./pages/MasterDataTest";

export default function App() {
  return (
    <Router>

      {/* ======================================================
           GLOBAL TOAST NOTIFICATION
           Active on every page in the app
      ====================================================== */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "'Roboto', sans-serif",
            fontSize: "14px",
          },
        }}
      />

      {/* ======================================================
           ROUTING 
      ====================================================== */}
      <Routes>
        {/* 🏁 Default route: arahkan otomatis ke halaman Login */}
        <Route path="/" element={<Navigate to="/Login" replace />} />


        {/* ====================================================
             PROTECTED ROUTES (Require login)
             Wrapped with <PrivateRoute>
        ==================================================== */}
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

        {/* ====================================================
             PUBLIC ROUTES (Auth pages)
        ==================================================== */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/ResetPasswordConfirm" element={<ResetPasswordConfirm />} />

        {/* ====================================================
             DEVELOPMENT / TESTING PAGE
        ==================================================== */}
        <Route path="/MasterDataTest" element={<MasterDataTest />} />

        {/* ====================================================
             404 FALLBACK
        ==================================================== */}
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
