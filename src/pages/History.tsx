import React, { useState, useMemo } from 'react';
import { Search, Clock, CheckCircle2, AlertCircle, Eye, Coffee, ArrowRight, X, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { Link } from 'react-router-dom';

export const History: React.FC = () => {
  const { orders } = useApp();

  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchSearch =
        searchQuery === '' ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.merchantName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Receipts & History
        </span>
        <h1 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
          Order History
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7468] mt-1">
          Review previous coffee orders, track processing pickups, and check loyalty points earned.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#F5E7DA] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8B7468] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID (e.g. SIP-ORD) or merchant..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(['All', 'Processing', 'Completed', 'Cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#9B421F] text-white shadow-xs'
                  : 'bg-[#FFF9F3] text-[#8B7468] hover:bg-[#F5E7DA] border border-[#F5E7DA]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isCompleted = order.status === 'Completed';
            const isProcessing = order.status === 'Processing';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F5E7DA] hover:border-[#E87832]/30 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#3D2117]">{order.id}</span>
                    <span aria-hidden="true" className="text-[#F5E7DA]">·</span>
                    <span className="text-xs font-semibold text-[#9B421F]">{order.merchantName}</span>
                    <span aria-hidden="true" className="text-[#F5E7DA]">·</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-800'
                          : isProcessing
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#8B7468]">
                    {order.date} · {order.orderType} · Paid via {order.paymentMethod}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-[#3D2117] pt-1">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="bg-[#FFF9F3] border border-[#F5E7DA] px-2 py-0.5 rounded-md text-[11px]">
                        {item.quantity}x {item.product.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-[#F5E7DA]">
                  <div className="text-left md:text-right">
                    <span className="font-mono font-black text-sm text-[#3D2117]">
                      Rp {order.totalPayment.toLocaleString('id-ID')}
                    </span>
                    <p className="text-[11px] text-emerald-700 font-semibold font-mono">
                      +{order.pointsEarned} pts earned
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="mt-2 py-1.5 px-3 rounded-xl bg-[#FFF9F3] hover:bg-[#F5E7DA] text-[#9B421F] border border-[#F5E7DA] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Receipt Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#F5E7DA] p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] mx-auto flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#3D2117]">No orders found</h3>
          <p className="text-xs text-[#8B7468] max-w-sm mx-auto">
            You don't have any orders matching this criteria. Start a fresh order from any of our partner coffee shops!
          </p>
          <div className="pt-2">
            <Link
              to="/discover"
              className="py-2 px-4 rounded-xl bg-[#9B421F] text-white text-xs font-semibold hover:bg-[#803517]"
            >
              Discover Coffee Shops
            </Link>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FFF9F3] text-[#3D2117] max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#9B421F]/20 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#8B7468] hover:text-[#3D2117]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#9B421F] text-white flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono font-bold text-xs text-[#8B7468]">{selectedOrder.id}</span>
                <h3 className="font-bold text-base text-[#3D2117]">{selectedOrder.merchantName}</h3>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-[#F5E7DA] space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-[#8B7468]">Status:</span>
                <span className="font-semibold text-emerald-700">{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B7468]">Order Type:</span>
                <span className="font-semibold">{selectedOrder.orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B7468]">Date & Time:</span>
                <span className="font-semibold">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B7468]">Payment Method:</span>
                <span className="font-semibold">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3 mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B7468]">Items</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1 border-b border-[#F5E7DA]/60">
                    <div>
                      <span className="font-bold">{item.quantity}x</span> {item.product.name}
                      {item.notes && <p className="text-[10px] text-[#8B7468] italic">Note: {item.notes}</p>}
                    </div>
                    <span className="font-mono font-bold">
                      Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-white rounded-2xl border border-[#F5E7DA] space-y-2 text-xs mb-5">
              <div className="flex justify-between text-[#8B7468]">
                <span>Subtotal:</span>
                <span className="font-mono">Rp {selectedOrder.subtotal.toLocaleString('id-ID')}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({selectedOrder.promoCode || 'Voucher'}):</span>
                  <span className="font-mono">-Rp {selectedOrder.discount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#F5E7DA] flex justify-between font-black text-sm">
                <span>Total Payment:</span>
                <span className="font-mono text-[#3D2117]">
                  Rp {selectedOrder.totalPayment.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="pt-1 flex justify-between text-[#9B421F] font-bold text-xs">
                <span>Loyalty Points Credited:</span>
                <span className="font-mono">+{selectedOrder.pointsEarned} PTS</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 px-4 bg-[#9B421F] hover:bg-[#803517] text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
