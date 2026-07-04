"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteProductDialogProps {
  productName: string;
  onConfirm: () => void;
}

export function DeleteProductDialog({ productName, onConfirm }: DeleteProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={`Delete ${productName}`}
        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40">
        <Trash2 className="w-4 h-4 text-red-500" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 id="delete-dialog-title" className="text-lg font-semibold text-slate-900 mb-2">
              Delete product?
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              This will permanently delete <span className="font-medium">{productName}</span>. This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
