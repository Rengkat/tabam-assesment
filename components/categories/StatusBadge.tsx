import { CheckCircle, Clock } from "lucide-react";
import type { CategoryStatus } from "@/types/category.types";

const config: Record<
  CategoryStatus,
  { label: string; className: string; icon: typeof CheckCircle }
> = {
  active: { label: "Active", className: "bg-green-100 text-green-700", icon: CheckCircle },
  inactive: { label: "Inactive", className: "bg-yellow-100 text-yellow-700", icon: Clock },
};

export function StatusBadge({ status }: { status: CategoryStatus }) {
  const { label, className, icon: Icon } = config[status];
  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 ${className}`}>
      <Icon className="w-3 h-3" aria-hidden="true" />
      {label}
    </span>
  );
}
