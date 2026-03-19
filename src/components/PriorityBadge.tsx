import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const priorityBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
  {
    variants: {
      level: {
        1: "bg-priority-emergency/15 text-priority-emergency border border-priority-emergency/30",
        2: "bg-priority-high/15 text-priority-high border border-priority-high/30",
        3: "bg-priority-medium/15 text-priority-medium border border-priority-medium/30",
        4: "bg-priority-low/15 text-priority-low border border-priority-low/30",
      },
    },
    defaultVariants: {
      level: 4,
    },
  }
);

const priorityLabels: Record<number, string> = {
  1: "Emergency",
  2: "High",
  3: "Medium",
  4: "Low",
};

interface PriorityBadgeProps {
  priority: number;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const level = (priority >= 1 && priority <= 4 ? priority : 4) as 1 | 2 | 3 | 4;

  return (
    <span className={cn(priorityBadgeVariants({ level }), className)}>
      <span
        className={cn("h-1.5 w-1.5 rounded-full", {
          "bg-priority-emergency animate-pulse": level === 1,
          "bg-priority-high": level === 2,
          "bg-priority-medium": level === 3,
          "bg-priority-low": level === 4,
        })}
      />
      {priorityLabels[level]}
    </span>
  );
}
