
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import { fetchTodos, createTodo, updateTodo, deleteTodo, Todo } from '@/api/todoApi';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, CheckCircle2, ListTodo } from 'lucide-react';

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

  const completedCount = todos.filter(t => t.completed).length;
  const completionPercentage = todos.length ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-xl mb-2">
            <ListTodo className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Task Master</h1>
          <p className="text-gray-500">Manage your tasks efficiently</p>
        </div>

        <Card className="border-none shadow-lg bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 pb-8 relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-white opacity-90" />
                  <p className="text-white opacity-90 text-sm">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <CardTitle className="text-white text-2xl font-medium">
                    {completedCount} of {todos.length}
                  </CardTitle>
                  <p className="text-white/80 text-sm mt-1">Tasks completed</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{Math.round(completionPercentage)}%</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Progress value={completionPercentage} className="h-2 bg-white/20" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="px-6 py-5 border-b border-gray-100">
              <TodoForm onAddTodo={handleAddTodo} />
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                  <p className="mt-3 text-gray-500 text-sm">Loading your tasks...</p>
                </div>
              </div>
            ) : error ? (
              <div className="m-6 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-sm">
                <p className="font-medium mb-1">Connection Error</p>
                <p className="opacity-80">{error}</p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTodo}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
