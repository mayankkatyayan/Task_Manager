
import { useState } from 'react';
import { format } from 'date-fns';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/task';
import { useTaskManagement } from '../hooks/useTaskManagement';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  GripVertical, 
  MoreVertical,
  Pencil, 
  Trash2 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface TaskItemProps {
  task: Task;
  index: number;
  onEdit: () => void;
}

const TaskItem = ({ task, index, onEdit }: TaskItemProps) => {
  const { removeTask, markTaskComplete } = useTaskManagement();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: "bg-blue-500",
    medium: "bg-yellow-500",
    high: "bg-red-500"
  };

  const statusColors = {
    todo: "bg-slate-500",
    'in-progress': "bg-purple-500",
    completed: "bg-green-500"
  };

  const handleDelete = () => {
    removeTask(task.id);
    toast({
      title: "Task deleted",
      description: "The task has been permanently removed."
    });
  };

  const handleComplete = () => {
    if (task.status !== 'completed') {
      markTaskComplete(task.id);
      toast({
        title: "Task completed",
        description: "Great job! You've completed this task."
      });
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`transition-all ${snapshot.isDragging ? 'opacity-70 shadow-lg' : ''} ${task.status === 'completed' ? 'opacity-75' : ''}`}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-1 cursor-grab" {...provided.dragHandleProps}>
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium text-lg ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleComplete} disabled={task.status === 'completed'}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Mark Complete</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className={`${statusColors[task.status]}`}>
                      {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={priorityColors[task.priority]}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-muted-foreground text-sm" 
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </Button>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p className="mb-2">{task.description || "No description provided."}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-4 py-2 flex justify-between text-xs text-muted-foreground border-t">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
              </div>
              
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
