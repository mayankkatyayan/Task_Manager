
import { useMemo } from 'react';
import { useTaskManagement } from '../hooks/useTaskManagement';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flag
} from "lucide-react";
import { Button } from '@/components/ui/button';

const TaskFilters = () => {
  const { filter, sort, updateFilter, updateSort } = useTaskManagement();
  
  const sortOptions = useMemo(() => [
    { value: 'createdAt', label: 'Date Created', icon: Clock },
    { value: 'dueDate', label: 'Due Date', icon: CalendarDays },
    { value: 'priority', label: 'Priority', icon: Flag },
  ], []);

  const handleToggleSortDirection = () => {
    updateSort(undefined, sort.direction === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={filter.status}
        onValueChange={(value) => updateFilter(value as any, undefined)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Filter Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.priority}
        onValueChange={(value) => updateFilter(undefined, value as any)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Filter Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sort.by}
        onValueChange={(value) => updateSort(value as any, undefined)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center">
                <option.icon className="mr-2 h-4 w-4" />
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline" 
        size="icon" 
        onClick={handleToggleSortDirection}
        className="w-9 h-9"
      >
        {sort.direction === 'asc' ? (
          <ArrowUpAZ className="h-4 w-4" />
        ) : (
          <ArrowDownAZ className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default TaskFilters;
