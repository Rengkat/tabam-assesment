import { getPasswordStrength } from "@/lib/utils/password-strength";

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const label =
    strength <= 2
      ? "Weak - Add more variety"
      : strength === 3
        ? "Medium - Almost there!"
        : "Strong - Great password!";
  const barColor = strength <= 2 ? "bg-red-500" : strength === 3 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="space-y-1.5" aria-live="polite">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors ${
              level <= strength ? barColor : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
