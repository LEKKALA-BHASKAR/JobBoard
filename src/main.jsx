import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './router';
import { ThemeProvider } from './context/ThemeContext';
import { JobsProvider } from './context/JobsContext';
import { ToastProvider } from './context/ToastContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <JobsProvider>
            <RouterProvider router={router} />
          </JobsProvider>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
