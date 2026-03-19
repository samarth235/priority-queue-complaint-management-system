import { useSkewHeap } from "@/hooks/useSkewHeap";
import { ComplaintForm } from "@/components/ComplaintForm";
import { SearchPanel } from "@/components/SearchPanel";
import { ComplaintList } from "@/components/ComplaintList";
import { ResolvePanel } from "@/components/ResolvePanel";
import { StatsBar } from "@/components/StatsBar";
import { Shield } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const { complaints, count, insert, resolve, search, peek } = useSkewHeap();

  const handleInsert = (complaint: { id: number; priority: number; description: string }) => {
    insert(complaint);
    toast.success(`Complaint #${complaint.id} registered successfully.`);
  };

  const handleResolve = () => {
    const resolved = resolve();
    if (resolved) {
      toast.success(`Complaint #${resolved.id} resolved!`);
    } else {
      toast.error("No complaints to resolve.");
    }
    return resolved;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-3 px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Priority Complaint System
            </h1>
            <p className="text-xs text-muted-foreground">
              Powered by Skew Heap + Hash Table · O(1) Search
            </p>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">System Active</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <StatsBar complaints={complaints} count={count} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Register Complaint */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Register Complaint
              </h2>
              <p className="text-xs text-muted-foreground/60 mt-0.5">
                Add a new complaint to the queue
              </p>
            </div>
            <ComplaintForm onSubmit={handleInsert} />
          </div>

          {/* Search & Resolve */}
          <div className="space-y-6">
            {/* Search */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Search Complaint
                </h2>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  Lookup by complaint ID
                </p>
              </div>
              <SearchPanel onSearch={search} />
            </div>

            {/* Resolve */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Resolve Next
                </h2>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  Handle highest priority complaint
                </p>
              </div>
              <ResolvePanel
                nextComplaint={peek()}
                onResolve={handleResolve}
                totalCount={count}
              />
            </div>
          </div>

          {/* All Complaints */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  All Complaints
                </h2>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  Sorted by priority
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                {count}
              </span>
            </div>
            <ComplaintList complaints={complaints} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
