import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'bootstrap';

import './core/templates/js/app.js';
import './core/styles/app.scss';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';

import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';

import router from './core/router';

// library.add(fas, far);
registerLocale('es', es);
const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
