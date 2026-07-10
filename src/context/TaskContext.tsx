import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Task, Status } from '../types/task';
import { fetchInitialTasks } from '../utils/api';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

type TaskAction =
  | { type: 'INIT_START' }
  | { type: 'INIT_SUCCESS'; payload: Task[] }
  | { type: 'INIT_FAILURE'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { id: string; status: Status } };

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
  isInitialized: false,
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'INIT_START':
      return { ...state, isLoading: true, error: null };
    case 'INIT_SUCCESS':
      return { ...state, tasks: action.payload, isLoading: false, isInitialized: true };
    case 'INIT_FAILURE':
      return { ...state, isLoading: false, error: action.payload, isInitialized: true };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };
    default:
      return state;
  }
};

const LOCAL_STORAGE_KEY = 'narixlabs_sprint_board_tasks';

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load from local storage or API on mount
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'INIT_START' });
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          dispatch({ type: 'INIT_SUCCESS', payload: parsed });
          return;
        } catch (e) {
          console.error('Failed to parse local storage', e);
          // If parse fails, proceed to fetch
        }
      }

      // No valid local storage data, fetch from API
      try {
        const initialTasks = await fetchInitialTasks();
        dispatch({ type: 'INIT_SUCCESS', payload: initialTasks });
      } catch (error) {
        dispatch({ type: 'INIT_FAILURE', payload: 'Failed to fetch seed tasks. You can still use the board.' });
      }
    };

    loadData();
  }, []);

  // Persist to local storage whenever tasks change, but only if initialized to avoid overwriting with empty array on first render
  useEffect(() => {
    if (state.isInitialized) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.tasks));
    }
  }, [state.tasks, state.isInitialized]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
