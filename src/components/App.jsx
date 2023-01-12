import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import css from './Global/Global.module.css';

const Layout = lazy(() => import('./Layout/Layout'));
const HomePage = lazy(() => import('./Pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./Pages/MoviesPage/MoviesPage'));
const NotFound = lazy(() => import('./NotFound/NotFound'));
const MovieCard = lazy(() => import('./Pages/MovieCard/MovieCard'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <section className={css.section}>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:movieId" element={<MovieCard />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </section>
  );
};
