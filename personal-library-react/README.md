# Personal Library - React 19

A standalone React 19 application built from the Next.js on-boarding app. This is a SPA (Single Page Application) with Vite as the build tool, React Router for navigation, and Zustand for state management.

## Tech Stack

- **React 19** - Latest React version with Server Components support (not used in SPA context)
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management
- **TypeScript** - Type-safe development
- **Material-UI** - Component library
- **Axios** - HTTP client for API calls

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components for routes
├── stores/          # Zustand stores (auth, ui, etc.)
├── services/        # API services and utilities
├── layouts/         # Layout components
├── sections/        # Section components (copied from Next.js)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
├── App.tsx          # Main App component
├── router.tsx       # React Router configuration
└── main.tsx         # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ (we recommend npm as package manager)
- npm 9+

### Installation

```bash
cd personal-library-react
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will open at `http://localhost:5173` by default.

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Key Migration Notes from Next.js to React

### 1. Routing
- **Next.js**: File-based routing in `app/` directory
- **React Router**: Centralized routing in `src/router.tsx`
- Protected routes are handled via a ProtectedRoute component wrapper

### 2. State Management
- **Next.js with Redux**: Complex Redux store with RTK Query
- **React with Zustand**: Simple, lightweight stores with persistence built-in
  - `authStore.ts` - User authentication state
  - `uiStore.ts` - UI preferences (theme, sidebar, etc.)

### 3. API Calls
- **Next.js**: RTK Query for data fetching
- **React**: Axios with interceptors for:
  - Automatic token injection
  - 401 error handling (auto logout)
  - Base URL configuration

### 4. Server Components
- **Next.js**: Mix of Server and Client Components
- **React SPA**: All components are Client Components (normal React behavior)

### 5. SSR / SEO
- **Next.js**: Built-in SSR and metadata support
- **React SPA**: Use `react-helmet` for document head management (if needed)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

## Common Tasks

### Adding a New Page

1. Create the page component in `src/pages/`
2. Add a route in `src/router.tsx`
3. Wrap in `<ProtectedRoute>` if authentication is required

### Adding a New Store

1. Create a new file in `src/stores/` (e.g., `myStore.ts`)
2. Export it from `src/stores/index.ts`
3. Use it in components with `const state = useMyStore()`

### Making API Calls

```typescript
import apiClient from '@services/base-api';
import { useAuthStore } from '@stores/authStore';

async function fetchData() {
  try {
    const response = await apiClient.get('/endpoint');
    return response.data;
  } catch (error) {
    // Handle error (401 is handled automatically)
  }
}
```

## Deployment

The app can be deployed to any static hosting service:

- **Vercel**: `npm run build` then connect to Vercel
- **Netlify**: `npm run build` then deploy the `dist/` folder
- **GitHub Pages**: Configure for SPA routing

## Known Limitations

- This is a Client-Side Only SPA (no Server-Side Rendering)
- Some Next.js specific features (ISR, Dynamic Routes, etc.) are not applicable

## Next Steps

1. Complete the dashboard sections integration
2. Implement login/authentication page
3. Add remaining page routes from the Next.js version
4. Test API integration with backend
5. Deploy to production

---

For more information about the technologies used:
- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev)
- [Material-UI Components](https://mui.com)
