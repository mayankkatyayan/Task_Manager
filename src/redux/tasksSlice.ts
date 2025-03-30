
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../types/task';
import { loadTasks, saveTasks } from '../utils/localStorage';

const initialState: TaskState = {
  tasks: loadTasks(),
  filter: {
    status: 'all',
    priority: 'all',
  },
  sort: {
    by: 'createdAt',
    direction: 'desc',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].status = 'completed';
        state.tasks[index].completedAt = new Date().toISOString();
        saveTasks(state.tasks);
      }
    },
    setFilter: (state, action: PayloadAction<Partial<TaskState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSort: (state, action: PayloadAction<Partial<TaskState['sort']>>) => {
      state.sort = { ...state.sort, ...action.payload };
    },
    reorderTasks: (state, action: PayloadAction<{ source: number; destination: number }>) => {
      const { source, destination } = action.payload;
      const [removed] = state.tasks.splice(source, 1);
      state.tasks.splice(destination, 0, removed);
      saveTasks(state.tasks);
    },
    moveTaskBetweenColumns: (state, action: PayloadAction<{ 
      taskId: string;
      sourceIndex: number;
      destinationIndex: number;
      newStatus: 'todo' | 'in-progress' | 'completed';
    }>) => {
      const { taskId, newStatus } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        // Update the task status
        state.tasks[taskIndex].status = newStatus;
        
        // If marked as completed, set completedAt date
        if (newStatus === 'completed') {
          state.tasks[taskIndex].completedAt = new Date().toISOString();
        } else {
          // If moved from completed to another status
          state.tasks[taskIndex].completedAt = null;
        }
        
        saveTasks(state.tasks);
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  setFilter,
  setSort,
  reorderTasks,
  moveTaskBetweenColumns,
} = tasksSlice.actions;

export default tasksSlice.reducer;
