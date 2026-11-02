import { useState } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Lock,
  Sparkles,
  Camera,
  Save
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useApp();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "Sleman, D.I. Yogyakarta");
  const [notifications, setNotifications] = useState(user?.notificationsEnabled ?? true);
  const [emailUpdates, setEmailUpdates] = useState(user?.emailUpdates ?? true);
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState(null);
  if (!user) return null;
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      location,
      notificationsEnabled: notifications,
      emailUpdates
    });
    showToast("Profil Diperbarui", "Data akun pribadimu berhasil disimpan.", "success");
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currPassword) {
      setPasswordMsg({ success: false, text: "Harap masukkan kata sandi saat ini." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ success: false, text: "Kata sandi baru minimal harus 6 karakter." });
      return;
    }
    setPasswordMsg({ success: true, text: "Kata sandi berhasil diperbarui!" });
    setCurrPassword("");
    setNewPassword("");
    showToast("Keamanan Akun", "Kata sandi akunmu telah berhasil diubah.", "success");
  };
  return <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Akun & Preferensi
        </span>
        <h1 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
          Profil & Pengaturan
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7468] mt-1">
          Kelola informasi identitas, tingkatan loyalty member, dan preferensi notifikasi SIPZY Sleman.
        </p>
      </div>

      {
    /* Profile Overview Card */
  }
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E7DA] shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
    src={user.avatarUrl}
    alt={user.name}
    className="w-24 h-24 rounded-3xl object-cover border-4 border-[#FFF9F3] shadow-md"
  />
          <button
    onClick={() => showToast("Foto Profil Diperbarui", "Sinkronisasi foto profil berhasil.", "info")}
    className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#9B421F] text-white shadow-md hover:bg-[#803517] cursor-pointer"
    title="Ganti foto"
  >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-[#3D2117]">{user.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F5E7DA] text-[#9B421F] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E87832]" />
              Member {user.membershipLevel}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#8B7468] mt-2 font-mono">
            <span>ID Member: {user.memberId}</span>
            <span>·</span>
            <span>Bergabung {user.memberSince}</span>
            <span>·</span>
            <span className="font-bold text-[#9B421F]">{user.points.toLocaleString("id-ID")} POIN</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {
    /* Personal Details Form */
  }
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E7DA] shadow-xs space-y-6">
          <h3 className="font-bold text-sm text-[#3D2117]">Informasi Pribadi</h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#8B7468] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full py-2.5 pl-9 pr-3.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-medium text-[#3D2117] focus:outline-none focus:border-[#9B421F]"
  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8B7468] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full py-2.5 pl-9 pr-3.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-medium text-[#3D2117] focus:outline-none focus:border-[#9B421F]"
  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Nomor WhatsApp / HP
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8B7468] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full py-2.5 pl-9 pr-3.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-medium text-[#3D2117] focus:outline-none focus:border-[#9B421F]"
  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Wilayah Domisili Favorit
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8B7468] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full py-2.5 pl-9 pr-3.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-medium text-[#3D2117] focus:outline-none focus:border-[#9B421F]"
  />
              </div>
            </div>

            <div className="pt-2">
              <button
    type="submit"
    className="py-2.5 px-5 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
  >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>

        {
    /* Security & Preferences Column */
  }
        <div className="md:col-span-5 space-y-6">
          {
    /* Preferences */
  }
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E7DA] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#3D2117]">Preferensi Notifikasi</h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div>
                  <p className="font-semibold text-[#3D2117]">Pembaruan Status Pesanan</p>
                  <p className="text-[11px] text-[#8B7468]">Beri tahu saat barista mulai meracik kopi</p>
                </div>
                <input
    type="checkbox"
    checked={notifications}
    onChange={(e) => setNotifications(e.target.checked)}
    className="w-4 h-4 accent-[#9B421F]"
  />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer pt-2 border-t border-[#F5E7DA]/60">
                <div>
                  <p className="font-semibold text-[#3D2117]">Promo & Poin Ganda Sleman</p>
                  <p className="text-[11px] text-[#8B7468]">Pengingat diskon dan promo akhir pekan</p>
                </div>
                <input
    type="checkbox"
    checked={emailUpdates}
    onChange={(e) => setEmailUpdates(e.target.checked)}
    className="w-4 h-4 accent-[#9B421F]"
  />
              </label>
            </div>
          </div>

          {
    /* Change Password Simulation */
  }
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E7DA] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#3D2117] flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#C85A2A]" />
              <span>Perbarui Kata Sandi</span>
            </h3>

            {passwordMsg && <p
    className={`text-[11px] p-2 rounded-lg font-medium ${passwordMsg.success ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}
  >
                {passwordMsg.text}
              </p>}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3D2117] mb-1">
                  Kata Sandi Saat Ini
                </label>
                <input
    type="password"
    value={currPassword}
    onChange={(e) => setCurrPassword(e.target.value)}
    placeholder="••••••••"
    className="w-full py-2 px-3 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs focus:outline-none focus:border-[#9B421F]"
  />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3D2117] mb-1">
                  Kata Sandi Baru
                </label>
                <input
    type="password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    placeholder="Minimal 6 karakter"
    className="w-full py-2 px-3 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs focus:outline-none focus:border-[#9B421F]"
  />
              </div>

              <button
    type="submit"
    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] transition-colors cursor-pointer"
  >
                Simpan Sandi Baru
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
