"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";
import { deleteProduct } from "@/app/(dashboard)/products/actions";

export function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted");
      } catch {
        toast.error("Failed to delete product");
      }
    });
  };

  return (
    <ConfirmDeleteDialog itemLabel="product" itemName={productName} onConfirm={handleDelete} />
  );
}
