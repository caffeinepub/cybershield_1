import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import NetworkActivity from './pages/NetworkActivity';
import SecurityScan from './pages/SecurityScan';
import SecurityPolicies from './pages/SecurityPolicies';
import Analytics from './pages/Analytics';
import IncidentResponse from './pages/IncidentResponse';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Outlet />
      <Toaster />
    </ThemeProvider>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const protectedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: '/',
  component: Dashboard,
});

const networkRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: '/network',
  component: NetworkActivity,
});

const scanRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: '/scan',
  component: SecurityScan,
});

const policiesRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: '/policies',
  component: SecurityPolicies,
});

const analyticsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: '/analytics',
  component: Analytics,
});

const incidentsRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: '/incidents',
  component: IncidentResponse,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedLayoutRoute.addChildren([
    dashboardRoute,
    networkRoute,
    scanRoute,
    policiesRoute,
    analyticsRoute,
    incidentsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
