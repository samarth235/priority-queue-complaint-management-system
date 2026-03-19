import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PriorityBadge } from "@/components/PriorityBadge";
import type { Complaint } from "@/lib/skewHeap";

interface SearchPanelProps {
  onSearch: (id: number) => Complaint | null;
}

export function SearchPanel({ onSearch }: SearchPanelProps) {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<Complaint | null | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const numId = parseInt(searchId, 10);
    if (isNaN(numId) || numId <= 0) return;
    const found = onSearch(numId);
    setResult(found);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="number"
          min={1}
          placeholder="Enter Complaint ID"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            setResult(undefined);
          }}
          className="font-mono flex-1"
        />
        <Button type="submit" variant="outline" size="icon" className="shrink-0">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {result !== undefined && (
        <div className="animate-slide-in">
          {result ? (
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-foreground">
                  #{result.id}
                </span>
                <PriorityBadge priority={result.priority} />
              </div>
              <p className="text-sm text-muted-foreground">{result.description}</p>
            </div>
          ) : (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center">
              <p className="text-sm text-destructive font-medium">Complaint not found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
