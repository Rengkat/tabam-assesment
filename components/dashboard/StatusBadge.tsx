import type { RecentOrder } from "@/types/dashboard.types";

const variants: Record<RecentOrder["status"], string> = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const labels: Record<RecentOrder["status"], string> = {
  completed: "Completed",
  pending: "Pending",
  processing: "Processing",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: RecentOrder["status"] }) {
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${variants[status]}`}>
      {labels[status]}
    </span>
  );
}
