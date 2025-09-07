import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => navigate("/admin/login"), 3000);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 20, textAlign: "center", fontSize: 18 }}>
        Access Denied. Redirecting to login...
      </div>
    );
  }
  return children;
}
