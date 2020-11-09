import { PurchaseHistoryContainer } from '../../containers';
import { BookContextProvider } from '../../store/contexts';
import styled from 'styled-components/macro';

export default function PurchaseHistory() {
  return (
    <Wrapper>
      <NavBar>
        <h1 style={{ color: 'white' }}>My history order</h1>
      </NavBar>
      <BookContextProvider>
        <PurchaseHistoryContainer />
      </BookContextProvider>
    </Wrapper>
  );
}

const NavBar = styled.div`
  position: absolute;
  top: 30px;
  right: 25%;
  left: 25%;
  text-align: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
`;
