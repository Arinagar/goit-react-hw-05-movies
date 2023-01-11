import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const FilmList = ({ movies }) => {
  const location = useLocation();
  return (
    movies?.length > 0 && (
      <ul>
        {movies.map(({ original_title, id }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    )
  );
};
