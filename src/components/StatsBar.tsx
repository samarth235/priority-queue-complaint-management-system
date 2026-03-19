import { AlertTriangle, FileText, CheckCircle2, Hash } from "lucide-react";
import type { Complaint } from "@/lib/skewHeap";

interface StatsBarProps {
  complaints: Complaint[];
  count: number;
}

export function StatsBar({ complaints, count }: StatsBarProps) {
  const emergencyCount = complaints.filter((c) => c.priority === 1).length;
  const highCount = complaints.filter((c) => c.priority === 2).length;
  const resolvedPlaceholder = 0; // Could track resolved count if needed

  const stats = [
    {
      label: "Total Pending",
      value: count,
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Emergency",
      value: emergencyCount,
      icon: AlertTriangle,
      color: "text-priority-emergency",
      bg: "bg-priority-emergency/10",
    },
    {
      label: "High Priority",
      value: highCount,
      icon: Hash,
      color: "text-priority-high",
      bg: "bg-priority-high/10",
    },
    {
      label: "Resolved",
      value: resolvedPlaceholder,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-xl border bg-card p-4 card-hover"
        >
          <div className={`rounded-lg ${stat.bg} p-2.5`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
