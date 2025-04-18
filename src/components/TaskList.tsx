
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { Task } from '../types/task';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  droppableId: string;
  title: string;
}

const TaskList = ({ tasks, onEditTask, droppableId, title }: TaskListProps) => {
  // Define column colors based on status
  const getColumnColor = () => {
    if (droppableId === 'todo') return 'border-blue-400';
    return 'border-green-400'; // completed
  };
  
  return (
    <div className={`border ${getColumnColor()} rounded-lg p-4 bg-background h-full min-h-[200px] border-dotted border-2`}>
      <div className={`font-medium text-lg mb-4 text-center ${droppableId === 'todo' ? 'text-blue-600' : 'text-green-600'}`}>
        {title}
      </div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3 min-h-[150px]"
          >
            {tasks.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No tasks</AlertTitle>
                <AlertDescription>
                  No tasks in this column yet.
                </AlertDescription>
              </Alert>
            ) : (
              tasks.map((task, index) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  index={index}
                  onEdit={() => onEditTask(task)} 
                  isDraggable={true}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
