
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  completedAt: string | null;
  dueDate: string | null;
}

export interface TaskState {
  tasks: Task[];
  filter: {
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
  };
  sort: {
    by: 'createdAt' | 'dueDate' | 'priority';
    direction: 'asc' | 'desc';
  };
}
