import { useState, useCallback, useRef } from "react";
import { SkewHeap, type Complaint } from "@/lib/skewHeap";

export function useSkewHeap() {
  const heapRef = useRef(new SkewHeap());
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    setComplaints(heapRef.current.getAll());
    setCount(heapRef.current.size);
  }, []);

  const insert = useCallback(
    (complaint: Complaint) => {
      heapRef.current.insert(complaint);
      refresh();
    },
    [refresh]
  );

  const resolve = useCallback((): Complaint | null => {
    const resolved = heapRef.current.resolve();
    refresh();
    return resolved;
  }, [refresh]);

  const search = useCallback((id: number): Complaint | null => {
    return heapRef.current.search(id);
  }, []);

  const peek = useCallback((): Complaint | null => {
    return heapRef.current.peek();
  }, []);

  return { complaints, count, insert, resolve, search, peek };
}
