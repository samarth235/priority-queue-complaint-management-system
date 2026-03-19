import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Complaint } from "@/lib/skewHeap";

interface ComplaintFormProps {
  onSubmit: (complaint: Complaint) => void;
}

export function ComplaintForm({ onSubmit }: ComplaintFormProps) {
  const [id, setId] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numId = parseInt(id, 10);
    const numPriority = parseInt(priority, 10);

    if (isNaN(numId) || numId <= 0) {
      setError("Please enter a valid positive complaint ID.");
      return;
    }
    if (isNaN(numPriority) || numPriority < 1 || numPriority > 4) {
      setError("Please select a priority level.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    if (description.trim().length > 100) {
      setError("Description must be 100 characters or fewer.");
      return;
    }

    onSubmit({ id: numId, priority: numPriority, description: description.trim() });
    setId("");
    setPriority("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="complaint-id" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Complaint ID
          </Label>
          <Input
            id="complaint-id"
            type="number"
            min={1}
            placeholder="e.g. 101"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Priority
          </Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">🔴 1 — Emergency</SelectItem>
              <SelectItem value="2">🟠 2 — High</SelectItem>
              <SelectItem value="3">🟡 3 — Medium</SelectItem>
              <SelectItem value="4">🟢 4 — Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the complaint..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right">{description.length}/100</p>
      </div>

      {error && (
        <p className="text-sm text-destructive font-medium animate-slide-in">{error}</p>
      )}

      <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
        <Plus className="mr-2 h-4 w-4" />
        Register Complaint
      </Button>
    </form>
  );
}
