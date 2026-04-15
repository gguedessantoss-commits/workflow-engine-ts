import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  const resolvedClassName = ["ui-card", className].filter(Boolean).join(" ");

  return (
    <div className={resolvedClassName} {...props}>
      {children}
    </div>
  );
}
