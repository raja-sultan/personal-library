# React 19 App - Code Examples

Quick reference for common tasks in the React 19 application.

## 🔐 Authentication

### Login in a Component
```typescript
import { useAuthStore } from '@stores/authStore';

export function LoginForm() {
  const { login } = useAuthStore();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Success - app state updated, user redirected
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <button onClick={() => handleLogin('user@example.com', 'password')}>
      Login
    </button>
  );
}
```

### Check Authentication Status
```typescript
import { useAuthStore } from '@stores/authStore';

export function Dashboard() {
  const { isAuthenticated, user, token } = useAuthStore();
  
  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }
  
  return (
    <div>
      <p>Welcome {user?.name}</p>
      <p>Token: {token?.substring(0, 20)}...</p>
    </div>
  );
}
```

### Logout
```typescript
import { useAuthStore } from '@stores/authStore';

export function UserMenu() {
  const { logout, user } = useAuthStore();
  
  return (
    <div>
      <span>{user?.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🎨 Theme Management

### Toggle Theme
```typescript
import { useUIStore } from '@stores/uiStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

### Check Current Theme
```typescript
import { useUIStore } from '@stores/uiStore';
import { Box } from '@mui/material';

export function ThemedBox() {
  const { theme } = useUIStore();
  
  return (
    <Box
      sx={{
        backgroundColor: theme === 'light' ? '#fff' : '#121212',
        color: theme === 'light' ? '#000' : '#fff',
        padding: 2,
      }}
    >
      Current theme: {theme}
    </Box>
  );
}
```

## 🌐 API Calls

### GET Request
```typescript
import { useEffect, useState } from 'react';
import apiClient from '@services/base-api';

export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        // 401 will auto-logout (interceptor handles it)
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### POST Request
```typescript
import apiClient from '@services/base-api';

export function CreateUser() {
  const handleSubmit = async (formData: any) => {
    try {
      const response = await apiClient.post('/users', {
        name: formData.name,
        email: formData.email,
      });
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit(Object.fromEntries(formData));
    }}>
      <input type="text" name="name" placeholder="Name" />
      <input type="email" name="email" placeholder="Email" />
      <button type="submit">Create</button>
    </form>
  );
}
```

### PUT/PATCH Request
```typescript
import apiClient from '@services/base-api';

export function UpdateUser({ userId }: { userId: string }) {
  const handleUpdate = async (updates: any) => {
    try {
      const response = await apiClient.put(`/users/${userId}`, updates);
      console.log('Updated:', response.data);
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };
  
  return (
    <button onClick={() => handleUpdate({ name: 'New Name' })}>
      Update User
    </button>
  );
}
```

### DELETE Request
```typescript
import apiClient from '@services/base-api';

export function DeleteUser({ userId }: { userId: string }) {
  const handleDelete = async () => {
    try {
      await apiClient.delete(`/users/${userId}`);
      console.log('User deleted');
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };
  
  return (
    <button onClick={handleDelete}>Delete User</button>
  );
}
```

## 🗂️ State Management with Zustand

### Create a New Store
```typescript
// src/stores/todoStore.ts
import { create } from 'zustand';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  
  addTodo: (title: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          title,
          completed: false,
        },
      ],
    })),
  
  removeTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  
  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}));
```

### Use the Store
```typescript
import { useTodoStore } from '@stores/todoStore';

export function TodoApp() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodoStore();
  
  return (
    <div>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => addTodo('New task')}>Add Todo</button>
    </div>
  );
}
```

## 🧭 Routing

### Navigate Programmatically
```typescript
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  
  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };
  
  return (
    <button onClick={handleLoginSuccess}>
      Go to Dashboard
    </button>
  );
}
```

### Get Route Parameters
```typescript
import { useParams } from 'react-router-dom';

export function UserDetail() {
  const { userId } = useParams<{ userId: string }>();
  
  return <p>User ID: {userId}</p>;
}
```

### Get Query Parameters
```typescript
import { useSearchParams } from 'react-router-dom';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  return <p>Search results for: {query}</p>;
}
```

### Create Links
```typescript
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/reports">Reports</Link>
    </nav>
  );
}
```

## 🎁 Material-UI Components

### Button
```typescript
import { Button } from '@mui/material';

export function MyComponent() {
  return (
    <div>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  );
}
```

### TextField
```typescript
import { TextField } from '@mui/material';
import { useState } from 'react';

export function MyForm() {
  const [value, setValue] = useState('');
  
  return (
    <TextField
      label="Enter text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Dialog
```typescript
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useState } from 'react';

export function MyDialog() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>My Dialog</DialogTitle>
        <DialogContent>
          <p>Dialog content here</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
```

## 🔄 Custom Hooks

### Use Local Storage
```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}

// Usage
export function MyComponent() {
  const [count, setCount] = useLocalStorage('count', 0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Use Fetch Data
```typescript
import { useState, useEffect } from 'react';
import apiClient from '@services/base-api';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<T>(url);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

export function UserProfile() {
  const { data, loading, error } = useFetch<User>('/api/users/me');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;
  
  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}
```

## ✅ Summary

These examples cover:
- ✅ Authentication (login, logout, check status)
- ✅ Theme management (toggle, check current)
- ✅ API calls (GET, POST, PUT, DELETE)
- ✅ State management (create stores, use stores)
- ✅ Routing (navigate, params, links)
- ✅ Material-UI components (Button, TextField, Dialog)
- ✅ Custom hooks (localStorage, fetch)

For more examples, check the original components in `src/components/` and `src/sections/`.
