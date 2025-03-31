
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
  Clock,
  FilterIcon,
  Flag,
  SlidersHorizontal
} from "lucide-react";
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Filter Tasks</h4>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none">Status</label>
              <Select
                value={filter.status}
                onValueChange={(value) => updateFilter(value as any, undefined)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none">Priority</label>
              <Select
                value={filter.priority}
                onValueChange={(value) => updateFilter(undefined, value as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Sort
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Sort Tasks</h4>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none">Sort By</label>
              <Select
                value={sort.by}
                onValueChange={(value) => updateSort(value as any, undefined)}
              >
                <SelectTrigger className="w-full">
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
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none">Direction</label>
              <Button
                variant="outline" 
                className="w-full justify-start gap-2" 
                onClick={handleToggleSortDirection}
              >
                {sort.direction === 'asc' ? (
                  <>
                    <ArrowUpAZ className="h-4 w-4" />
                    Ascending
                  </>
                ) : (
                  <>
                    <ArrowDownAZ className="h-4 w-4" />
                    Descending
                  </>
                )}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskFilters;
