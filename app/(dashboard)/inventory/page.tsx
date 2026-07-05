import { InventoryPageClient } from "./InventoryPageClient";
import { getInventory } from "./actions";

export default async function InventoryPage() {
  const products = await getInventory();
  return <InventoryPageClient initialProducts={products} />;
}
