import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Coffee, ShoppingBag, User as UserIcon, LogOut, LayoutDashboard, Wallet, CreditCard, ChevronDown, Menu, X, Sparkles, Home, Compass, } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartTotalCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navLinks = [
    { label: "Beranda", path: "/" },
    { label: "Jelajah Kedai", path: "/discover" },
    { label: "Rewards", path: "/rewards" },
    { label: "Promosi", path: "/promotions" },
    { label: "Tentang Kami", path: "/about" }
  ];
  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate("/");
  };
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  return <header className="sticky top-0 z-40 w-full bg-[#FFF9F3]/90 backdrop-blur-md border-b border-[#F5E7DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {
    /* Zona 1: Logo & Brand Sleman */
  }
        <Link
    to="/"
    className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group cursor-pointer"
  >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9B421F] to-[#E87832] flex items-center justify-center text-white shadow-md shadow-orange-950/20 group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-[#3D2117] group-hover:text-[#9B421F] transition-colors leading-none font-mono">
                SIPZY
              </span>
            </div>
            <span className="text-[10px] text-[#8B7468] tracking-wider uppercase mt-1 font-medium">
              Satu Platform Kopi
            </span>
          </div>
        </Link>

        {
    /* Zona 2: Navigasi Menu Bahasa Indonesia */
  }
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#8B7468]">
          {navLinks.map((link) => <Link
    key={link.path}
    to={link.path}
    className={`whitespace-nowrap shrink-0 transition-colors py-1 ${isActive(link.path) ? "text-[#9B421F] font-bold border-b-2 border-[#9B421F]" : "hover:text-[#3D2117]"}`}
  >
              {link.label}
            </Link>)}
        </nav>

        {
    /* Zona 3: Aksi & Akun Pengguna */
  }
        <div className="flex items-center gap-3 shrink-0">
          {
    /* Ikon Keranjang dengan Badge Live */
  }
          <Link
    to="/cart"
    className="relative p-2.5 rounded-full hover:bg-[#F5E7DA] text-[#3D2117] transition-colors cursor-pointer"
    aria-label="Buka keranjang pesanan"
  >
            <ShoppingBag className="w-5 h-5" />
            {cartTotalCount > 0 && <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#E87832] text-white text-[11px] font-bold font-mono flex items-center justify-center shadow-sm animate-in zoom-in">
                {cartTotalCount}
              </span>}
          </Link>

          {isAuthenticated && user ? <div className="relative">
              <button
    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
    className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full bg-white border border-[#F5E7DA] hover:border-[#E87832]/40 shadow-sm transition-all cursor-pointer"
  >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-[#3D2117] leading-none">{user.name.split(" ")[0]}</p>
                  <p className="text-[10px] font-mono font-semibold text-[#9B421F] mt-0.5">
                    {user.points.toLocaleString("id-ID")} poin
                  </p>
                </div>
                <img
    src={user.avatarUrl}
    alt={user.name}
    className="w-8 h-8 rounded-full object-cover border border-[#9B421F]/20"
  />
                <ChevronDown className="w-3.5 h-3.5 text-[#8B7468] mr-1" />
              </button>

              {
    /* Dropdown Menu Pengguna */
  }
              {profileDropdownOpen && <>
                  <div
    className="fixed inset-0 z-40"
    onClick={() => setProfileDropdownOpen(false)}
  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#F5E7DA] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-[#F5E7DA]/60">
                      <p className="text-xs font-bold text-[#3D2117] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#8B7468] truncate">{user.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF9F3] text-[10px] font-bold text-[#9B421F] border border-[#F5E7DA]">
                        <Sparkles className="w-3 h-3 text-[#E87832]" />
                        <span>Member {user.membershipLevel}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
    to="/dashboard"
    onClick={() => setProfileDropdownOpen(false)}
    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3D2117] hover:bg-[#FFF9F3] hover:text-[#9B421F]"
  >
                        <LayoutDashboard className="w-4 h-4 text-[#C85A2A]" />
                        <span>Dasbor Member</span>
                      </Link>
                      <Link
    to="/wallet"
    onClick={() => setProfileDropdownOpen(false)}
    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3D2117] hover:bg-[#FFF9F3] hover:text-[#9B421F]"
  >
                        <Wallet className="w-4 h-4 text-[#C85A2A]" />
                        <span>Loyalty Wallet</span>
                      </Link>
                      <Link
    to="/history"
    onClick={() => setProfileDropdownOpen(false)}
    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3D2117] hover:bg-[#FFF9F3] hover:text-[#9B421F]"
  >
                        <CreditCard className="w-4 h-4 text-[#C85A2A]" />
                        <span>Riwayat Pesanan</span>
                      </Link>
                      <Link
    to="/profile"
    onClick={() => setProfileDropdownOpen(false)}
    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3D2117] hover:bg-[#FFF9F3] hover:text-[#9B421F]"
  >
                        <UserIcon className="w-4 h-4 text-[#C85A2A]" />
                        <span>Profil & Pengaturan</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-[#F5E7DA]/60">
                      <button
    onClick={handleLogout}
    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left cursor-pointer"
  >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar Akun</span>
                      </button>
                    </div>
                  </div>
                </>}
            </div> : <div className="flex items-center gap-2.5">
              <Link
    to="/login"
    className="text-xs font-semibold text-[#3D2117] hover:text-[#9B421F] px-3 py-2 transition-colors whitespace-nowrap"
  >
                Masuk
              </Link>
              <Link
    to="/register"
    className="px-4 py-2 text-xs font-semibold text-white bg-[#9B421F] hover:bg-[#803517] rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap"
  >
                Gabung SIPZY
              </Link>
            </div>}

          {
    /* Menu Hamburger Mobile */
  }
          <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="md:hidden p-2 rounded-xl text-[#3D2117] hover:bg-[#F5E7DA] transition-colors"
    aria-label="Buka menu navigasi"
  >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {
    /* Menu Drawer Mobile */
  }
      {mobileMenuOpen && <div className="md:hidden bg-white border-b border-[#F5E7DA] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top">
          {navLinks.map((link) => <Link
    key={link.path}
    to={link.path}
    onClick={() => setMobileMenuOpen(false)}
    className={`block px-3 py-2 rounded-xl text-sm font-medium ${isActive(link.path) ? "bg-[#FFF9F3] text-[#9B421F] font-bold" : "text-[#3D2117] hover:bg-[#F5E7DA]/50"}`}
  >
              {link.label}
            </Link>)}
          {isAuthenticated ? <div className="pt-2 border-t border-[#F5E7DA] space-y-1">
              <Link
    to="/dashboard"
    onClick={() => setMobileMenuOpen(false)}
    className="block px-3 py-2 text-sm font-medium text-[#9B421F]"
  >
                Dasbor Member
              </Link>
              <Link
    to="/wallet"
    onClick={() => setMobileMenuOpen(false)}
    className="block px-3 py-2 text-sm font-medium text-[#3D2117]"
  >
                Loyalty Wallet ({user?.points} poin)
              </Link>
              <button
    onClick={() => {
      handleLogout();
      setMobileMenuOpen(false);
    }}
    className="block w-full text-left px-3 py-2 text-sm font-medium text-red-600"
  >
                Keluar Akun
              </button>
            </div> : <div className="pt-2 border-t border-[#F5E7DA] flex gap-2">
              <Link
    to="/login"
    onClick={() => setMobileMenuOpen(false)}
    className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-white border border-[#F5E7DA]"
  >
                Masuk
              </Link>
              <Link
    to="/register"
    onClick={() => setMobileMenuOpen(false)}
    className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#9B421F] rounded-xl"
  >
                Daftar Gratis
              </Link>
            </div>}
        </div>}
    </header>;
    {/* MOBILE BOTTOM NAVIGATION */}
<nav
  className="md:hidden fixed bottom-0 left-0 right-0 z-[70]
  bg-white/95 backdrop-blur-xl
  border-t border-[#F1E2D6]
  shadow-[0_-8px_25px_rgba(61,33,23,0.08)]"
  style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
>
  <div className="grid grid-cols-5 max-w-lg mx-auto px-2 pt-2 pb-1">

    {[
      {
        label: "Beranda",
        path: "/",
        icon: Home,
        active: location.pathname === "/"
      },
      {
        label: "Jelajah",
        path: "/discover",
        icon: Compass,
        active: location.pathname.startsWith("/discover")
      },
      {
        label: isAuthenticated ? "Wallet" : "Rewards",
        path: isAuthenticated ? "/wallet" : "/rewards",
        icon: Wallet,
        active: location.pathname.startsWith(
          isAuthenticated ? "/wallet" : "/rewards"
        )
      },
      {
        label: "Riwayat",
        path: isAuthenticated ? "/history" : "/promotions",
        icon: CreditCard,
        active: location.pathname.startsWith(
          isAuthenticated ? "/history" : "/promotions"
        )
      },
      {
        label: "Profil",
        path: isAuthenticated ? "/profile" : "/login",
        icon: UserIcon,
        active: location.pathname.startsWith(
          isAuthenticated ? "/profile" : "/login"
        )
      }
    ].map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.label}
          to={item.path}
          className={`flex flex-col items-center justify-center
          gap-1 py-2 rounded-xl transition-all duration-200
          ${
            item.active
              ? "text-[#9B421F]"
              : "text-[#A89487] hover:text-[#9B421F]"
          }`}
        >
          <div
            className={`flex items-center justify-center
            w-10 h-7 rounded-xl transition-all
            ${
              item.active
                ? "bg-[#FFF0E5]"
                : "bg-transparent"
            }`}
          >
            <Icon
              size={21}
              strokeWidth={item.active ? 2.5 : 1.8}
            />
          </div>

          <span
            className={`text-[10px] tracking-wide
            ${
              item.active
                ? "font-bold"
                : "font-medium"
            }`}
          >
            {item.label}
          </span>
        </Link>
      );
    })}

  </div>
</nav>
};
