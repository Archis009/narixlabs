import React, { useState, useEffect } from 'react';
import { FilterState, Priority } from '../types/task';
import { useDebounce } from '../hooks/useDebounce';
import { Search, Filter as FilterIcon } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const { state } = useTasks();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  
  const [priority, setPriority] = useState<Priority | 'all'>('all');
  const [assignee, setAssignee] = useState<string | 'all'>('all');

  const uniqueAssignees = Array.from(new Set(state.tasks.map(t => t.assignee))).filter(Boolean);

  useEffect(() => {
    onFilterChange({
      searchQuery: debouncedSearch,
      priority,
      assignee
    });
  }, [debouncedSearch, priority, assignee, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-surface border border-surfaceHover p-3 rounded-xl shadow-lg mt-4 w-full">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-textMuted" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-background border border-surfaceHover rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <FilterIcon size={18} className="text-textMuted hidden md:block" />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority | 'all')}
          className="bg-background border border-surfaceHover rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="bg-background border border-surfaceHover rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none max-w-[150px]"
        >
          <option value="all">All Assignees</option>
          {uniqueAssignees.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
