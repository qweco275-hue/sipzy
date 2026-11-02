import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Coffee,
  CheckCircle2,
  Plus,
  Minus,
  Zap
} from "lucide-react";
import { DigitalLoyaltyCard } from "../components/loyalty/DigitalLoyaltyCard";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { loyaltyService } from "../services/loyaltyService";
import { authService } from "../services/authService";
export const Wallet = () => {
  const { user, refreshUser } = useAuth();
  const { transactions, showToast } = useApp();
  if (!user) return null;
  const tierInfo = loyaltyService.getNextTierInfo(user.points, user.membershipLevel);
  const handleSimulatePoints = (amount, reason) => {
    const newPoints = Math.max(0, user.points + amount);
    authService.updatePoints(newPoints);
    loyaltyService.addTransaction({
      userId: user.id,
      type: amount > 0 ? "DIPEROLEH" : "DITUKARKAN",
      title: reason,
      points: amount,
      status: "Selesai"
    });
    refreshUser();
    showToast(
      amount > 0 ? `+${amount} Poin Diperoleh!` : `${amount} Poin Ditukarkan`,
      `${reason}. Saldo Baru: ${newPoints.toLocaleString("id-ID")} Poin (${tierInfo.currentTier})`,
      amount > 0 ? "success" : "info"
    );
  };
  const handleSimulateTier = (targetTier) => {
    let targetPoints = 150;
    if (targetTier === "Silver") targetPoints = 450;
    else if (targetTier === "Gold") targetPoints = 1200;
    else if (targetTier === "Black Diamond") targetPoints = 2200;
    authService.updatePoints(targetPoints);
    loyaltyService.addTransaction({
      userId: user.id,
      type: "BONUS",
      title: `Pencapaian Level Baru: ${targetTier}`,
      points: targetPoints - user.points,
      status: "Selesai"
    });
    refreshUser();
    showToast(`Level Membership Naik ke ${targetTier}!`, `Tampilan kartu loyalitas digital Anda telah berubah otomatis secara real-time.`, "success");
  };
  return <div className="space-y-10 max-w-5xl mx-auto">
      {
    /* Judul Halaman */
  }
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Pass & Dompet Loyalitas Sleman
        </span>
        <h1 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
          Loyalty Wallet Digital
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7468] mt-1">
          Kartu digital Anda di seluruh coffee shop dan roastery mitra di Sleman, Yogyakarta. Ketuk kartu untuk membalik sisi depan & belakang, atau ketuk QR code untuk simulasi scan kasir.
        </p>
      </div>

      {
    /* 1. KARTU DIGITAL UTAMA (HERO INTERAKTIF) */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <DigitalLoyaltyCard
    userName={user.name}
    memberId={user.memberId}
    memberSince={user.memberSince}
    membershipLevel={user.membershipLevel}
    points={user.points}
  />
        </div>

        {
    /* 2. RINGKASAN POIN & AKSI CEPAT */
  }
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E7DA] shadow-sm space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8B7468] mb-1">
              <span>Target Level Berikutnya</span>
              <span className="font-bold text-[#9B421F]">{tierInfo.nextTier}</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#F5E7DA] overflow-hidden">
              <div
    className="h-full rounded-full bg-gradient-to-r from-[#9B421F] to-[#E87832] transition-all duration-500"
    style={{ width: `${tierInfo.progress}%` }}
  />
            </div>
            <div className="flex justify-between text-[11px] text-[#8B7468] mt-1.5 font-mono">
              <span>{user.points.toLocaleString("id-ID")} POIN</span>
              {tierInfo.pointsNeeded > 0 ? <span>Kurang {tierInfo.pointsNeeded.toLocaleString("id-ID")} poin ke {tierInfo.nextTier}</span> : <span className="text-amber-600 font-semibold">Tingkat Tertinggi Dicapai!</span>}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8B7468]">Estimasi Nilai Hadiah:</span>
              <span className="text-sm font-bold font-mono text-[#3D2117]">
                Rp {(user.points * 100).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8B7468]">Tingkat Perolehan:</span>
              <span className="font-semibold text-[#9B421F]">1 Poin per Rp 10.000</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
    to="/rewards"
    className="w-full py-3 px-4 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
  >
              <Gift className="w-4 h-4" />
              <span>Tukarkan Poin dengan Hadiah</span>
            </Link>
            <Link
    to="/discover"
    className="w-full py-3 px-4 rounded-2xl bg-[#FFF9F3] hover:bg-[#F5E7DA] text-[#3D2117] border border-[#F5E7DA] font-semibold text-xs flex items-center justify-center gap-2 transition-all"
  >
              <Coffee className="w-4 h-4 text-[#C85A2A]" />
              <span>Pesan Kopi & Kumpulkan Poin</span>
            </Link>
          </div>
        </div>
      </div>

      {
    /* 3. STUDIO SIMULASI REAL-TIME (PENGUJIAN KARTU & TIER) */
  }
      <div className="bg-gradient-to-br from-[#FFF9F3] to-[#F5E7DA]/50 rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-[#3D2117] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#E87832]" />
              <span>Studio Simulasi Poin Real-Time</span>
            </h3>
            <p className="text-xs text-[#8B7468] mt-0.5">
              Uji bagaimana kartu digital dan indikator level bereaksi seketika terhadap perubahan saldo poin.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#9B421F] font-bold">
            Saldo Sekarang: {user.points.toLocaleString("id-ID")} POIN
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <button
    onClick={() => handleSimulatePoints(50, "Seduhan Manual V60 Kaliurang")}
    className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer"
  >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>+50 Poin (Kopi)</span>
          </button>

          <button
    onClick={() => handleSimulatePoints(250, "Beli Biji Kopi Merapi 250g")}
    className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer"
  >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>+250 Poin (Beans)</span>
          </button>

          <button
    onClick={() => handleSimulatePoints(-500, "Penukaran Voucher Kopi Gratis")}
    disabled={user.points < 500}
    className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer disabled:opacity-50"
  >
            <Minus className="w-3.5 h-3.5 text-[#9B421F]" />
            <span>-500 Poin (Tukar)</span>
          </button>

          <button
    onClick={() => handleSimulatePoints(1e3, "Bonus Sesi Cupping Eksklusif")}
    className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer"
  >
            <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
            <span>+1.000 Poin (Naik Tier)</span>
          </button>
        </div>

        {
    /* Tombol Pindah Tier Instan */
  }
        <div className="pt-3 border-t border-[#F5E7DA]/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-[#8B7468]">Ganti Tema Level:</span>
          {["Bronze", "Silver", "Gold", "Black Diamond"].map((tier) => <button
    key={tier}
    onClick={() => handleSimulateTier(tier)}
    className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${user.membershipLevel === tier ? "bg-[#9B421F] text-white shadow-xs" : "bg-white hover:bg-stone-50 text-[#8B7468] border border-[#F5E7DA]"}`}
  >
              {tier}
            </button>)}
        </div>
      </div>

      {
    /* 4. HAK ISTIMEWA MEMBER */
  }
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E7DA] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#3D2117]">
              Hak Istimewa Member {user.membershipLevel}
            </h2>
            <p className="text-xs text-[#8B7468] mt-0.5">
              Nikmati berbagai keuntungan seiring meningkatnya aktivitas ngopimu di Sleman.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F5E7DA] text-[#9B421F]">
            {user.membershipLevel} Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">Voucher Kopi Gratis 100%</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Dapat ditukarkan di seluruh gerai mitra roastery se-Kabupaten Sleman.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">Poin Ganda Akhir Pekan</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Dapatkan 2 poin untuk tiap Rp 10.000 belanja di hari Sabtu dan Minggu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">Prioritas Antrean Pickup</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Lewati antrean kasir di jam sibuk dengan pemesanan cepat via aplikasi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">Kelas Cupping Roaster</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Undangan khusus ke sesi pencicipan biji kopi nusantara musiman.
            </p>
          </div>
        </div>
      </div>

      {
    /* 5. MUTASI & RIWAYAT POIN */
  }
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E7DA] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#3D2117]">Riwayat Aktivitas Poin</h2>
            <p className="text-xs text-[#8B7468] mt-0.5">
              Catatan mutasi transparan perolehan, penukaran, dan bonus poin.
            </p>
          </div>
          <span className="text-xs text-[#8B7468] font-mono">
            {transactions.length} mutasi tercatat
          </span>
        </div>

        <div className="divide-y divide-[#F5E7DA]/70">
          {transactions.map((tx) => {
    const isEarned = tx.type === "DIPEROLEH";
    const isRedeemed = tx.type === "DITUKARKAN";
    return <div
      key={tx.id}
      className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0 hover:bg-[#FFF9F3]/50 px-2 rounded-xl transition-colors"
    >
                <div className="flex items-center gap-3.5">
                  <div
      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${isEarned ? "bg-emerald-50 text-emerald-700" : isRedeemed ? "bg-amber-50 text-[#9B421F]" : "bg-purple-50 text-purple-700"}`}
    >
                    {isEarned && <ArrowDownLeft className="w-5 h-5 text-emerald-600" />}
                    {isRedeemed && <ArrowUpRight className="w-5 h-5 text-[#9B421F]" />}
                    {tx.type === "BONUS" && <Sparkles className="w-5 h-5 text-purple-600" />}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#3D2117]">{tx.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#8B7468] mt-0.5">
                      <span>{tx.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase font-semibold tracking-wider text-[10px]">
                        {tx.type}
                      </span>
                      {tx.referenceId && <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{tx.referenceId}</span>
                        </>}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
      className={`font-mono font-bold text-sm tabular-nums ${tx.points > 0 ? "text-emerald-700" : "text-[#9B421F]"}`}
    >
                    {tx.points > 0 ? `+${tx.points}` : tx.points} POIN
                  </span>
                  <p className="text-[10px] text-emerald-600 font-medium">{tx.status}</p>
                </div>
              </div>;
  })}
        </div>
      </div>
    </div>;
};
