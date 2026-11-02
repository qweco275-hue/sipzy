import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Coffee,
  QrCode,
  Sparkles,
  ShieldCheck,
  RotateCw,
  CheckCircle2,
  Barcode,
  Wifi,
  ScanLine
} from "lucide-react";
export const DigitalLoyaltyCard = ({
  userName,
  memberId,
  memberSince,
  membershipLevel,
  points,
  compact = false,
  onViewWallet
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [scanState, setScanState] = useState("idle");
  const [pointsPulsed, setPointsPulsed] = useState(false);
  useEffect(() => {
    setPointsPulsed(true);
    const timer = setTimeout(() => setPointsPulsed(false), 1e3);
    return () => clearTimeout(timer);
  }, [points, membershipLevel]);
  const getTierAccent = (level) => {
    switch (level) {
      case "Black Diamond":
        return {
          name: "Black Diamond",
          badge: "from-zinc-300 via-amber-200 to-amber-500 text-black",
          border: "border-amber-400/50",
          glow: "from-[#0D0B0A] via-[#1A1615] to-[#0A0706]",
          cardShadow: "shadow-amber-500/10",
          chipColor: "from-amber-200 to-amber-500",
          ring: "text-amber-300"
        };
      case "Gold":
        return {
          name: "Tier Gold",
          badge: "from-[#F3C68F] via-[#E5A93B] to-[#B37418] text-[#2A1408]",
          border: "border-[#E87832]/50",
          glow: "from-[#23120A] via-[#1A0E08] to-[#120804]",
          cardShadow: "shadow-orange-950/40",
          chipColor: "from-[#F3C68F] to-[#B37418]",
          ring: "text-[#E5A93B]"
        };
      case "Silver":
        return {
          name: "Tier Silver",
          badge: "from-slate-200 via-slate-300 to-slate-400 text-slate-900",
          border: "border-slate-300/40",
          glow: "from-[#222124] via-[#18171B] to-[#111013]",
          cardShadow: "shadow-slate-900/30",
          chipColor: "from-slate-200 to-slate-400",
          ring: "text-slate-200"
        };
      case "Bronze":
      default:
        return {
          name: "Tier Bronze",
          badge: "from-[#D99A6C] to-[#8C532B] text-white",
          border: "border-[#9B421F]/40",
          glow: "from-[#24130C] via-[#1B0D07] to-[#120703]",
          cardShadow: "shadow-orange-950/30",
          chipColor: "from-[#D99A6C] to-[#8C532B]",
          ring: "text-[#D99A6C]"
        };
    }
  };
  const tierStyles = getTierAccent(membershipLevel);
  const renderQrPattern = (size, darkColor = "#3D2117", lightBg = "white") => <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" style={{ color: darkColor }}>
      {
    /* Sudut Kotak Pandu */
  }
      <rect x="5" y="5" width="28" height="28" rx="4" fill="currentColor" />
      <rect x="11" y="11" width="16" height="16" rx="2" fill={lightBg} />
      <rect x="15" y="15" width="8" height="8" rx="1" fill="currentColor" />

      <rect x="67" y="5" width="28" height="28" rx="4" fill="currentColor" />
      <rect x="73" y="11" width="16" height="16" rx="2" fill={lightBg} />
      <rect x="77" y="15" width="8" height="8" rx="1" fill="currentColor" />

      <rect x="5" y="67" width="28" height="28" rx="4" fill="currentColor" />
      <rect x="11" y="73" width="16" height="16" rx="2" fill={lightBg} />
      <rect x="15" y="77" width="8" height="8" rx="1" fill="currentColor" />

      {
    /* Matriks Pola */
  }
      <rect x="42" y="8" width="8" height="8" />
      <rect x="52" y="16" width="8" height="8" />
      <rect x="40" y="24" width="8" height="8" />
      <rect x="8" y="44" width="8" height="8" />
      <rect x="20" y="44" width="8" height="8" />
      <rect x="30" y="50" width="8" height="8" />
      <rect x="44" y="42" width="12" height="12" rx="2" />
      <rect x="62" y="40" width="8" height="8" />
      <rect x="74" y="48" width="8" height="8" />
      <rect x="84" y="42" width="8" height="8" />
      <rect x="40" y="68" width="8" height="8" />
      <rect x="52" y="74" width="8" height="8" />
      <rect x="46" y="86" width="8" height="8" />
      <rect x="68" y="72" width="8" height="8" />
      <rect x="80" y="80" width="8" height="8" />
    </svg>;
  const startScanSimulation = () => {
    setScanState("scanning");
    setTimeout(() => {
      setScanState("success");
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#E87832", "#9B421F", "#D4AF37"]
      });
    }, 1800);
  };
  const handleOpenScanner = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setScanState("idle");
    setShowQrModal(true);
  };
  return <div className="w-full">
      {
    /* Petunjuk Aksi Atas */
  }
      <div className="flex items-center justify-between text-xs text-[#8B7468] mb-2 px-1">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
          <span>Kartu Loyalitas Digital Sleman</span>
        </span>
        <button
    onClick={() => setIsFlipped(!isFlipped)}
    className="flex items-center gap-1.5 font-semibold text-[#9B421F] hover:text-[#803517] transition-colors cursor-pointer"
  >
          <RotateCw className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-180" />
          <span>{isFlipped ? "Lihat Sisi Depan" : "Putar Kartu (Flip)"}</span>
        </button>
      </div>

      {
    /* Kontainer Perspektif 3D */
  }
      <div className="perspective-1000 w-full">
        <div
    className="relative preserve-3d transition-transform duration-700 ease-out cursor-pointer"
    style={{
      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
    }}
    onClick={() => setIsFlipped(!isFlipped)}
  >
          {
    /* =========================================
       SISI DEPAN KARTU DIGITAL
      ========================================= */
  }
          <div
    className={`w-full backface-hidden rounded-3xl border ${tierStyles.border} bg-gradient-to-br ${tierStyles.glow} text-white shadow-2xl ${tierStyles.cardShadow} transition-all duration-300 select-none overflow-hidden relative ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
  >
            {
    /* Tekstur kisi-kisi metalik */
  }
            <div
    className="absolute inset-0 opacity-[0.06] pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, #FFF 1px, transparent 0)",
      backgroundSize: "24px 24px"
    }}
  />

            {
    /* Pantulan Cahaya Shimmer */
  }
            <div className="absolute -inset-full opacity-15 pointer-events-none animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent" />

            {
    /* Efek Pijar Lingkungan */
  }
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#E87832]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-[#9B421F]/30 rounded-full blur-3xl pointer-events-none" />

            {
    /* Baris Atas: Logo Brand & Level Membership */
  }
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E87832] to-[#9B421F] flex items-center justify-center shadow-lg shadow-orange-950/40 border border-white/20">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold tracking-wider text-lg uppercase text-white font-mono">
                      SIPZY
                    </span>
                    <span className="text-[10px] text-orange-200 font-bold uppercase tracking-wider bg-white/15 px-1.5 py-0.5 rounded">
                      SLEMAN
                    </span>
                  </div>
                  <p className="text-[11px] text-[#F5E7DA]/70 font-light">Satu Platform Kopi Yogyakarta</p>
                </div>
              </div>

              {
    /* Badge Tier */
  }
              <div
    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${tierStyles.badge} shadow-md flex items-center gap-1.5 transition-all duration-300`}
  >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{membershipLevel}</span>
              </div>
            </div>

            {
    /* Smart Chip & Ikon Contactless */
  }
            <div className="relative z-10 flex items-center gap-3 mt-4 mb-2">
              <div
    className={`w-9 h-7 rounded-md bg-gradient-to-br ${tierStyles.chipColor} border border-white/30 shadow-inner flex flex-col justify-between p-1`}
  >
                <div className="border-b border-black/20 h-1/2 w-full" />
                <div className="border-t border-black/20 h-1/2 w-full" />
              </div>
              <Wifi className="w-4 h-4 text-white/40 rotate-90" />
            </div>

            {
    /* Bagian Tengah: Saldo Poin & Nilai */
  }
            <div className={`relative z-10 ${compact ? "my-4" : "my-5 sm:my-6"}`}>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#F5E7DA]/70 font-medium">
                    Saldo Poin Loyalitas
                  </p>
                  <div
    className={`flex items-baseline gap-2 mt-1 transition-all duration-300 ${pointsPulsed ? "scale-105 text-amber-300" : ""}`}
  >
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono tabular-nums">
                      {points.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm font-bold text-[#E87832] tracking-wider uppercase">
                      POIN
                    </span>
                  </div>
                  <p className="text-xs text-[#F5E7DA]/80 mt-1">
                    Estimasi nilai: <span className="text-white font-semibold">Rp {(points * 100).toLocaleString("id-ID")}</span>
                  </p>
                </div>

                {
    /* Tombol QR Code Cepat */
  }
                <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleOpenScanner(e);
    }}
    className="p-2.5 bg-white/95 hover:bg-white rounded-2xl shadow-xl transition-all duration-200 transform hover:scale-105 group text-center cursor-pointer border border-white/40"
    title="Ketuk untuk scan di kasir coffee shop"
  >
                  <div className="p-0.5">{renderQrPattern(compact ? 44 : 52)}</div>
                  <span className="block text-[9px] font-bold text-[#3D2117] tracking-tight mt-0.5 group-hover:text-[#9B421F] flex items-center justify-center gap-0.5">
                    <ScanLine className="w-2.5 h-2.5" />
                    <span>KETUK QR</span>
                  </span>
                </button>
              </div>
            </div>

            {
    /* Baris Bawah: Identitas Member */
  }
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#F5E7DA]/80">
              <div>
                <p className="font-semibold text-white tracking-wide">{userName}</p>
                <div className="flex items-center gap-2 text-[11px] text-[#F5E7DA]/60 mt-0.5 font-mono">
                  <span>{memberId}</span>
                  <span>·</span>
                  <span>Sejak {memberSince}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/50 hidden sm:inline">Ketuk untuk putar ➔</span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <RotateCw className="w-3 h-3 text-[#E87832]" />
                </div>
              </div>
            </div>
          </div>

          {
    /* =========================================
       SISI BELAKANG KARTU DIGITAL
      ========================================= */
  }
          <div
    className={`w-full absolute inset-0 backface-hidden rotate-y-180 rounded-3xl border border-white/15 bg-gradient-to-br from-[#1A0E08] via-[#120804] to-[#0A0502] text-white shadow-2xl transition-all duration-300 select-none overflow-hidden flex flex-col justify-between ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
  >
            {
    /* Pita Magnetik Hitam */
  }
            <div className="absolute top-5 left-0 right-0 h-10 bg-gradient-to-r from-stone-950 via-stone-900 to-black border-y border-white/5 shadow-inner" />

            <div className="h-10 shrink-0" />

            {
    /* Bagian Tengah: Tanda Tangan & QR Code */
  }
            <div className="relative z-10 grid grid-cols-12 gap-4 items-center my-auto">
              <div className="col-span-7 space-y-2">
                <div className="bg-[#FFF9F3] text-[#3D2117] p-2.5 rounded-lg border border-[#F5E7DA] shadow-inner">
                  <p className="text-[8px] uppercase tracking-wider text-[#8B7468] font-mono">
                    Tanda Tangan Resmi Member
                  </p>
                  <p className="font-serif italic text-sm text-[#3D2117] font-semibold tracking-wide">
                    {userName}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#F5E7DA]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NFC & Bluetooth Kasir Sleman Terhubung</span>
                </div>
                <p className="text-[9px] text-[#F5E7DA]/50 leading-tight">
                  Berlaku di seluruh mitra coffee shop SIPZY di Sleman & Yogyakarta. Poin tidak dapat dipindahtangankan.
                </p>
              </div>

              {
    /* QR Code Interaktif di Belakang */
  }
              <div className="col-span-5 flex flex-col items-center">
                <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleOpenScanner(e);
    }}
    className="p-2 bg-white rounded-xl shadow-lg border border-[#F5E7DA] hover:scale-105 transition-transform group text-center cursor-pointer"
  >
                  {renderQrPattern(compact ? 68 : 80)}
                  <span className="block text-[8px] font-bold text-[#3D2117] mt-1 group-hover:text-[#9B421F]">
                    KETUK UNTUK SCAN
                  </span>
                </button>
              </div>
            </div>

            {
    /* Barcode Bawah & Tombol Balik */
  }
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Barcode className="w-8 h-8 text-white/70" />
                <span className="font-mono text-[10px] tracking-widest text-[#F5E7DA]/60">
                  {memberId}-SLM-01
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#E87832] font-semibold">
                <span>Sisi Depan</span>
                <RotateCw className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* =========================================
       MODAL PEMINDAI QR KASIR BARISTA
      ========================================= */
  }
      {showQrModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#FFF9F3] text-[#3D2117] max-w-sm w-full rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#9B421F]/20 relative">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#9B421F] text-white shadow-md">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#3D2117]">Pemindai Barista di Kasir</h3>
              <p className="text-xs text-[#8B7468]">
                Tunjukkan kode QR ini ke scanner barista untuk mengumpulkan poin atau klaim voucher kopi.
              </p>

              {
    /* Area QR dengan Animasi Laser Scanner */
  }
              <div className="relative my-5 p-6 bg-white rounded-2xl shadow-inner border border-[#F5E7DA] flex flex-col items-center justify-center overflow-hidden">
                {
    /* 4 Sudut Garis Bidik */
  }
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#E87832]" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#E87832]" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#E87832]" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#E87832]" />

                {
    /* Laser Scanning Beam */
  }
                {scanState === "scanning" && <div className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#E87832] to-transparent shadow-[0_0_12px_#E87832] animate-scan-laser pointer-events-none z-20" />}

                {
    /* Pola QR */
  }
                <div
    onClick={startScanSimulation}
    className="p-2 bg-white rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
    title="Klik untuk simulasi scan kasir"
  >
                  {renderQrPattern(150)}
                </div>

                <p className="text-xs font-mono font-bold tracking-widest text-[#3D2117] mt-3">
                  {memberId}
                </p>

                {
    /* Status Pemindaian */
  }
                {scanState === "idle" && <p className="text-[11px] text-[#8B7468] mt-1 flex items-center gap-1 font-medium">
                    <ScanLine className="w-3.5 h-3.5 text-[#E87832]" />
                    <span>Ketuk QR atau tombol di bawah untuk simulasi scan</span>
                  </p>}

                {scanState === "scanning" && <p className="text-[11px] text-[#E87832] mt-1 flex items-center gap-1 font-semibold animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Membaca Token Optik Barista...</span>
                  </p>}

                {scanState === "success" && <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center animate-in zoom-in">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Pemindaian Berhasil!</span>
                    </div>
                    <p className="text-[10px] text-emerald-700 mt-0.5">
                      Verifikasi Terhubung · Mitra Roastery Sleman #01
                    </p>
                  </div>}
              </div>

              {
    /* Ringkasan Data Member */
  }
              <div className="bg-[#F5E7DA]/60 rounded-xl p-3 text-left text-xs space-y-1 mb-5">
                <div className="flex justify-between">
                  <span className="text-[#8B7468]">Nama Anggota:</span>
                  <span className="font-semibold text-[#3D2117]">{userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B7468]">Tingkat Member:</span>
                  <span className="font-semibold text-[#9B421F]">{membershipLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B7468]">Saldo Terkini:</span>
                  <span className="font-semibold font-mono text-[#3D2117]">
                    {points.toLocaleString("id-ID")} Poin
                  </span>
                </div>
              </div>

              {
    /* Tombol Aksi */
  }
              <div className="flex gap-2.5">
                {scanState !== "success" ? <button
    type="button"
    onClick={startScanSimulation}
    disabled={scanState === "scanning"}
    className="flex-1 py-2.5 px-4 bg-[#E87832] hover:bg-[#d66923] text-white font-semibold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
  >
                    <ScanLine className="w-4 h-4" />
                    <span>{scanState === "scanning" ? "Memindai..." : "Simulasi Scan Kasir"}</span>
                  </button> : <button
    type="button"
    onClick={() => setScanState("idle")}
    className="flex-1 py-2.5 px-4 bg-white border border-[#F5E7DA] text-[#3D2117] font-semibold rounded-xl text-xs hover:bg-stone-50 cursor-pointer"
  >
                    Scan Ulang
                  </button>}

                <button
    type="button"
    onClick={() => setShowQrModal(false)}
    className="py-2.5 px-5 bg-[#3D2117] hover:bg-[#2A1408] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
  >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
