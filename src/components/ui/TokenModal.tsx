"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Token = {
  symbol: string;
  price: number;
  change: number;
  category: string;
};

type TokenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  token: Token | null;
};

export default function TokenModal({
  isOpen,
  onClose,
  token,
}: TokenModalProps) {
  if (!token) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* ✅ className is REQUIRED */}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{token.symbol}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Price:</span>{" "}
            ${token.price.toLocaleString()}
          </div>

          <div>
            <span className="font-medium">24h Change:</span>{" "}
            <span
              className={token.change >= 0 ? "text-green-600" : "text-red-600"}
            >
              {token.change.toFixed(2)}%
            </span>
          </div>

          <div>
            <span className="font-medium">Category:</span>{" "}
            {token.category}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
