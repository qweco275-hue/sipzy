import { Order, CartItem, OrderType, PaymentMethod } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

const ORDERS_KEY = 'sipzy_user_orders';

export const orderService = {
  getOrders(): Order[] {
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

  getOrderById(id: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id);
  },

  createOrder(params: {
    userId: string;
    merchantId: string;
    merchantName: string;
    items: CartItem[];
    orderType: OrderType;
    paymentMethod: PaymentMethod;
    subtotal: number;
    discount: number;
    promoCode?: string;
  }): Order {
    const orders = this.getOrders();
    const totalPayment = Math.max(0, params.subtotal - params.discount);
    // Loyalty Rule: Rp 10.000 spent = 1 Loyalty Point
    const pointsEarned = Math.floor(totalPayment / 10000);

    const newOrder: Order = {
      id: `SIP-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
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
      status: 'Processing',
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      createdAt: Date.now(),
    };

    const updated = [newOrder, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: Order['status']): Order[] {
    const orders = this.getOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  },
};
