
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-gray-50 border-none text-base focus-visible:ring-1 focus-visible:ring-indigo-300"
        aria-label="New todo title"
      />
      <Button 
        type="submit" 
        disabled={!title.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 rounded-xl"
      >
        <PlusCircle className="w-4 h-4 mr-1" />
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
