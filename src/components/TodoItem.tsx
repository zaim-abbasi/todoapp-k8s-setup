
import React from 'react';
import { Todo } from '@/api/todoApi';
import { Trash2, Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 group hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggleComplete(todo._id, !todo.completed)}
          className="focus:outline-none"
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500" />
          )}
        </button>
        <span 
          className={cn(
            "text-gray-800 transition-all duration-200",
            todo.completed && "line-through text-gray-400"
          )}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity focus:opacity-100 focus:outline-none"
        aria-label="Delete todo"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;
