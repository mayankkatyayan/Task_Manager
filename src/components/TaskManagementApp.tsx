
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
  const { todoTasks, completedTasks, moveTaskToColumn } = useTaskManagement();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // If the task was dropped within the same column
    if (source.droppableId === destination.droppableId) {
      // Handle reordering within the same status column
      // This is a simplified version as we're not actually reordering within status groups
      // in our current state management approach
      return;
    } 
    
    // Task moved to a different column
    moveTaskToColumn(
      draggableId,
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index
    );
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
      <header className="mb-8 bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Task Management</h1>
        <p className="text-muted-foreground">Organize, prioritize, and complete your tasks efficiently</p>
      </header>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <TaskFilters />
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-primary hover:bg-primary/80">
          <PlusIcon className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaskList 
            tasks={todoTasks} 
            onEditTask={handleEditTask} 
            droppableId="todo" 
            title="To Do" 
          />
          <TaskList 
            tasks={completedTasks} 
            onEditTask={handleEditTask} 
            droppableId="completed" 
            title="Completed" 
          />
        </div>
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
