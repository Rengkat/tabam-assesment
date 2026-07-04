export function StockIndicator({ stock }: { stock: number }) {
  const color = stock > 20 ? "text-green-600" : stock > 5 ? "text-yellow-600" : "text-red-600";
  const label = stock > 0 ? `${stock} in stock` : "Out of stock";
  return <span className={`text-sm font-medium ${color}`}>{label}</span>;
}
