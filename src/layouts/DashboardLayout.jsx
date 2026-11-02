import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Compass,
  Gift,
  Tag,
  Clock,
  ShoppingBag,
  User,
  LogOut,
  Coffee,
  Menu,
  X,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { ToastContainer } from "../components/common/ToastContainer";
export const DashboardLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartTotalCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  const navItems = [
    { label: "Dasbor Member", path: "/dashboard", icon: LayoutDashboard },
    { label: "Loyalty Wallet", path: "/wallet", icon: Wallet },
    { label: "Jelajah Kedai Kopi", path: "/discover", icon: Compass },
    { label: "Katalog Hadiah", path: "/rewards", icon: Gift },
    { label: "Promosi Sleman", path: "/promotions", icon: Tag },
    { label: "Riwayat Pesanan", path: "/history", icon: Clock },
    { label: "Keranjang Saya", path: "/cart", icon: ShoppingBag, badge: cartTotalCount },
    { label: "Profil & Pengaturan", path: "/profile", icon: User }
  ];
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const isActive = (path) => location.pathname === path;
  return <div className="min-h-screen bg-[#FFF9F3] flex text-[#3D2117]">
      {
    /* Overlay Sidebar Mobile */
  }
      {sidebarOpen && <div
    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />}

      {
    /* Sidebar Navigasi */
  }
      <aside
    className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#F5E7DA] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
        {
    /* Header Brand */
  }
        <div className="h-20 px-6 border-b border-[#F5E7DA] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9B421F] to-[#E87832] flex items-center justify-center text-white shadow-md">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#3D2117] font-mono">
                  SIPZY
                </span>
                <span className="text-[10px] font-bold text-white bg-[#9B421F] px-1 rounded">
                  SLM
                </span>
              </div>
              <span className="block text-[10px] text-[#8B7468] tracking-wider uppercase font-semibold">
                Area Member Sleman
              </span>
            </div>
          </Link>
          <button
    onClick={() => setSidebarOpen(false)}
    className="p-1 rounded-lg text-[#8B7468] hover:bg-[#F5E7DA] lg:hidden"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Kartu Ringkas Pengguna di Sidebar */
  }
        <div className="p-4 mx-4 my-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA]">
          <div className="flex items-center gap-3">
            <img
    src={user.avatarUrl}
    alt={user.name}
    className="w-10 h-10 rounded-full object-cover border-2 border-[#E87832]/30"
  />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#3D2117] truncate">{user.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-[#E87832]" />
                <span className="text-[11px] font-semibold text-[#9B421F]">
                  Tier {user.membershipLevel}
                </span>
                <span className="text-[11px] text-[#8B7468]">·</span>
                <span className="text-[11px] font-mono font-bold text-[#3D2117]">
                  {user.points.toLocaleString("id-ID")} poin
                </span>
              </div>
            </div>
          </div>
        </div>

        {
    /* Tautan Navigasi */
  }
        <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return <Link
      key={item.path}
      to={item.path}
      onClick={() => setSidebarOpen(false)}
      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${active ? "bg-[#9B421F] text-white shadow-sm" : "text-[#8B7468] hover:bg-[#FFF9F3] hover:text-[#3D2117]"}`}
    >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#C85A2A]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== void 0 && item.badge > 0 && <span
      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${active ? "bg-white text-[#9B421F]" : "bg-[#E87832] text-white"}`}
    >
                    {item.badge}
                  </span>}
              </Link>;
  })}
        </div>

        {
    /* Tombol Keluar Akun */
  }
        <div className="p-4 border-t border-[#F5E7DA] space-y-1">
          <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
  >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun (Sign Out)</span>
          </button>
        </div>
      </aside>

      {
    /* Area Konten Utama */
  }
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {
    /* Header Atas */
  }
        <header className="sticky top-0 z-30 h-20 bg-[#FFF9F3]/90 backdrop-blur-md border-b border-[#F5E7DA] px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
    onClick={() => setSidebarOpen(true)}
    className="p-2 rounded-xl text-[#3D2117] hover:bg-[#F5E7DA] lg:hidden cursor-pointer"
    aria-label="Buka navigasi sidebar"
  >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-[#8B7468]">Area Member Sleman</span>
              <p className="text-sm font-bold text-[#3D2117]">Ekosistem Kopi Sleman, Yogyakarta</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
    to="/discover"
    className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#9B421F] hover:text-[#803517] bg-white px-3 py-1.5 rounded-xl border border-[#F5E7DA] shadow-sm"
  >
              <span>Jelajah Coffee Shop</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <Link
    to="/cart"
    className="relative p-2 rounded-xl bg-white border border-[#F5E7DA] hover:border-[#E87832]/40 text-[#3D2117] shadow-sm transition-colors cursor-pointer"
    aria-label="Lihat Keranjang"
  >
              <ShoppingBag className="w-4 h-4" />
              {cartTotalCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E87832] text-white text-[10px] font-bold font-mono flex items-center justify-center">
                  {cartTotalCount}
                </span>}
            </Link>

            <Link
    to="/wallet"
    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#9B421F] to-[#C85A2A] text-white shadow-sm hover:shadow transition-all"
  >
              <Wallet className="w-3.5 h-3.5" />
              <span className="text-xs font-mono font-bold tabular-nums">
                {user.points.toLocaleString("id-ID")} POIN
              </span>
            </Link>

            <Link to="/profile" className="shrink-0">
              <img
    src={user.avatarUrl}
    alt={user.name}
    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
  />
            </Link>
          </div>
        </header>

        {
    /* Tampilan Konten Halaman */
  }
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>;
};
