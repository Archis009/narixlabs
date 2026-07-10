export type Priority = 'low' | 'medium' | 'high';
export type Status = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignee: string;
}

export interface FilterState {
  priority: Priority | 'all';
  assignee: string | 'all';
  searchQuery: string;
}
