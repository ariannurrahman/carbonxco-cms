import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from 'layout/DashboardLayout';

import { Projects } from 'pages/dashboard/projects';
import { ProjectForm } from 'pages/dashboard/projects/project-form';

import { News } from 'pages/dashboard/news';

export const DashboardRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='projects' element={<Projects />} />
          <Route path='projects/create' element={<ProjectForm />} />
          <Route path='news' element={<News />} />

          <Route path='' element={<Navigate to='/dashboard/projects' />} />
          <Route path='*' element={<Navigate to='/dashboard/projects' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
