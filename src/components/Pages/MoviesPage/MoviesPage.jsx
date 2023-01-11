import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { getQueryMovies } from 'components/services/api';
import { FilmList } from 'components/FilmList/FilmList';
import SearchForm from 'components/SearchForm/SearchForm';

export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (!searchQuery) return;
    const fetchMovies = async () => {
      setError('');
      setIsLoading(true);
      try {
        const data = await getQueryMovies(searchQuery);
        setMovies(data);
      } catch (error) {
        setError('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <header>
        <h1>SEARCH MOVIES PAGE</h1>
        <SearchForm />
      </header>
      {isLoading && <PuffLoader color="#36d7b7" size={200} />}
      {movies.length > 0 && <FilmList movies={movies} />}
    </>
  );
};
