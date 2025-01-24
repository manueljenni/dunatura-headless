"use client";

import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

interface OrderDetailProps {
  params: {
    id: string;
  };
}

function DownloadPDFButton({ orderId }: { orderId: string }) {
  return (
    <a
      href={`/api/orders/${encodeURIComponent(orderId)}/pdf`}
      target="_blank"
      className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
      Generate PDF
    </a>
  );
}

export default function OrderDetailPage({ params }: OrderDetailProps) {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/orders/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch order");
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Failed to load order. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">{error || "Order not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium mb-2">Order #{order.name}</h1>
          <p className="text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <DownloadPDFButton orderId={order.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.lineItems.edges.map(({ node: item }: any) => (
                <div key={item.id} className="flex items-center gap-4">
                  {item.variant?.image && (
                    <img
                      src={item.variant.image.url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity} × €{item.variant?.price || "N/A"}
                    </p>
                  </div>
                  <div className="font-medium">
                    €{item.originalTotalSet.shopMoney.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.note && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Order Notes</h2>
              <p className="text-gray-600">{order.note}</p>
            </div>
          )}
        </div>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium mb-4">Customer</h2>
            <div className="space-y-2">
              <p>
                {order.customer?.firstName} {order.customer?.lastName}
              </p>
              <p className="text-gray-500">{order.customer?.email}</p>
              {order.customer?.phone && (
                <p className="text-gray-500">{order.customer.phone}</p>
              )}
            </div>
          </div>

          {order.shippingAddress && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
              <div className="space-y-1">
                <p>{order.shippingAddress.address1}</p>
                {order.shippingAddress.address2 && (
                  <p>{order.shippingAddress.address2}</p>
                )}
                <p>
                  {order.shippingAddress.zip} {order.shippingAddress.city}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>€{order.subtotalPriceSet.shopMoney.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>€{order.totalShippingPriceSet.shopMoney.amount}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>€{order.totalPriceSet.shopMoney.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
