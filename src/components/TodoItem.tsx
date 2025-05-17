
import React from 'react';
import { Todo } from '@/api/todoApi';
import { Trash2, Circle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center px-6 py-4 group hover:bg-gray-50 transition-colors duration-200">
      <button
        onClick={() => onToggleComplete(todo._id, !todo.completed)}
        className="focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 rounded-full"
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed ? (
          <CheckCircle className="w-5 h-5 text-indigo-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300 hover:text-indigo-300" />
        )}
      </button>
      
      <span 
        className={cn(
          "ml-3 text-base transition-all duration-200 flex-1",
          todo.completed ? 
            "line-through text-gray-400 font-normal" : 
            "text-gray-800 font-medium"
        )}
      >
        {todo.title}
      </span>
      
      <button
        onClick={() => onDelete(todo._id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 rounded-full p-1"
        aria-label="Delete todo"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;
