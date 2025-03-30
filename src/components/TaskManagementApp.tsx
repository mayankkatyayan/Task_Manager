
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import { useTaskManagement } from '../hooks/useTaskManagement';
import { Task } from '../types/task';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const TaskManagementApp = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { tasks, moveTask, markTaskComplete } = useTaskManagement();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    // Handle moving task within the list
    moveTask(result.source.index, result.destination.index);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Task Management</h1>
        <p className="text-muted-foreground">Organize, prioritize, and complete your tasks efficiently</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <TaskFilters />
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskList tasks={tasks} onEditTask={handleEditTask} />
      </DragDropContext>

      {isFormOpen && (
        <TaskForm 
          onClose={handleCloseForm}
          editTask={editingTask}
        />
      )}
    </div>
  );
};

export default TaskManagementApp;
