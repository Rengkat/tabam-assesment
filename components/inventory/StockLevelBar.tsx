export function StockLevelBar({
  stock,
  lowStockThreshold = 15,
}: {
  stock: number;
  lowStockThreshold?: number;
}) {
  const maxScale = Math.max(lowStockThreshold * 4, stock);
  const percent = Math.min((stock / maxScale) * 100, 100);
  const color =
    stock === 0 ? "bg-red-500" : stock <= lowStockThreshold ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="w-24">
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
