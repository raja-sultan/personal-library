# 🚀 Quick Start Guide

## In 3 Steps

### Step 1: Install
```bash
cd personal-library-react
npm install --legacy-peer-deps
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Open Browser
```
http://localhost:5173
```

---

## Common Commands

```bash
npm run dev          # Development server with HMR
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

---

## Essential Imports

```typescript
// State Management
import { useAuthStore } from '@stores/authStore';
import { useUIStore } from '@stores/uiStore';

// API Calls
import apiClient from '@services/base-api';

// Routing
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Material-UI
import { Button, TextField, Dialog } from '@mui/material';
```

---

## Common Code Snippets

### Check if User is Logged In
```typescript
import { useAuthStore } from '@stores/authStore';

function Component() {
  const { isAuthenticated } = useAuthStore();
  
  return isAuthenticated ? <Dashboard /> : <Login />;
}
```

### Make API Call
```typescript
import apiClient from '@services/base-api';

async function fetchData() {
  const response = await apiClient.get('/api/endpoint');
  return response.data;
}
```

### Toggle Theme
```typescript
import { useUIStore } from '@stores/uiStore';

function ThemeButton() {
  const { theme, toggleTheme } = useUIStore();
  
  return <button onClick={toggleTheme}>Toggle</button>;
}
```

### Navigate to Page
```typescript
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  return <button onClick={() => navigate('/dashboard')}>Go</button>;
}
```

---

## Project Structure Quick Reference

```
src/
├── App.tsx              ← Main app component
├── main.tsx             ← React entry point
├── router.tsx           ← All routes defined here
├── pages/               ← Page components
├── components/          ← Reusable components
├── stores/              ← Zustand stores
│   ├── authStore.ts
│   └── uiStore.ts
├── services/            ← API client
│   └── base-api.ts
├── layouts/             ← Layout wrappers
├── sections/            ← Section components
├── types/               ← TypeScript definitions
└── utils/               ← Utility functions
```

---

## Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:3000/api
```

---

## Routes

| Path | Purpose | Protected |
|------|---------|-----------|
| `/` | Dashboard | ✅ Yes |
| `/login` | Login | ❌ No |
| `/dashboard` | Dashboard | ✅ Yes |
| `/reports` | Reports | ✅ Yes |
| `/new-hiring` | Hiring | ✅ Yes |
| `/my-profile` | Profile | ✅ Yes |
| `/settings` | Settings | ✅ Yes |

---

## Key Features

✅ **React 19** - Latest version  
✅ **Vite** - Fast build system  
✅ **React Router v6** - Client routing  
✅ **Zustand** - State management  
✅ **Axios** - HTTP client  
✅ **Material-UI** - Components  
✅ **TypeScript** - Type safety  
✅ **HMR** - Hot reload  

---

## Common Issues

**Issue**: Build fails  
**Fix**: `npm install --legacy-peer-deps`

**Issue**: Token not sent  
**Fix**: Use `apiClient` from `@services/base-api`

**Issue**: Can't find module  
**Fix**: Check `tsconfig.json` path aliases

---

## Useful Links

- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Docs](https://vitejs.dev)
- [Material-UI Docs](https://mui.com)

---

## That's It!

You're ready to develop. See `README.md` for more details.

**Happy Coding!** 🎉
