
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
  if (tasks.length === 0) {
    return (
      <div className="border rounded-lg p-4 bg-background h-full min-h-[200px]">
        <div className="font-medium text-lg mb-4 text-center">{title}</div>
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
    <div className="border rounded-lg p-4 bg-background h-full min-h-[200px]">
      <div className="font-medium text-lg mb-4 text-center">{title}</div>
      <Droppable droppableId={droppableId}>
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
