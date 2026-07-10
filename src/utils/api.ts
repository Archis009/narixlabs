import { Task, Priority, Status } from '../types/task';

interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];
const ASSIGNEES = ['Alice', 'Bob', 'Charlie', 'Diana'];
const ENGLISH_TITLES = [
  'Design the landing page mockup',
  'Implement authentication flow',
  'Fix the navigation bar responsiveness',
  'Write unit tests for the Board component',
  'Optimize images on the home page',
  'Setup CI/CD pipeline',
  'Refactor state management to Context API',
  'Update user profile settings page',
  'Integrate Stripe for payments',
  'Debug the memory leak in production',
  'Add dark mode support',
  'Write documentation for the new API endpoint'
];

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
        title: ENGLISH_TITLES[(todo.id - 1) % ENGLISH_TITLES.length],
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
