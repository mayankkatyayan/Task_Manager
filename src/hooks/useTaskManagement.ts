
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../redux/store';
import { 
  addTask, 
  updateTask, 
  deleteTask, 
  completeTask,
  setFilter,
  setSort,
  reorderTasks
} from '../redux/tasksSlice';
import { Task, TaskPriority, TaskStatus } from '../types/task';

export const useTaskManagement = () => {
  const dispatch = useDispatch();
  const { tasks, filter, sort } = useSelector((state: RootState) => state.tasks);
  
  const createTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    const newTask: Task = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      completedAt: null,
      ...taskData,
    };
    dispatch(addTask(newTask));
  }, [dispatch]);
  
  const editTask = useCallback((task: Task) => {
    dispatch(updateTask(task));
  }, [dispatch]);
  
  const removeTask = useCallback((taskId: string) => {
    dispatch(deleteTask(taskId));
  }, [dispatch]);
  
  const markTaskComplete = useCallback((taskId: string) => {
    dispatch(completeTask(taskId));
  }, [dispatch]);
  
  const updateFilter = useCallback((status?: TaskStatus | 'all', priority?: TaskPriority | 'all') => {
    const filterPayload: any = {};
    if (status) filterPayload.status = status;
    if (priority) filterPayload.priority = priority;
    dispatch(setFilter(filterPayload));
  }, [dispatch]);
  
  const updateSort = useCallback((by?: 'createdAt' | 'dueDate' | 'priority', direction?: 'asc' | 'desc') => {
    const sortPayload: any = {};
    if (by) sortPayload.by = by;
    if (direction) sortPayload.direction = direction;
    dispatch(setSort(sortPayload));
  }, [dispatch]);
  
  const moveTask = useCallback((sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderTasks({ source: sourceIndex, destination: destinationIndex }));
  }, [dispatch]);
  
  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (filter.status !== 'all' && task.status !== filter.status) return false;
      if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
      return true;
    })
    .sort((a, b) => {
      const direction = sort.direction === 'asc' ? 1 : -1;
      
      if (sort.by === 'priority') {
        const priorityValues = { high: 3, medium: 2, low: 1 };
        return direction * (priorityValues[b.priority as keyof typeof priorityValues] - 
                           priorityValues[a.priority as keyof typeof priorityValues]);
      }
      
      if (sort.by === 'dueDate') {
        if (!a.dueDate) return direction;
        if (!b.dueDate) return -direction;
        return direction * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      }
      
      return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    });
  
  return {
    tasks: filteredAndSortedTasks,
    filter,
    sort,
    createTask,
    editTask,
    removeTask,
    markTaskComplete,
    updateFilter,
    updateSort,
    moveTask,
  };
};
