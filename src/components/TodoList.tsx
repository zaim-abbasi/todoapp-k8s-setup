
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/api/todoApi';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LucideInbox } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <LucideInbox className="w-6 h-6 text-indigo-400" />
        </div>
        <p className="text-gray-600 font-medium">No tasks yet</p>
        <p className="text-gray-400 text-sm mt-1">Add a task to get started</p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[500px]">
      <div className="divide-y divide-gray-100">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TodoList;
