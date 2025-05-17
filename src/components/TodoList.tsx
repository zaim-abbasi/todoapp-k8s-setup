
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/api/todoApi';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-gray-500">No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
