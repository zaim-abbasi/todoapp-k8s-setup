
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import { fetchTodos, createTodo, updateTodo, deleteTodo, Todo } from '@/api/todoApi';

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (error) {
      setError('Failed to load todos. Please check if the backend is running.');
      console.error('Error loading todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({ title });
      setTodos([newTodo, ...todos]);
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Failed to add todo');
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await updateTodo(id, { completed });
      setTodos(
        todos.map((todo) => (todo._id === id ? { ...todo, completed } : todo))
      );
      toast.success(`Todo marked as ${completed ? 'completed' : 'active'}`);
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            MERN Todo App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TodoForm onAddTodo={handleAddTodo} />
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-gray-500">Loading todos...</div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-600 mb-4">
              {error}
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          )}
          
          {!loading && !error && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              {todos.filter(t => t.completed).length} of {todos.length} tasks completed
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
