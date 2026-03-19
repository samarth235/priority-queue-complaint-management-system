# 🛡️ Priority Complaint Management System

A priority-based complaint management system built with React and TypeScript, powered by a **Skew Heap** data structure for efficient priority queuing and a **Hash Table** for O(1) complaint lookup.

🔗 **Live Demo:** [priority-queue-complaint-management-upuf.onrender.com](https://priority-queue-complaint-management-upuf.onrender.com)

---

## 🚀 Features

- **Register Complaints** — Submit complaints with a custom priority level and description
- **Resolve by Priority** — Always resolves the highest-priority complaint first (min-heap)
- **Search by ID** — Instant O(1) lookup using a built-in hash table
- **Live Stats** — Real-time count and queue status
- **Sorted View** — All complaints displayed in priority order via preorder traversal

---

## 🧠 Data Structures Used

### Skew Heap
A self-adjusting leftist heap that supports efficient merge operations. Used as the core priority queue.

| Operation | Time Complexity |
|-----------|----------------|
| Insert    | O(log n)        |
| Resolve (extract min) | O(log n) |
| Peek      | O(1)            |
| Merge     | O(log n)        |

### Hash Table (`Map<id, HeapNode>`)
Paired with the heap to enable instant complaint lookup without traversal.

| Operation | Time Complexity |
|-----------|----------------|
| Search by ID | O(1)        |

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** + **shadcn/ui** (UI components)
- **React Hook Form** + **Zod** (form validation)
- **Sonner** (toast notifications)
- **Bun** (package manager)

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone https://github.com/samarth235/priority-queue-complaint-management-system.git
cd priority-queue-complaint-management-system

# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build for Production

```bash
bun run build
# or
npm run build
```

Output will be in the `dist/` folder.

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ComplaintForm.tsx     # Form to register new complaints
│   ├── ComplaintList.tsx     # Displays all complaints sorted by priority
│   ├── ResolvePanel.tsx      # Resolves the highest-priority complaint
│   ├── SearchPanel.tsx       # Search complaints by ID
│   ├── StatsBar.tsx          # Live queue statistics
│   └── ui/                   # shadcn/ui base components
├── hooks/
│   └── useSkewHeap.ts        # React hook wrapping the SkewHeap class
├── lib/
│   └── skewHeap.ts           # Core Skew Heap + Hash Table implementation
└── pages/
    └── Index.tsx             # Main application page
```

---

## ☁️ Deployment (Render)

This project is deployed as a **Static Site** on [Render](https://render.com).

| Setting | Value |
|---------|-------|
| Build Command | `bun install && bun run build` |
| Publish Directory | `dist` |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
