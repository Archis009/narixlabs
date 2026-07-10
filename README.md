# Sprint Board

A highly interactive, aesthetically pleasing single-page React application for tracking work items. Built for the Narix Labs Frontend Intern Assignment.

## Features

- **Board View**: Three columns ("To Do", "In Progress", "Done").
- **Task Management**: Add, edit, delete, and move tasks across columns.
- **Filtering & Search**: Debounced search by title, and combined filtering by Priority and Assignee.
- **State Persistence**: Uses `localStorage` to persist the board state across page reloads.
- **Seed Data**: Automatically fetches 12 tasks from JSONPlaceholder on initial load.
- **Live Counts**: Column headers show live task counts.

## How to run it locally

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd narixlabs-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production** (optional):
   ```bash
   npm run build
   ```

## Design Decisions & Architecture

1. **State Management via `useReducer` and Context API**
   - **Why**: The assignment prohibited external state-management libraries (like Redux or Zustand). While `useState` would work, a `useReducer` paired with React Context provides a robust, predictable, and single source of truth for global state. It makes actions like adding, updating, deleting, and moving tasks clean and maintainable without prop-drilling through deeply nested components.
   - **Persistence**: We load state lazily from `localStorage` on initial mount within the Context, falling back to our API seed if it's empty or invalid.

2. **Tailwind CSS for Styling**
   - **Why**: To deliver a "premium" and "rich" aesthetic rapidly. Tailwind allows us to implement glassmorphism (`backdrop-blur-md`), smooth micro-animations (`hover:-translate-y-1`), and a cohesive sleek dark-mode color palette directly in our markup without managing dozens of CSS files.

3. **Simple Action Menu for Moving Tasks**
   - **Why**: The assignment stated that a simple button or dropdown is completely acceptable and no extra points are awarded for drag-and-drop. I implemented a clean "three-dots" action menu on each task card. This approach is highly accessible via keyboard, works well on mobile, and keeps the code incredibly lean and deterministic.

## What's Left Incomplete / Stretch Goals

While the core functionality is fully operational, the following stretch goals were deliberately omitted to prioritize code quality and a polished core experience:
- **Undo last action**: This would require extending the `useReducer` state to maintain a `past` array (history stack) and adding an `UNDO` action type.
- **Keyboard shortcuts for creating a task**: Could be added with a simple global `useEffect` listening for `Cmd+K` or `N`.
- **Drag-and-Drop functionality**: Decided against adding a heavy HTML5 Dnd implementation in favor of the clean dropdown menu.
