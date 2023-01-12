import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import css from './Cast.module.css';

import { getCast } from 'components/services/api';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { movieId } = useParams('');

  useEffect(() => {
    if (!movieId) return;
    const fetchMovies = async () => {
      setError('');

      try {
        const data = await getCast(movieId);
        setCast(data);
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
      {isLoading && <PuffLoader color="#36d7b7" size={200} />}
      {cast?.length > 0 && (
        <ul className={css.actors}>
          {cast.map(({ original_name, character, profile_path, id }) => {
            return (
              <li key={id} className={css.actor_card}>
                <div className={css.actor_photo}>
                  <img
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : './assets/images/no-image-icon-23505.png'
                    }
                    alt={original_name}
                  />
                </div>
                <div className={css.actor_text}>
                  <p>{character}</p>
                  <p>{original_name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Cast;
