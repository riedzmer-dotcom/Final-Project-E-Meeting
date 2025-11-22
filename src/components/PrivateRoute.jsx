import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {

  /* ======================================================
       AUTH STATE
       - Validate token stored in localStorage
     ====================================================== */
  const token = localStorage.getItem("token");
  const location = useLocation();

  /* ======================================================
       REDIRECT IF NOT AUTHENTICATED
     ====================================================== */
  if (!token || token.trim() === "") {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  /* ======================================================
       ALLOW ACCESS WHEN AUTHENTICATED
     ====================================================== */
  return children;
}
