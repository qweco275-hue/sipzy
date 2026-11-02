const CART_KEY = "sipzy_active_cart";
export const cartService = {
  getCart() {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [], merchantId: null, merchantName: null };
    try {
      return JSON.parse(raw);
    } catch {
      return { items: [], merchantId: null, merchantName: null };
    }
  },
  saveCart(data) {
    localStorage.setItem(CART_KEY, JSON.stringify(data));
  },
  addItem(product, merchantId, merchantName, quantity = 1, notes = "") {
    const current = this.getCart();
    if (current.merchantId && current.merchantId !== merchantId && current.items.length > 0) {
      return {
        success: false,
        requiresReset: true,
        previousMerchant: current.merchantName || "another merchant"
      };
    }
    const existingIndex = current.items.findIndex((item) => item.product.id === product.id);
    let updatedItems = [...current.items];
    if (existingIndex > -1) {
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + quantity,
        notes: notes || updatedItems[existingIndex].notes
      };
    } else {
      updatedItems.push({
        product,
        quantity,
        merchantId,
        merchantName,
        notes
      });
    }
    this.saveCart({
      items: updatedItems,
      merchantId,
      merchantName
    });
    return { success: true };
  },
  updateQuantity(productId, quantity) {
    const current = this.getCart();
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const updated = current.items.map(
      (item) => item.product.id === productId ? { ...item, quantity } : item
    );
    this.saveCart({
      ...current,
      items: updated
    });
  },
  removeItem(productId) {
    const current = this.getCart();
    const updated = current.items.filter((item) => item.product.id !== productId);
    this.saveCart({
      items: updated,
      merchantId: updated.length === 0 ? null : current.merchantId,
      merchantName: updated.length === 0 ? null : current.merchantName
    });
  },
  clearCart() {
    localStorage.removeItem(CART_KEY);
  }
};
