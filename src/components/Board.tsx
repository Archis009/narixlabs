import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { Column } from './Column';
import { Task, FilterState } from '../types/task';

interface BoardProps {
  filters: FilterState;
  onEditTask: (task: Task) => void;
}

export const Board: React.FC<BoardProps> = ({ filters, onEditTask }) => {
  const { state } = useTasks();

  const filteredTasks = useMemo(() => {
    return state.tasks.filter(task => {
      // 1. Search Query
      if (filters.searchQuery && !task.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      // 2. Priority Filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      // 3. Assignee Filter
      if (filters.assignee !== 'all' && task.assignee !== filters.assignee) {
        return false;
      }
      return true;
    });
  }, [state.tasks, filters]);

  if (state.isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const todoTasks = filteredTasks.filter(t => t.status === 'To Do');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'In Progress');
  const doneTasks = filteredTasks.filter(t => t.status === 'Done');

  return (
    <div className="flex-1 overflow-hidden p-4">
      {state.error && (
        <div className="mb-4 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-2">
          <span>⚠️ {state.error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">
        <Column status="To Do" tasks={todoTasks} onEditTask={onEditTask} />
        <Column status="In Progress" tasks={inProgressTasks} onEditTask={onEditTask} />
        <Column status="Done" tasks={doneTasks} onEditTask={onEditTask} />
      </div>
    </div>
  );
};
