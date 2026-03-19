import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "@/components/PriorityBadge";
import type { Complaint } from "@/lib/skewHeap";
import { useState } from "react";

interface ResolvePanelProps {
  nextComplaint: Complaint | null;
  onResolve: () => Complaint | null;
  totalCount: number;
}

export function ResolvePanel({ nextComplaint, onResolve, totalCount }: ResolvePanelProps) {
  const [lastResolved, setLastResolved] = useState<Complaint | null>(null);

  const handleResolve = () => {
    const resolved = onResolve();
    setLastResolved(resolved);
  };

  return (
    <div className="space-y-4">
      {nextComplaint ? (
        <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-4 glow-accent space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <AlertTriangle className="h-3.5 w-3.5" />
            Next to Resolve
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-lg font-bold text-foreground">
              #{nextComplaint.id}
            </span>
            <PriorityBadge priority={nextComplaint.priority} />
          </div>
          <p className="text-sm text-muted-foreground">{nextComplaint.description}</p>
          <Button
            onClick={handleResolve}
            className="w-full bg-success text-success-foreground hover:bg-success/90 font-semibold"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Resolve This Complaint
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="rounded-full bg-success/10 p-4 mb-3">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <p className="text-sm font-medium text-foreground">All Clear!</p>
          <p className="text-xs text-muted-foreground mt-1">No pending complaints</p>
        </div>
      )}

      {lastResolved && (
        <div className="rounded-lg border bg-card p-3 animate-slide-in">
          <p className="text-xs font-semibold uppercase tracking-wider text-success mb-2">
            ✓ Last Resolved
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-muted-foreground">#{lastResolved.id}</span>
            <PriorityBadge priority={lastResolved.priority} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">{lastResolved.description}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <span>Total pending</span>
        <span className="font-mono font-semibold text-foreground">{totalCount}</span>
      </div>
    </div>
  );
}
