import React from 'react';
import { Task, Status } from '../types/task';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const statusColors = {
  'To Do': 'border-blue-500/50 bg-blue-500/10 text-blue-400',
  'In Progress': 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
  'Done': 'border-green-500/50 bg-green-500/10 text-green-400',
};

export const Column: React.FC<ColumnProps> = ({ status, tasks, onEditTask }) => {
  return (
    <div className="flex flex-col bg-surface/30 border border-surfaceHover rounded-2xl overflow-hidden backdrop-blur-sm h-full">
      <div className="p-4 border-b border-surfaceHover flex justify-between items-center bg-surface/50">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full border ${statusColors[status]}`} />
          <h2 className="font-semibold text-lg">{status}</h2>
        </div>
        <span className="bg-background px-2.5 py-0.5 rounded-full text-sm font-medium border border-surfaceHover">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex-1 p-3 overflow-y-auto min-h-[150px]">
        {tasks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-textMuted text-sm italic border-2 border-dashed border-surfaceHover rounded-xl p-8 text-center">
            No tasks in this column
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))
        )}
      </div>
    </div>
  );
};
