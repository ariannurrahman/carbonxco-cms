import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from 'layout/DashboardLayout';

import { Projects } from 'pages/dashboard/projects';
import { ProjectForm } from 'pages/dashboard/projects/project-form';

import { NewsPage } from 'pages/dashboard/news';
import { NewsForm } from 'pages/dashboard/news/news-form';

import { FaqPage } from 'pages/dashboard/faq';
import { FaqForm } from 'pages/dashboard/faq/faq-form';

import { Teams } from 'pages/dashboard/teams';
import { TeamsForm } from 'pages/dashboard/teams/teams-form';

import { Opportunity } from 'pages/dashboard/opportunity';
import { OpportunityForm } from 'pages/dashboard/opportunity/opportunity-form';

import { JobsOpp } from 'pages/dashboard/jobs-opp';

import { ContactUs } from 'pages/dashboard/contact-us';
import { ContactUsDetail } from 'pages/dashboard/contact-us/contact-us-detail';

export const DashboardRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='projects' element={<Projects />} />
          <Route path='projects/create' element={<ProjectForm />} />
          <Route path='projects/:id/edit' element={<ProjectForm />} />

          <Route path='news' element={<NewsPage />} />
          <Route path='news/create' element={<NewsForm />} />
          <Route path='news/:id/edit' element={<NewsForm />} />

          <Route path='teams' element={<Teams />} />
          <Route path='teams/create' element={<TeamsForm />} />
          <Route path='teams/:id/edit' element={<TeamsForm />} />

          <Route path='opportunity' element={<Opportunity />} />
          <Route path='opportunity/create' element={<OpportunityForm />} />
          <Route path='opportunity/:id/edit' element={<OpportunityForm />} />

          <Route path='faq' element={<FaqPage />} />
          <Route path='faq/create' element={<FaqForm />} />
          <Route path='faq/:id/edit' element={<FaqForm />} />

          <Route path='contacts' element={<ContactUs />} />
          <Route path='contacts/:id' element={<ContactUsDetail />} />

          <Route path='jobs-opp' element={<JobsOpp />} />

          <Route path='' element={<Navigate to='/dashboard/projects' />} />
          <Route path='*' element={<Navigate to='/dashboard/projects' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
