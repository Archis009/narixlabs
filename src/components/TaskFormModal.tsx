import React, { useState, useEffect } from 'react';
import { Task, Priority } from '../types/task';
import { useTasks } from '../context/TaskContext';
import { X } from 'lucide-react';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, taskToEdit }) => {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority);
      setAssignee(taskToEdit.assignee);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setAssignee('');
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !assignee.trim()) return;

    if (taskToEdit) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          ...taskToEdit,
          title: title.trim(),
          description: description.trim(),
          priority,
          assignee: assignee.trim(),
        },
      });
    } else {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: Date.now().toString(),
          title: title.trim(),
          description: description.trim(),
          priority,
          assignee: assignee.trim(),
          status: 'To Do',
        },
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-surfaceHover shadow-2xl rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-surfaceHover">
          <h2 className="text-xl font-semibold">{taskToEdit ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-surfaceHover rounded-md text-textMuted hover:text-text transition-colors" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title <span className="text-danger">*</span></label>
            <input
              id="title"
              type="text"
              required
              maxLength={80}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background border border-surfaceHover rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g., Update landing page design"
            />
            <div className="text-right text-xs text-textMuted mt-1">{title.length}/80</div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-background border border-surfaceHover rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Optional details..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-background border border-surfaceHover rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="assignee" className="block text-sm font-medium mb-1">Assignee <span className="text-danger">*</span></label>
              <input
                id="assignee"
                type="text"
                required
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full bg-background border border-surfaceHover rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Name"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surfaceHover hover:bg-surfaceHover/80 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primaryHover text-white transition-colors font-medium shadow-lg shadow-primary/20"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
