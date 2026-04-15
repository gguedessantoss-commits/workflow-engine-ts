import type { HTMLAttributes, ReactNode } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: "critical" | "warning" | "neutral";
};

export function Badge({
  children,
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  const resolvedClassName = ["ui-badge", `ui-badge--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={resolvedClassName} {...props}>
      {children}
    </span>
  );
}
