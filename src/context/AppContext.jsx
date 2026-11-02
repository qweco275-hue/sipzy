import { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services/cartService";
import { orderService } from "../services/orderService";
import { loyaltyService } from "../services/loyaltyService";
import { merchantService } from "../services/merchantService";
import { authService } from "../services/authService";
import { useAuth } from "./AuthContext";
const AppContext = createContext(void 0);
export const AppProvider = ({ children }) => {
  const { user, refreshUser } = useAuth();
  const [cart, setCart] = useState(() => cartService.getCart());
  const [favorites, setFavorites] = useState(() => merchantService.getFavorites());
  const [orders, setOrders] = useState(() => orderService.getOrders());
  const [transactions, setTransactions] = useState(
    () => loyaltyService.getTransactions()
  );
  const [redemptions, setRedemptions] = useState(
    () => loyaltyService.getRedemptions()
  );
  const [claimedPromos, setClaimedPromos] = useState(
    () => loyaltyService.getClaimedPromos()
  );
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    setCart(cartService.getCart());
    setFavorites(merchantService.getFavorites());
    setOrders(orderService.getOrders());
    setTransactions(loyaltyService.getTransactions());
    setRedemptions(loyaltyService.getRedemptions());
    setClaimedPromos(loyaltyService.getClaimedPromos());
  }, []);
  const showToast = (title, message, type = "success") => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const cartSubtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const addToCart = (product, merchantId, merchantName, quantity = 1, notes = "") => {
    const res = cartService.addItem(product, merchantId, merchantName, quantity, notes);
    if (res.success) {
      setCart(cartService.getCart());
      showToast("Ditambahkan ke Keranjang", `${product.name} (x${quantity}) berhasil ditambahkan.`, "success");
    }
    return res;
  };
  const resetCartAndAdd = (product, merchantId, merchantName, quantity = 1, notes = "") => {
    cartService.clearCart();
    cartService.addItem(product, merchantId, merchantName, quantity, notes);
    setCart(cartService.getCart());
    showToast("Keranjang Baru Dibuat", `${product.name} ditambahkan dari ${merchantName}.`, "info");
  };
  const updateCartQty = (productId, quantity) => {
    cartService.updateQuantity(productId, quantity);
    setCart(cartService.getCart());
  };
  const removeFromCart = (productId) => {
    cartService.removeItem(productId);
    setCart(cartService.getCart());
    showToast("Item Dihapus", "Produk telah dihapus dari keranjang pesanan.", "info");
  };
  const clearCart = () => {
    cartService.clearCart();
    setCart({ items: [], merchantId: null, merchantName: null });
  };
  const toggleFavorite = (merchantId) => {
    const updated = merchantService.toggleFavorite(merchantId);
    setFavorites(updated);
    const isNowFav = updated.includes(merchantId);
    showToast(
      isNowFav ? "Ditambahkan ke Favorit" : "Dihapus dari Favorit",
      isNowFav ? "Coffee shop disimpan ke daftar favorit Anda." : void 0,
      "info"
    );
  };
  const isFavorite = (merchantId) => favorites.includes(merchantId);
  const placeOrder = (params) => {
    const userId = user?.id || "usr_guest";
    const order = orderService.createOrder({
      ...params,
      userId
    });
    if (user && order.pointsEarned > 0) {
      const newTotal = user.points + order.pointsEarned;
      authService.updatePoints(newTotal);
      const tx = loyaltyService.addTransaction({
        userId: user.id,
        type: "DIPEROLEH",
        title: `Pesanan di ${order.merchantName}`,
        points: order.pointsEarned,
        status: "Selesai",
        referenceId: order.id
      });
      setTransactions((prev) => [tx, ...prev]);
      refreshUser();
    }
    clearCart();
    setOrders(orderService.getOrders());
    showToast(
      "Pesanan Berhasil Dibuat!",
      `Order ${order.id} sedang dipersiapkan. Anda mendapat +${order.pointsEarned} poin loyalitas!`,
      "success"
    );
    return order;
  };
  const redeemReward = (rewardId) => {
    if (!user) {
      showToast("Perlu Masuk Akun", "Silakan masuk akun untuk menukarkan rewards.", "warning");
      return { success: false, error: "Pengguna belum login" };
    }
    const res = loyaltyService.redeemReward(rewardId, user);
    if (res.success && res.redemption) {
      refreshUser();
      setRedemptions(loyaltyService.getRedemptions());
      setTransactions(loyaltyService.getTransactions());
      showToast("Reward Berhasil Ditukarkan!", `Kode voucher: ${res.redemption.code}`, "success");
      return { success: true, code: res.redemption.code };
    } else {
      showToast("Penukaran Gagal", res.error || "Tidak dapat menukarkan reward.", "error");
      return { success: false, error: res.error };
    }
  };
  const claimPromo = (promoCode) => {
    const updated = loyaltyService.claimPromo(promoCode);
    setClaimedPromos(updated);
    showToast("Promo Diklaim!", `Kode "${promoCode}" siap digunakan saat checkout.`, "success");
  };
  return <AppContext.Provider
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
      dismissToast
    }}
  >
      {children}
    </AppContext.Provider>;
};
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
