import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import css from './MovieCard.module.css';

import { getMoviesById } from 'components/services/api';

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

  const {
    original_title,
    poster_path,
    tagline,
    budget,
    genres,
    production_companies,
    release_date,
    overview,
  } = movieData;

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
      <div className={css.filmWrap}>
        <img
          src={'https://image.tmdb.org/t/p/w500' + poster_path}
          alt={original_title}
          className={css.filmImg}
        />
        <div className={css.filmInfo}>
          <h3 className={css.title}>{original_title}</h3>
          <p className={css.text}>
            <b>Tagline: </b>
            {tagline}
          </p>
          <p className={css.text}>
            <b>Budget: </b>
            {budget}$
          </p>
          <p className={css.text}>
            <b>Genres: </b>
            {Array.isArray(genres) &&
              genres.map(genre => genre.name).join(', ')}
          </p>
          <p className={css.text}>
            <b>Production companies: </b>
            {Array.isArray(production_companies) &&
              production_companies.map(company => company.name).join(', ')}
          </p>
          <p className={css.text}>
            <b>Release date : </b>
            {release_date}
          </p>
          <p className={css.text}>
            <b>Description: </b>
            {overview}
          </p>
          <Link to="cast" state={{ from: backLink }} className={css.link}>
            Cast
          </Link>
          <Link to="reviews" state={{ from: backLink }} className={css.link}>
            Reviews
          </Link>
        </div>
      </div>
      <div>
        <Suspense fallback={<PuffLoader color="#36d7b7" size={200} />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieCard;
