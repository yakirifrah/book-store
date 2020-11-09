import styled from 'styled-components/macro';

export const SearchIcon = styled.span`
  background-color: transparent;
  border: 0;
  padding: 1em;
  img {
    filter: brightness(0) invert(1);
    width: 16px;
  }
`;
export const SearchInput = styled.input`
  background-color: #44444459;
  color: white;
  width: 25vw;
  padding: 2em;
  border: 1px solid white;
  transition: width 0.5s;
  height: 30px;
  font-size: 14px;
  margin-left: 10px;
`;

export const SearchComp = styled.div`
  margin-top: 3%;
  border: 1px solid white;
  border-radius: 3%;
`;
