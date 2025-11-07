import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Kalau tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  // Kalau ada token, tampilkan halaman aslinya
  return children;
}
