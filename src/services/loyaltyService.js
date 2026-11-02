import { INITIAL_TRANSACTIONS, REWARDS_DATA, PROMOTIONS_DATA } from "../data/mockData";
import { authService } from "./authService";
const TRANSACTIONS_KEY = "sipzy_loyalty_transactions";
const REDEMPTIONS_KEY = "sipzy_user_redemptions";
const CLAIMED_PROMOS_KEY = "sipzy_claimed_promos";
export const loyaltyService = {
  getRewards() {
    return REWARDS_DATA;
  },
  getRewardById(id) {
    return REWARDS_DATA.find((r) => r.id === id);
  },
  getPromotions() {
    return PROMOTIONS_DATA;
  },
  getTransactions() {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    if (!raw) {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  },
  addTransaction(tx) {
    const transactions = this.getTransactions();
    const newTx = {
      ...tx,
      id: `tx_${Date.now()}`,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    };
    const updated = [newTx, ...transactions];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
    return newTx;
  },
  getRedemptions() {
    const raw = localStorage.getItem(REDEMPTIONS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },
  redeemReward(rewardId, user) {
    const reward = this.getRewardById(rewardId);
    if (!reward) return { success: false, error: "Reward tidak ditemukan." };
    if (user.points < reward.pointsRequired) {
      return {
        success: false,
        error: `Saldo poin tidak mencukupi. Anda memiliki ${user.points.toLocaleString("id-ID")} poin, reward ini membutuhkan ${reward.pointsRequired.toLocaleString("id-ID")} poin.`
      };
    }
    const remainingPoints = user.points - reward.pointsRequired;
    const updatedUser = authService.updatePoints(remainingPoints);
    this.addTransaction({
      userId: user.id,
      type: "DITUKARKAN",
      title: `Penukaran ${reward.title}`,
      points: -reward.pointsRequired,
      status: "Selesai"
    });
    const redemption = {
      id: `rdm_${Date.now()}`,
      userId: user.id,
      rewardId: reward.id,
      title: reward.title,
      pointsSpent: reward.pointsRequired,
      code: `${reward.voucherCode}-${Math.floor(100 + Math.random() * 900)}`,
      redeemedAt: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
      expiresAt: "Berlaku 30 hari ke depan",
      status: "Aktif"
    };
    const redemptions = this.getRedemptions();
    localStorage.setItem(REDEMPTIONS_KEY, JSON.stringify([redemption, ...redemptions]));
    return {
      success: true,
      redemption,
      updatedUser: updatedUser || void 0
    };
  },
  getClaimedPromos() {
    const raw = localStorage.getItem(CLAIMED_PROMOS_KEY);
    return raw ? JSON.parse(raw) : ["SLEMANKOP1"];
  },
  claimPromo(promoCode) {
    const claimed = this.getClaimedPromos();
    if (!claimed.includes(promoCode)) {
      const updated = [...claimed, promoCode];
      localStorage.setItem(CLAIMED_PROMOS_KEY, JSON.stringify(updated));
      return updated;
    }
    return claimed;
  },
  getNextTierInfo(currentPoints, tier) {
    switch (tier) {
      case "Bronze":
        return {
          currentTier: "Bronze",
          nextTier: "Silver",
          pointsNeeded: Math.max(0, 400 - currentPoints),
          threshold: 400,
          progress: Math.min(100, Math.round(currentPoints / 400 * 100))
        };
      case "Silver":
        return {
          currentTier: "Silver",
          nextTier: "Gold",
          pointsNeeded: Math.max(0, 1e3 - currentPoints),
          threshold: 1e3,
          progress: Math.min(100, Math.round(currentPoints / 1e3 * 100))
        };
      case "Gold":
        return {
          currentTier: "Gold",
          nextTier: "Black Diamond",
          pointsNeeded: Math.max(0, 2e3 - currentPoints),
          threshold: 2e3,
          progress: Math.min(100, Math.round(currentPoints / 2e3 * 100))
        };
      case "Black Diamond":
      default:
        return {
          currentTier: "Black Diamond",
          nextTier: "Level Puncak (VIP)",
          pointsNeeded: 0,
          threshold: 2e3,
          progress: 100
        };
    }
  }
};
