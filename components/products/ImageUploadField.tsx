"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Package } from "lucide-react";

interface ImageUploadFieldProps {
  initialPreview?: string;
  onChange: (file: File | null) => void;
}

export function ImageUploadField({ initialPreview, onChange }: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | undefined>(initialPreview);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Image</label>

      {preview ? (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-200">
          <Image src={preview} alt="Product preview" fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white">
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files[0] ?? null);
          }}
          className={`relative w-32 h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-400"
          }`}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Upload product image"
          />
          <UploadCloud className="w-6 h-6 text-slate-400" aria-hidden="true" />
          <span className="text-xs text-slate-400 text-center px-2">Click or drag</span>
        </div>
      )}
      <p className="text-xs text-slate-400 mt-1.5">
        PNG, JPG, or WEBP. Optional — falls back to a placeholder icon.
      </p>
    </div>
  );
}
