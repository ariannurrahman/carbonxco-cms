import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from 'layout/DashboardLayout';

import { Projects } from 'pages/dashboard/projects';
import { ProjectForm } from 'pages/dashboard/projects/project-form';

import { News } from 'pages/dashboard/news';
import { NewsForm } from 'pages/dashboard/news/news-form';
import { Faq } from 'pages/dashboard/faq';
import { FaqForm } from 'pages/dashboard/faq/faq-form';
import { JobsOpp } from 'pages/dashboard/jobs-opp';

export const DashboardRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='projects' element={<Projects />} />
          <Route path='projects/create' element={<ProjectForm />} />

          <Route path='news' element={<News />} />
          <Route path='news/create' element={<NewsForm />} />

          <Route path='faq' element={<Faq />} />
          <Route path='faq/create' element={<FaqForm />} />

          <Route path='jobs-opp' element={<JobsOpp />} />

          <Route path='' element={<Navigate to='/dashboard/projects' />} />
          <Route path='*' element={<Navigate to='/dashboard/projects' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
