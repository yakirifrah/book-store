import styled from 'styled-components/macro';

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #1e272e;
  transform: ${({ openBurger }) => (openBurger ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  right: 0;
  position: absolute;
  top: 0;
  transition: transform 2s ease-in-out;
  display: ${({ openBurger }) => (openBurger ? '' : 'none')};
  a {
    font-size: 25px;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #cccc;
    text-decoration: none;
    transition: color 0.3s linear;
    display: flex;
    margin: 0;
    &:hover {
      svg {
        color: red;
      }
      .icon_title {
        color: red;
      }
    }

    &:first-child {
      margin-top: 3.4em;
      margin-bottom: 2em;
    }
    @media (max-width: 660px) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      color: #ccc4;
    }
    .icon_title {
      color: white;
      margin-left: 22px;
    }
  }
`;