export interface Complaint {
  id: number;
  priority: number;
  description: string;
}

export interface HeapNode {
  complaint: Complaint;
  left: HeapNode | null;
  right: HeapNode | null;
}

/** Merge two skew heaps (min-heap by priority) */
function mergeNodes(h1: HeapNode | null, h2: HeapNode | null): HeapNode | null {
  if (!h1) return h2;
  if (!h2) return h1;

  // Ensure min-heap property
  if (h2.complaint.priority < h1.complaint.priority) {
    [h1, h2] = [h2, h1];
  }

  // Recursively merge and swap children (skew heap property)
  const temp = h1.left;
  h1.left = mergeNodes(h1.right, h2);
  h1.right = temp;

  return h1;
}

/** Deep clone a heap node tree */
function cloneNode(node: HeapNode | null): HeapNode | null {
  if (!node) return null;
  return {
    complaint: { ...node.complaint },
    left: cloneNode(node.left),
    right: cloneNode(node.right),
  };
}

export class SkewHeap {
  root: HeapNode | null = null;
  private hashTable: Map<number, HeapNode> = new Map();

  /** Insert a new complaint */
  insert(complaint: Complaint): void {
    const newNode: HeapNode = {
      complaint: { ...complaint },
      left: null,
      right: null,
    };
    this.hashTable.set(complaint.id, newNode);
    this.root = mergeNodes(this.root, newNode);
  }

  /** Resolve (remove) the highest priority complaint */
  resolve(): Complaint | null {
    if (!this.root) return null;
    const resolved = { ...this.root.complaint };
    this.hashTable.delete(resolved.id);
    this.root = mergeNodes(this.root.left, this.root.right);
    return resolved;
  }

  /** Peek at the highest priority complaint without removing */
  peek(): Complaint | null {
    return this.root ? { ...this.root.complaint } : null;
  }

  /** Search for a complaint by ID using hash table — O(1) */
  search(id: number): Complaint | null {
    const node = this.hashTable.get(id);
    return node ? { ...node.complaint } : null;
  }

  /** Get all complaints via preorder traversal */
  getAll(): Complaint[] {
    const result: Complaint[] = [];
    this._preorder(this.root, result);
    return result;
  }

  private _preorder(node: HeapNode | null, result: Complaint[]): void {
    if (!node) return;
    result.push({ ...node.complaint });
    this._preorder(node.left, result);
    this._preorder(node.right, result);
  }

  /** Get count of complaints */
  get size(): number {
    return this.hashTable.size;
  }

  /** Clone the entire heap */
  clone(): SkewHeap {
    const newHeap = new SkewHeap();
    newHeap.root = cloneNode(this.root);
    // Rebuild hash table from cloned tree
    const rebuild = (node: HeapNode | null) => {
      if (!node) return;
      newHeap.hashTable.set(node.complaint.id, node);
      rebuild(node.left);
      rebuild(node.right);
    };
    rebuild(newHeap.root);
    return newHeap;
  }
}
