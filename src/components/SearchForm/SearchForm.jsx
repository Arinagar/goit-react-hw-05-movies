import { useSearchParams } from 'react-router-dom';

import { ImSearch } from 'react-icons/im';

const SearchForm = () => {
  const [, setSearchParams] = useSearchParams();

  const onSearchSubmit = event => {
    event.preventDefault();
    setSearchParams({ query: event.currentTarget.movieSearch.value });
  };
  return (
    <form onSubmit={onSearchSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="movieSearch"
      />
      <button type="submit">
        <ImSearch />
      </button>
    </form>
  );
};
export default SearchForm;
