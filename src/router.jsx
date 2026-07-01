import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { RouteFallback } from './components/RouteFallback';

const HomePage = lazy(() => import('./pages/HomePage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const JobDetailsPage = lazy(() => import('./pages/JobDetailsPage'));
const PostJobPage = lazy(() => import('./pages/PostJobPage'));
const EditJobPage = lazy(() => import('./pages/EditJobPage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const MyJobsPage = lazy(() => import('./pages/MyJobsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminJobsPage = lazy(() => import('./pages/admin/AdminJobsPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));

const withSuspense = (Element) => (
  <Suspense fallback={<RouteFallback />}>
    <Element />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: withSuspense(HomePage) },
      { path: '/jobs', element: withSuspense(JobsPage) },
      { path: '/jobs/:id', element: withSuspense(JobDetailsPage) },
      { path: '/post-job', element: withSuspense(PostJobPage) },
      { path: '/edit-job/:id', element: withSuspense(EditJobPage) },
      { path: '/bookmarks', element: withSuspense(BookmarksPage) },
      { path: '/my-jobs', element: withSuspense(MyJobsPage) },
      { path: '/signin', element: withSuspense(SignInPage) },
      { path: '/signup', element: withSuspense(SignUpPage) },
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: withSuspense(AdminDashboardPage) },
          { path: '/admin/jobs', element: withSuspense(AdminJobsPage) },
          { path: '/admin/users', element: withSuspense(AdminUsersPage) },
        ],
      },
      { path: '/404', element: withSuspense(NotFoundPage) },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
]);
