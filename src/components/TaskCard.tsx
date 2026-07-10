import React, { useState } from 'react';
import { Task, Status } from '../types/task';
import { useTasks } from '../context/TaskContext';
import { Pencil, Trash2, ChevronRight, ChevronLeft, MoreVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { dispatch } = useTasks();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  const moveTask = (newStatus: Status) => {
    dispatch({ type: 'MOVE_TASK', payload: { id: task.id, status: newStatus } });
    setShowMenu(false);
  };

  return (
    <div className={`glass p-4 rounded-xl mb-3 group hover:-translate-y-1 transition-all duration-200 relative ${showMenu ? 'z-50' : 'z-0'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority]} font-medium uppercase tracking-wider`}>
            {task.priority}
          </span>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-textMuted hover:text-text p-1 rounded-md hover:bg-surface transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Task actions"
          >
            <MoreVertical size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-surfaceHover rounded-lg shadow-xl py-1 z-10 animate-in fade-in zoom-in-95 duration-100">
              {task.status !== 'To Do' && (
                <button onClick={() => moveTask('To Do')} className="w-full text-left px-3 py-1.5 text-sm hover:bg-surfaceHover flex items-center gap-2">
                  <ChevronLeft size={14} /> To Do
                </button>
              )}
              {task.status !== 'In Progress' && (
                <button onClick={() => moveTask('In Progress')} className="w-full text-left px-3 py-1.5 text-sm hover:bg-surfaceHover flex items-center gap-2">
                  <ChevronRight size={14} /> In Progress
                </button>
              )}
              {task.status !== 'Done' && (
                <button onClick={() => moveTask('Done')} className="w-full text-left px-3 py-1.5 text-sm hover:bg-surfaceHover flex items-center gap-2">
                  <ChevronRight size={14} /> Done
                </button>
              )}
              <div className="h-px bg-surfaceHover my-1" />
              <button onClick={() => { onEdit(task); setShowMenu(false); }} className="w-full text-left px-3 py-1.5 text-sm hover:bg-surfaceHover text-primary flex items-center gap-2">
                <Pencil size={14} /> Edit
              </button>
              <button onClick={handleDelete} className="w-full text-left px-3 py-1.5 text-sm hover:bg-surfaceHover text-danger flex items-center gap-2">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-text mb-1 break-words">{task.title}</h3>
      
      {task.description && (
        <p className="text-sm text-textMuted mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
            {task.assignee.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-textMuted">{task.assignee}</span>
        </div>
      </div>
    </div>
  );
};
