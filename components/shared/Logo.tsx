interface LogoProps {
  variant?: "blue" | "purple";
}

export function Logo({ variant = "blue" }: LogoProps) {
  const gradient =
    variant === "blue"
      ? "from-blue-500 to-purple-600 shadow-blue-500/25"
      : "from-purple-500 to-blue-600 shadow-purple-500/25";

  return (
    <div
      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}>
      <span className="text-2xl font-bold text-white" aria-hidden="true">
        E
      </span>
    </div>
  );
}
