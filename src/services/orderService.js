import { INITIAL_ORDERS } from "../data/mockData";
const ORDERS_KEY = "sipzy_user_orders";
export const orderService = {
  getOrders() {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ORDERS;
    }
  },
  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id);
  },
  createOrder(params) {
    const orders = this.getOrders();
    const totalPayment = Math.max(0, params.subtotal - params.discount);
    const pointsEarned = Math.floor(totalPayment / 1e4);
    const newOrder = {
      id: `SIP-ORD-${Math.floor(1e4 + Math.random() * 9e4)}`,
      userId: params.userId,
      merchantId: params.merchantId,
      merchantName: params.merchantName,
      items: params.items,
      orderType: params.orderType,
      paymentMethod: params.paymentMethod,
      subtotal: params.subtotal,
      discount: params.discount,
      promoCode: params.promoCode,
      totalPayment,
      pointsEarned,
      status: "Sedang Diproses",
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }) + " WIB",
      createdAt: Date.now()
    };
    const updated = [newOrder, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return newOrder;
  },
  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const updated = orders.map((o) => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  }
};
