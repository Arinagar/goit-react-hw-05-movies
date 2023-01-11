import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { getReviews } from 'components/services/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { movieId } = useParams('');

  useEffect(() => {
    if (!movieId) return;
    const fetchMovies = async () => {
      setError('');

      try {
        const data = await getReviews(movieId);
        setReviews(data);
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
      {reviews?.length > 0 && (
        <ul>
          {reviews.map(({ author, content, created_at, id }) => {
            return (
              <li key={id}>
                <p>{author}</p>
                <p>{content}</p>
                {created_at}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Reviews;
