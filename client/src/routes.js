import { lazy } from 'react';
import { HERO_ROUTE, NOT_FOUND_ROUTE, LIB_ROUTE } from './utils/constants';

const HeroPage = lazy(() => import('./pages/HeroPage/HeroPage'));
const LibPage = lazy(() => import('./pages/LibPage/LibPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFound'));

export const publicRoutes = [
  {
    path: LIB_ROUTE,
    Component: LibPage,
  },
  {
    path: HERO_ROUTE + '/:id',
    Component: HeroPage,
  },

  {
    path: NOT_FOUND_ROUTE,
    Component: NotFoundPage,
  },
];
