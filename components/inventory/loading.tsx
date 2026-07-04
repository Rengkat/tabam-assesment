export default function InventoryLoading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-8 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-48 bg-slate-200 rounded mt-2" />
      </div>

      <div className="h-16 bg-white rounded-2xl border border-slate-200/50 animate-pulse" />

      <div className="bg-white rounded-2xl border border-slate-200/50 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 animate-pulse">
            <div className="w-10 h-10 bg-slate-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-slate-200 rounded" />
              <div className="h-3 w-1/5 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-16 bg-slate-200 rounded" />
            <div className="h-8 w-20 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
