"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { InventoryItem } from "@/types/inventory.types";

interface AdjustStockModalProps {
  product: InventoryItem | null;
  onClose: () => void;
  onSave: (productId: string, newStock: number, reason: string) => Promise<void>;
}

export function AdjustStockModal({ product, onClose, onSave }: AdjustStockModalProps) {
  const [mode, setMode] = useState<"add" | "remove" | "set">("add");
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!product) return null;

  const computeNewStock = () => {
    if (mode === "add") return product.stock + amount;
    if (mode === "remove") return product.stock - amount;
    return amount;
  };

  const handleSubmit = async () => {
    const newStock = computeNewStock();
    if (newStock < 0) {
      setError("Stock cannot go below 0.");
      return;
    }
    if (!reason.trim()) {
      setError("Please provide a reason for this adjustment.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await onSave(product.id, newStock, reason.trim());
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="adjust-stock-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 id="adjust-stock-title" className="text-lg font-semibold text-slate-900">
            Adjust Stock
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600">
              Product: <span className="font-medium text-slate-900">{product.name}</span>
            </p>
            <p className="text-sm text-slate-600">
              Current stock: <span className="font-medium text-slate-900">{product.stock}</span>
            </p>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-1.5">
              Adjustment type
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {(["add", "remove", "set"] as const).map((m) => (
                <button
                  title="mode"
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                    mode === m
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}>
                  {m === "add" ? "Add" : m === "remove" ? "Remove" : "Set to"}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="adjust-amount"
              className="block text-sm font-medium text-slate-700 mb-1.5">
              {mode === "set" ? "New stock quantity" : "Quantity"}
            </label>
            <input
              id="adjust-amount"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="adjust-reason"
              className="block text-sm font-medium text-slate-700 mb-1.5">
              Reason <span className="text-red-500">*</span>
            </label>
            <input
              id="adjust-reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Restock delivery, damaged units, stock count correction"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <p className="text-sm text-slate-500">
            New stock will be:{" "}
            <span className="font-semibold text-slate-900">{Math.max(0, computeNewStock())}</span>
          </p>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
