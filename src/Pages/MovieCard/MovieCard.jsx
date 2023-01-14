import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import css from './MovieCard.module.css';

import { getMoviesById } from 'components/services/api';
import MovieDetails from 'components/MovieDetails/MovieDetails';

const MovieCard = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { movieId } = useParams('');
  const location = useLocation();

  const backLink = location?.state?.from ?? '/';

  useEffect(() => {
    if (!movieId) return;
    const fetchMovies = async () => {
      setError('');

      try {
        const data = await getMoviesById(movieId);
        setMovieData(data);
      } catch (error) {
        setError('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <h1
        style={{
          margin: '0',
          textAlign: 'center',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        MOVIE DETAILS
      </h1>
      <Link to={backLink} className={css.backLink}>
        Go back
      </Link>
      {isLoading && <PuffLoader color="#36d7b7" size={200} />}
      {movieData && <MovieDetails movieData={movieData} />}
      <div>
        <Suspense fallback={<PuffLoader color="#36d7b7" size={200} />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieCard;
