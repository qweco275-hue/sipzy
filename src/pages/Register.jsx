import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (password.length < 6) {
      setError("Kata sandi harus terdiri dari minimal 6 karakter.");
      return;
    }
    setLoading(true);
    try {
      const res = await register(name, email, phone);
      if (res.success) {
        navigate("/dashboard");
      } else {
        setError(res.error || "Gagal mendaftarkan akun keanggotaan.");
      }
    } catch {
      setError("Terjadi kendala teknis saat proses pendaftaran.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FFF9F3]">
      {
    /* Left Column: Brand & Lifestyle Visual Asset */
  }
      <div className="hidden lg:flex lg:col-span-6 relative bg-[#3D2117] overflow-hidden p-12 flex-col justify-between text-white">
        <img
    src="/src/assets/images/auth_coffee_lifestyle_1793559241062.jpg"
    alt="Coffee Lifestyle Sleman"
    referrerPolicy="no-referrer"
    className="absolute inset-0 w-full h-full object-cover opacity-60"
  />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E87832] to-[#9B421F] flex items-center justify-center text-white shadow-lg">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white font-mono">
            SIPZY
          </span>
        </div>

        <div className="relative z-10 space-y-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
            <span>Bonus Sambutan +150 Poin</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Gabung Ekosistem Kopi Sleman Terintegrasi.
          </h2>
          <p className="text-xs text-[#F5E7DA]/80 leading-relaxed">
            Daftar hari ini untuk mendapatkan kartu keanggotaan digital, QR Code instan, bonus 150 poin sambutan, dan diskon 50% untuk pesanan pertamamu di Sleman.
          </p>

          <div className="space-y-2 pt-2 text-xs text-[#F5E7DA]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Gratis selamanya — tanpa biaya berlangganan bulanan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dapatkan 1 poin setiap transaksi kelipatan Rp 10.000</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-[#F5E7DA]/60">
          © {(/* @__PURE__ */ new Date()).getFullYear()} SIPZY Indonesia · Sleman, D.I. Yogyakarta.
        </div>
      </div>

      {
    /* Right Column: Register Form */
  }
      <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-xs font-semibold text-[#9B421F] mb-4">
              ← Kembali ke Beranda SIPZY
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D2117] tracking-tight">
              Daftar Anggota Baru
            </h1>
            <p className="text-xs text-[#8B7468] mt-1">
              Mulai kumpulkan reward loyalitas di berbagai coffee shop dan roastery ternama Sleman.
            </p>
          </div>

          {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Nama Lengkap
              </label>
              <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Contoh: Bagus Wicaksono"
    className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#F5E7DA] text-xs font-medium text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
  />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Alamat Email
              </label>
              <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="nama@email.com"
    className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#F5E7DA] text-xs font-medium text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
  />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Nomor WhatsApp / HP
              </label>
              <input
    type="tel"
    required
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="+62 813-xxxx-xxxx"
    className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#F5E7DA] text-xs font-medium text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
  />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Minimal 6 karakter"
    className="w-full py-2.5 pl-3.5 pr-10 rounded-xl bg-white border border-[#F5E7DA] text-xs font-medium text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
  />
                <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7468] hover:text-[#3D2117]"
    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
  >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Ulangi Kata Sandi
              </label>
              <input
    type={showPassword ? "text" : "password"}
    required
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    placeholder="Masukkan ulang kata sandi"
    className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#F5E7DA] text-xs font-medium text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
  />
            </div>

            <div className="pt-2">
              <button
    type="submit"
    disabled={loading}
    className="w-full py-3 px-4 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
  >
                <span>{loading ? "Mendaftarkan Akun..." : "Daftar Sekarang & Klaim 150 Poin"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-[#8B7468]">
            Sudah memiliki akun anggota?{" "}
            <Link to="/login" className="font-bold text-[#9B421F] hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
