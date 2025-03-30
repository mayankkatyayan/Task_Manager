
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { Task } from '../types/task';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TaskList = ({ tasks, onEditTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <Alert className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No tasks found</AlertTitle>
        <AlertDescription>
          No tasks match your current filters or you haven't created any tasks yet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-3"
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskItem task={task} onEdit={() => onEditTask(task)} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
