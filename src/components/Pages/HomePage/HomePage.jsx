import { React, useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { PuffLoader } from 'react-spinners';

import { FilmList } from 'components/FilmList/FilmList';
import { getInitialMovies } from 'components/services/api';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setError('');

      try {
        const data = await getInitialMovies();
        setMovies(data);
      } catch (error) {
        setError('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <h1>HOME PAGE</h1>
      <FilmList movies={movies} />

      {isLoading && <PuffLoader color="#36d7b7" size={200} />}
    </>
  );
};
