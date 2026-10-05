import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Primitives visuelles du parcours de pré-inscription.
 *
 * Règle de formes (une seule échelle pour toute la page) :
 *  - surfaces / cartes : rounded-3xl (24px)
 *  - champs de saisie  : rounded-[0.875rem] (14px)
 *  - boutons           : rounded-full (pilule)
 *
 * Règle de couleurs : violet #780376 = action principale, jaune #e6b20b =
 * accent de progression et de mise en avant. Aucune autre couleur d'accent.
 */

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-ps-violet-600 text-white shadow-[0_16px_32px_-14px_rgba(120,3,118,0.75)] hover:bg-ps-violet-700",
  accent:
    "bg-ps-gold-500 text-ps-ink shadow-[0_16px_32px_-14px_rgba(148,113,12,0.6)] hover:bg-ps-gold-400",
  secondary:
    "bg-white/80 text-ps-violet-700 border border-ps-violet-200 hover:bg-white hover:border-ps-violet-300",
  ghost: "bg-transparent text-ps-muted hover:bg-ps-violet-50 hover:text-ps-violet-700",
};

export function Button({
  variant = "primary",
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-semibold whitespace-nowrap sm:px-6",
        "transition-[transform,background-color,border-color,box-shadow] duration-200",
        "active:translate-y-px active:scale-[0.99] disabled:pointer-events-none disabled:opacity-45",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  soft?: boolean;
}

export function GlassPanel({ children, className, soft }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        soft ? "ps-glass-soft" : "ps-glass",
        className
      )}
    >
      {children}
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-sm font-semibold text-ps-ink"
      >
        {label}
        {required && (
          <span className="ml-1 text-ps-violet-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-sm text-ps-muted">{hint}</p>}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-sm font-medium text-[#b31f47]"
        >
          <AlertCircle className="size-4 shrink-0" strokeWidth={1.75} />
          {error}
        </p>
      )}
    </div>
  );
}

interface InlineErrorProps {
  message: string;
}

export function InlineError({ message }: InlineErrorProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-2xl border border-[#f0c2cd] bg-[#fff5f7] px-4 py-3 text-sm font-medium text-[#9d1b3e]"
    >
      <AlertCircle className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
      <span>{message}</span>
    </div>
  );
}
