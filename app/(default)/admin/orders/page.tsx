"use client";

import { getShopifyOrders } from "@/api/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { StatusFilter } from "./_components/StatusFilter";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<Awaited<ReturnType<typeof getShopifyOrders>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getShopifyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") return true;
    return order.fulfillmentStatus === statusFilter;
  });

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-2">Orders</h1>
        <p className="text-gray-500">Manage and view all orders from your store.</p>
      </div>

      <div className="mb-6">
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  {order.customer ? (
                    <div>
                      <div className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Guest order</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        order.fulfillmentStatus === "fulfilled"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    />
                    <span className="capitalize">
                      {order.fulfillmentStatus || "unfulfilled"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">€{order.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
