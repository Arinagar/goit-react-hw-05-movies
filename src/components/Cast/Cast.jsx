import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

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
        <ul>
          {cast.map(({ original_name, character, profile_path, id }) => {
            return (
              <li key={id}>
                <div>
                  <img src={profile_path} alt={original_name} />
                </div>
                <p>{character}</p>
                <p>{original_name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Cast;
