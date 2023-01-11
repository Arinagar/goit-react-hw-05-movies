import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

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
      <h1>MOVIE DETAILS</h1>
      <Link to={backLink}>Go back</Link>
      {isLoading && <PuffLoader color="#36d7b7" size={200} />}
      <div>
        <img src={poster_path} alt={original_title} className="" />
        <div className="">
          <h3 className="">{original_title}</h3>
          <p className="">
            <b>Tagline: </b>
            {tagline}
          </p>
          <p className="">
            <b>Budget: </b>
            {budget}$
          </p>
          <p className="">
            <b>Genres: </b>
            {/* {genres.map(genre => genre.name).join(', ')} */}
          </p>
          <p className="">
            <b>Production companies: </b>
            {/* {production_companies.map(company => company.name).join(', ')} */}
          </p>
          <p className="">
            <b>Release date : </b>
            {release_date}
          </p>
          <p className="">
            <b>Description: </b>
            {overview}
          </p>
          <Link to="cast" state={{ from: backLink }} className="">
            Cast
          </Link>
          <Link to="reviews" state={{ from: backLink }} className="">
            Reviews
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MovieCard;
