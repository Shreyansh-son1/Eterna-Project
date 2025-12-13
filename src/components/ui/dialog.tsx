"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-in fade-in zoom-in">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className, children }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function DialogHeader({ className, children }) {
  return <div className={cn("flex flex-col gap-2 mb-4", className)}>
    {children}
  </div>;
}

export function DialogTitle({ className, children }) {
  return <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>;
}

export function DialogDescription({ className, children }) {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>;
}
