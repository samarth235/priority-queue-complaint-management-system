import { PriorityBadge } from "@/components/PriorityBadge";
import type { Complaint } from "@/lib/skewHeap";
import { FileText } from "lucide-react";

interface ComplaintListProps {
  complaints: Complaint[];
}

export function ComplaintList({ complaints }: ComplaintListProps) {
  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No complaints pending</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Register a new complaint to get started</p>
      </div>
    );
  }

  // Sort by priority for display (the heap order is maintained internally)
  const sorted = [...complaints].sort((a, b) => a.priority - b.priority || a.id - b.id);

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
      {sorted.map((c, idx) => (
        <div
          key={`${c.id}-${idx}`}
          className="flex items-center gap-4 rounded-lg border bg-card p-3 card-hover animate-slide-in"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
            #{c.id}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{c.description}</p>
          </div>
          <PriorityBadge priority={c.priority} />
        </div>
      ))}
    </div>
  );
}
