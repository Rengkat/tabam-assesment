import { CheckCircle2 } from "lucide-react";
import { passwordRequirements } from "@/lib/utils/password-strength";

export function PasswordRequirements({ password }: { password: string }) {
  return (
    <ul className="space-y-1 mt-2">
      {passwordRequirements.map((req) => {
        const met = req.check(password);
        return (
          <li key={req.label} className="flex items-center gap-2 text-xs">
            <span
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                met ? "bg-green-500/20 text-green-500" : "bg-slate-200 text-slate-400"
              }`}
              aria-hidden="true">
              {met ? (
                <CheckCircle2 className="w-2.5 h-2.5" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full" />
              )}
            </span>
            <span className={met ? "text-slate-700" : "text-slate-400"}>
              {req.label}
              <span className="sr-only">
                {met ? " — requirement met" : " — requirement not met"}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
