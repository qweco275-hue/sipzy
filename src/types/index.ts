export type MembershipLevel = 'Bronze' | 'Silver' | 'Gold' | 'Black Diamond';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  memberId: string;
  memberSince: string;
  membershipLevel: MembershipLevel;
  points: number;
  notificationsEnabled: boolean;
  emailUpdates: boolean;
}

export type MerchantCategory = 'Specialty Coffee' | 'Roastery' | 'Cafe' | 'Coffee Shop' | 'Others';

export interface Merchant {
  id: string;
  name: string;
  category: MerchantCategory;
  rating: number;
  reviewCount: number;
  location: string;
  address: string;
  openingHours: string;
  coverImage: string;
  logoImage: string;
  description: string;
  distance: string;
  priceRange: '$$' | '$$$' | '$$$$';
  tags: string[];
  isFeatured?: boolean;
}

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  category: 'Espresso Bar' | 'Pour Over' | 'Cold Brew' | 'Signature Drinks' | 'Pastries & Food';
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  pointsEarned: number; // calculated as Math.floor(price / 10000)
}

export interface CartItem {
  product: Product;
  quantity: number;
  merchantId: string;
  merchantName: string;
  notes?: string;
}

export type OrderType = 'Dine-in' | 'Takeaway' | 'Pickup';
export type PaymentMethod = 'QRIS' | 'Bank Transfer' | 'Cash at Merchant';
export type OrderStatus = 'Processing' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  userId: string;
  merchantId: string;
  merchantName: string;
  items: CartItem[];
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  promoCode?: string;
  totalPayment: number;
  pointsEarned: number;
  status: OrderStatus;
  date: string;
  createdAt: number;
}

export type LoyaltyTransactionType = 'EARNED' | 'REDEEMED' | 'BONUS';

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  type: LoyaltyTransactionType;
  title: string;
  points: number; // positive for earned/bonus, negative for redeemed
  date: string;
  status: 'Completed' | 'Pending';
  referenceId?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  category: 'Free Drink' | 'Discount' | 'Complimentary Pastry' | 'VIP Experience';
  merchantName?: string;
  voucherCode: string;
  validUntil: string;
  image: string;
}

export interface UserRedemption {
  id: string;
  userId: string;
  rewardId: string;
  title: string;
  pointsSpent: number;
  code: string;
  redeemedAt: string;
  expiresAt: string;
  status: 'Active' | 'Used' | 'Expired';
}

export interface Promotion {
  id: string;
  title: string;
  tagline: string;
  discountBadge: string;
  promoCode: string;
  description: string;
  minSpend: number;
  validUntil: string;
  merchantName?: string;
  category: string;
  isFeatured?: boolean;
}
