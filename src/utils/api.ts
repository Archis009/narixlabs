import { Task, Priority, Status } from '../types/task';

interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];
const ASSIGNEES = ['Alice', 'Bob', 'Charlie', 'Diana'];

export const fetchInitialTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=12');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data: ApiTodo[] = await response.json();
    
    return data.map((todo) => {
      const priority = PRIORITIES[todo.id % PRIORITIES.length];
      const assignee = ASSIGNEES[todo.id % ASSIGNEES.length];
      const status: Status = todo.completed ? 'Done' : 'To Do';
      
      return {
        id: todo.id.toString(),
        title: todo.title.substring(0, 80),
        description: `Seed task from API (User ID: ${todo.userId})`,
        status,
        priority,
        assignee
      };
    });
  } catch (error) {
    console.error('Error fetching seed data:', error);
    throw error;
  }
};
