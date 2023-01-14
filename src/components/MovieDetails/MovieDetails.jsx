import { Link, useLocation } from 'react-router-dom';

import css from './MovieDetails.module.css';

const MovieDetails = ({ movieData }) => {
  const location = useLocation();

  const backLink = location?.state?.from ?? '/';

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
          {Array.isArray(genres) && genres.map(genre => genre.name).join(', ')}
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
  );
};
export default MovieDetails;
