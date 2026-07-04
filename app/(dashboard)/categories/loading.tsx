export default function CategoriesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-pulse">
        <div>
          <div className="h-8 w-32 bg-slate-200 rounded" />
          <div className="h-4 w-24 bg-slate-200 rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-xl" />
      </div>

      <div className="h-16 bg-white rounded-2xl border border-slate-200/50 animate-pulse" />

      <div className="bg-white rounded-2xl border border-slate-200/50 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 animate-pulse">
            <div className="w-9 h-9 bg-slate-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/4 bg-slate-200 rounded" />
              <div className="h-3 w-1/3 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-12 bg-slate-200 rounded" />
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
