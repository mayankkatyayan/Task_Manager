
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { Task, TaskStatus } from '../types/task';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  droppableId: string;
  title: string;
}

const TaskList = ({ tasks, onEditTask, droppableId, title }: TaskListProps) => {
  // Check if this column supports drag and drop
  const isDraggableColumn = droppableId === 'todo' || droppableId === 'completed';
  
  // Define column colors based on status
  const getColumnColor = () => {
    if (droppableId === 'todo') return 'border-blue-400';
    if (droppableId === 'completed') return 'border-green-400';
    return 'border-purple-400'; // in-progress
  };
  
  if (tasks.length === 0) {
    return (
      <div className={`border ${getColumnColor()} rounded-lg p-4 bg-background h-full min-h-[200px] ${isDraggableColumn ? 'border-dotted border-2' : ''}`}>
        <div className={`font-medium text-lg mb-4 text-center ${droppableId === 'todo' ? 'text-blue-600' : droppableId === 'completed' ? 'text-green-600' : 'text-purple-600'}`}>
          {title}
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No tasks</AlertTitle>
          <AlertDescription>
            No tasks in this column yet.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`border ${getColumnColor()} rounded-lg p-4 bg-background h-full min-h-[200px] ${isDraggableColumn ? 'border-dotted border-2' : ''}`}>
      <div className={`font-medium text-lg mb-4 text-center ${droppableId === 'todo' ? 'text-blue-600' : droppableId === 'completed' ? 'text-green-600' : 'text-purple-600'}`}>
        {title}
      </div>
      <Droppable droppableId={droppableId} isDropDisabled={!isDraggableColumn}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3 min-h-[150px]"
          >
            {tasks.map((task, index) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                index={index}
                onEdit={() => onEditTask(task)} 
                isDraggable={isDraggableColumn}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
