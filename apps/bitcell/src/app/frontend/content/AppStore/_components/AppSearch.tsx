import React, { FC, useContext, useState } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { setSearchQuery } from '../context/AppStoreActions';
import styles from './appstore.module.scss';

const AppSearch: FC = () => {
  const { dispatch } = useContext(AppStoreContext);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(dispatch, query);
  };

  return (
    <div className={styles['app-search']}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for apps..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default AppSearch;