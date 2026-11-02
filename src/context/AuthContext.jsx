import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
const AuthContext = createContext(void 0);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  useEffect(() => {
    const current = authService.getCurrentUser();
    setUser(current);
  }, []);
  const refreshUser = () => {
    const current = authService.getCurrentUser();
    setUser(current);
  };
  const login = async (email, password) => {
    const res = authService.login(email, password);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || "Failed to sign in" };
  };
  const register = async (name, email, phone) => {
    const res = authService.register(name, email, phone);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || "Failed to register" };
  };
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  const updateProfile = (data) => {
    const updated = authService.updateProfile(data);
    if (updated) {
      setUser(updated);
    }
  };
  return <AuthContext.Provider
    value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      refreshUser
    }}
  >
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
