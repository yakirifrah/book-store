import React from 'react';
import { SearchComp, SearchIcon, SearchInput } from './styles/search';

export default function search({ searchTerm, setSearchTerm, ...restProps }) {
  return (
    <SearchComp {...restProps}>
      <SearchIcon>
        <img src="/images/icons/search.png" alt="Search" />
      </SearchIcon>
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Search Books"
      />
    </SearchComp>
  );
}
