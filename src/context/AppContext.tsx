import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  Product,
  Order,
  LoyaltyTransaction,
  UserRedemption,
  OrderType,
  PaymentMethod,
} from '../types';
import { cartService } from '../services/cartService';
import { orderService } from '../services/orderService';
import { loyaltyService } from '../services/loyaltyService';
import { merchantService } from '../services/merchantService';
import { authService } from '../services/authService';
import { useAuth } from './AuthContext';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  cart: {
    items: CartItem[];
    merchantId: string | null;
    merchantName: string | null;
  };
  cartSubtotal: number;
  cartTotalCount: number;
  favorites: string[];
  orders: Order[];
  transactions: LoyaltyTransaction[];
  redemptions: UserRedemption[];
  claimedPromos: string[];
  toasts: ToastMessage[];
  addToCart: (
    product: Product,
    merchantId: string,
    merchantName: string,
    quantity?: number,
    notes?: string
  ) => { success: boolean; requiresReset?: boolean; previousMerchant?: string };
  resetCartAndAdd: (
    product: Product,
    merchantId: string,
    merchantName: string,
    quantity?: number,
    notes?: string
  ) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (merchantId: string) => void;
  isFavorite: (merchantId: string) => boolean;
  placeOrder: (params: {
    merchantId: string;
    merchantName: string;
    items: CartItem[];
    orderType: OrderType;
    paymentMethod: PaymentMethod;
    subtotal: number;
    discount: number;
    promoCode?: string;
  }) => Order;
  redeemReward: (rewardId: string) => { success: boolean; error?: string; code?: string };
  claimPromo: (promoCode: string) => void;
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, refreshUser } = useAuth();

  const [cart, setCart] = useState(() => cartService.getCart());
  const [favorites, setFavorites] = useState<string[]>(() => merchantService.getFavorites());
  const [orders, setOrders] = useState<Order[]>(() => orderService.getOrders());
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>(() =>
    loyaltyService.getTransactions()
  );
  const [redemptions, setRedemptions] = useState<UserRedemption[]>(() =>
    loyaltyService.getRedemptions()
  );
  const [claimedPromos, setClaimedPromos] = useState<string[]>(() =>
    loyaltyService.getClaimedPromos()
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    // Keep state synced
    setCart(cartService.getCart());
    setFavorites(merchantService.getFavorites());
    setOrders(orderService.getOrders());
    setTransactions(loyaltyService.getTransactions());
    setRedemptions(loyaltyService.getRedemptions());
    setClaimedPromos(loyaltyService.getClaimedPromos());
  }, []);

  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const cartSubtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (
    product: Product,
    merchantId: string,
    merchantName: string,
    quantity = 1,
    notes = ''
  ) => {
    const res = cartService.addItem(product, merchantId, merchantName, quantity, notes);
    if (res.success) {
      setCart(cartService.getCart());
      showToast('Added to Cart', `${product.name} (x${quantity}) added.`, 'success');
    }
    return res;
  };

  const resetCartAndAdd = (
    product: Product,
    merchantId: string,
    merchantName: string,
    quantity = 1,
    notes = ''
  ) => {
    cartService.clearCart();
    cartService.addItem(product, merchantId, merchantName, quantity, notes);
    setCart(cartService.getCart());
    showToast('New Cart Started', `${product.name} added from ${merchantName}.`, 'info');
  };

  const updateCartQty = (productId: string, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
    setCart(cartService.getCart());
  };

  const removeFromCart = (productId: string) => {
    cartService.removeItem(productId);
    setCart(cartService.getCart());
    showToast('Item Removed', 'The item was removed from your cart.', 'info');
  };

  const clearCart = () => {
    cartService.clearCart();
    setCart({ items: [], merchantId: null, merchantName: null });
  };

  const toggleFavorite = (merchantId: string) => {
    const updated = merchantService.toggleFavorite(merchantId);
    setFavorites(updated);
    const isNowFav = updated.includes(merchantId);
    showToast(
      isNowFav ? 'Added to Favorites' : 'Removed from Favorites',
      isNowFav ? 'Merchant saved to your favorite coffee spots.' : undefined,
      'info'
    );
  };

  const isFavorite = (merchantId: string) => favorites.includes(merchantId);

  const placeOrder = (params: {
    merchantId: string;
    merchantName: string;
    items: CartItem[];
    orderType: OrderType;
    paymentMethod: PaymentMethod;
    subtotal: number;
    discount: number;
    promoCode?: string;
  }): Order => {
    const userId = user?.id || 'usr_guest';
    const order = orderService.createOrder({
      ...params,
      userId,
    });

    // Award loyalty points to user
    if (user && order.pointsEarned > 0) {
      const newTotal = user.points + order.pointsEarned;
      authService.updatePoints(newTotal);

      // Add Loyalty Transaction
      const tx = loyaltyService.addTransaction({
        userId: user.id,
        type: 'EARNED',
        title: `Order at ${order.merchantName}`,
        points: order.pointsEarned,
        status: 'Completed',
        referenceId: order.id,
      });

      setTransactions((prev) => [tx, ...prev]);
      refreshUser();
    }

    // Clear cart
    clearCart();

    // Refresh orders list
    setOrders(orderService.getOrders());

    showToast(
      'Order Placed Successfully!',
      `Order ${order.id} is being prepared. You earned +${order.pointsEarned} loyalty points!`,
      'success'
    );

    return order;
  };

  const redeemReward = (rewardId: string) => {
    if (!user) {
      showToast('Login Required', 'Please sign in to redeem rewards.', 'warning');
      return { success: false, error: 'User not logged in' };
    }

    const res = loyaltyService.redeemReward(rewardId, user);
    if (res.success && res.redemption) {
      refreshUser();
      setRedemptions(loyaltyService.getRedemptions());
      setTransactions(loyaltyService.getTransactions());
      showToast('Reward Redeemed!', `Claim voucher: ${res.redemption.code}`, 'success');
      return { success: true, code: res.redemption.code };
    } else {
      showToast('Redemption Failed', res.error || 'Cannot redeem this reward.', 'error');
      return { success: false, error: res.error };
    }
  };

  const claimPromo = (promoCode: string) => {
    const updated = loyaltyService.claimPromo(promoCode);
    setClaimedPromos(updated);
    showToast('Promo Claimed!', `Code "${promoCode}" is ready to apply at checkout.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        cartSubtotal,
        cartTotalCount,
        favorites,
        orders,
        transactions,
        redemptions,
        claimedPromos,
        toasts,
        addToCart,
        resetCartAndAdd,
        updateCartQty,
        removeFromCart,
        clearCart,
        toggleFavorite,
        isFavorite,
        placeOrder,
        redeemReward,
        claimPromo,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
