import { Package, Plus } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({ title, description, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/50">
      <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" aria-hidden="true" />
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          <Plus className="w-4 h-4" aria-hidden="true" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
