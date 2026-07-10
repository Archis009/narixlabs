import React, { useState } from 'react'
import { TaskProvider } from './context/TaskContext'
import { Board } from './components/Board'
import { Filters } from './components/Filters'
import { TaskFormModal } from './components/TaskFormModal'
import { FilterState, Task } from './types/task'
import { Plus } from 'lucide-react'

function AppContent() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    priority: 'all',
    assignee: 'all'
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCreateTask = () => {
    setTaskToEdit(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans flex flex-col">
      <header className="px-6 py-4 border-b border-surfaceHover bg-surface/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Sprint Board
            </h1>
            <button
              onClick={handleCreateTask}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg transition-all shadow-lg shadow-primary/20 font-medium"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
          <Filters onFilterChange={setFilters} />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col pt-4 pb-8">
        <Board filters={filters} onEditTask={handleEditTask} />
      </main>

      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  )
}

export default App
