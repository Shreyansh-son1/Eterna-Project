"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function TokenModal({ isOpen, onClose, token }) {
  if (!token) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{token.symbol} Details</DialogTitle>
          <DialogDescription>
            Live price information and 24h movement.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* PRICE */}
          <div className="flex justify-between">
            <span className="text-gray-600">Current Price:</span>
            <span className="font-semibold">
              ${token.price.toLocaleString()}
            </span>
          </div>

          {/* CHANGE */}
          <div className="flex justify-between">
            <span className="text-gray-600">24h Change:</span>
            <span
              className={
                token.change >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"
              }
            >
              {token.change.toFixed(2)}%
            </span>
          </div>

          {/* CATEGORY */}
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium capitalize">{token.category}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>

          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Add to Watchlist
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
