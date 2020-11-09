import {
  Container,
  SearchIcon,
  SearchInput,
  Search,
  IconLink,
  NumOfItems,
  Icon,
} from './styles/header';

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}
Header.Search = function HeaderSearch({ searchTerm, setSearchTerm, ...restProps }) {
  return (
    <Search {...restProps}>
      <SearchIcon>
        <img src="/images/icons/search.png" alt="Search" />
      </SearchIcon>
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Search Books"
      />
    </Search>
  );
};

Header.IconLink = function HeaderIconLink({ children, ...restProps }) {
  return <IconLink {...restProps}>{children}</IconLink>;
};
Header.Icon = function HeaderIcon({ children, ...restProps }) {
  return <Icon {...restProps}>{children}</Icon>;
};

Header.NumOfItems = function HeaderNumOfItems({ children, ...restProps }) {
  return <NumOfItems {...restProps}>{children}</NumOfItems>;
};
