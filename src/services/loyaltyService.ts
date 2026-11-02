import { LoyaltyTransaction, Reward, UserRedemption, Promotion, User } from '../types';
import { INITIAL_TRANSACTIONS, REWARDS_DATA, PROMOTIONS_DATA } from '../data/mockData';
import { authService } from './authService';

const TRANSACTIONS_KEY = 'sipzy_loyalty_transactions';
const REDEMPTIONS_KEY = 'sipzy_user_redemptions';
const CLAIMED_PROMOS_KEY = 'sipzy_claimed_promos';

export const loyaltyService = {
  getRewards(): Reward[] {
    return REWARDS_DATA;
  },

  getRewardById(id: string): Reward | undefined {
    return REWARDS_DATA.find((r) => r.id === id);
  },

  getPromotions(): Promotion[] {
    return PROMOTIONS_DATA;
  },

  getTransactions(): LoyaltyTransaction[] {
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

  addTransaction(tx: Omit<LoyaltyTransaction, 'id' | 'date'>): LoyaltyTransaction {
    const transactions = this.getTransactions();
    const newTx: LoyaltyTransaction = {
      ...tx,
      id: `tx_${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    const updated = [newTx, ...transactions];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
    return newTx;
  },

  getRedemptions(): UserRedemption[] {
    const raw = localStorage.getItem(REDEMPTIONS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  redeemReward(
    rewardId: string,
    user: User
  ): { success: boolean; error?: string; redemption?: UserRedemption; updatedUser?: User } {
    const reward = this.getRewardById(rewardId);
    if (!reward) return { success: false, error: 'Reward not found' };

    if (user.points < reward.pointsRequired) {
      return {
        success: false,
        error: `Insufficient point balance. You have ${user.points.toLocaleString()} pts, but this reward requires ${reward.pointsRequired.toLocaleString()} pts.`,
      };
    }

    const remainingPoints = user.points - reward.pointsRequired;
    const updatedUser = authService.updatePoints(remainingPoints);

    // Record Loyalty Transaction
    this.addTransaction({
      userId: user.id,
      type: 'REDEEMED',
      title: `Redeemed ${reward.title}`,
      points: -reward.pointsRequired,
      status: 'Completed',
    });

    // Generate unique redemption voucher
    const redemption: UserRedemption = {
      id: `rdm_${Date.now()}`,
      userId: user.id,
      rewardId: reward.id,
      title: reward.title,
      pointsSpent: reward.pointsRequired,
      code: `${reward.voucherCode}-${Math.floor(100 + Math.random() * 900)}`,
      redeemedAt: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      expiresAt: 'Valid for 30 days',
      status: 'Active',
    };

    const redemptions = this.getRedemptions();
    localStorage.setItem(REDEMPTIONS_KEY, JSON.stringify([redemption, ...redemptions]));

    return {
      success: true,
      redemption,
      updatedUser: updatedUser || undefined,
    };
  },

  getClaimedPromos(): string[] {
    const raw = localStorage.getItem(CLAIMED_PROMOS_KEY);
    return raw ? JSON.parse(raw) : ['SIPZYFIRST'];
  },

  claimPromo(promoCode: string): string[] {
    const claimed = this.getClaimedPromos();
    if (!claimed.includes(promoCode)) {
      const updated = [...claimed, promoCode];
      localStorage.setItem(CLAIMED_PROMOS_KEY, JSON.stringify(updated));
      return updated;
    }
    return claimed;
  },

  getNextTierInfo(currentPoints: number, tier: User['membershipLevel']) {
    switch (tier) {
      case 'Bronze':
        return {
          currentTier: 'Bronze',
          nextTier: 'Silver',
          pointsNeeded: Math.max(0, 400 - currentPoints),
          threshold: 400,
          progress: Math.min(100, Math.round((currentPoints / 400) * 100)),
        };
      case 'Silver':
        return {
          currentTier: 'Silver',
          nextTier: 'Gold',
          pointsNeeded: Math.max(0, 1000 - currentPoints),
          threshold: 1000,
          progress: Math.min(100, Math.round((currentPoints / 1000) * 100)),
        };
      case 'Gold':
        return {
          currentTier: 'Gold',
          nextTier: 'Black Diamond',
          pointsNeeded: Math.max(0, 2000 - currentPoints),
          threshold: 2000,
          progress: Math.min(100, Math.round((currentPoints / 2000) * 100)),
        };
      case 'Black Diamond':
      default:
        return {
          currentTier: 'Black Diamond',
          nextTier: 'Top Tier',
          pointsNeeded: 0,
          threshold: 2000,
          progress: 100,
        };
    }
  },
};
