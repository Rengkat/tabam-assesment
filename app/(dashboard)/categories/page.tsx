import { Plus } from "lucide-react";
import { CategoriesPageClient } from "./CategoriesPageClient";
import { getCategories } from "./actions";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesPageClient initialCategories={categories} />;
}
