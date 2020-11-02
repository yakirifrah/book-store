import styled from 'styled-components/macro';
import { css } from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  ${(props) =>
    props.addBook &&
    css`
      margin-top: 2em;
    `}
  ${(props) =>
    props.login || props.signUp ?
    css`
      position: absolute;
      top: 10em;
      right: 35em;
      `
    :
    ''
    }
  max-width: 450px;
  padding: 60px 68px 40px;
  margin-bottom: 100px;
  ${(props) =>
    props.modalLogin &&
    css`
      position: inherit;
      margin-bottom: 0;
    `}
`;

export const Error = styled.div`
  background: #e87c03;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 0 16px;
  color: white;
  padding: 15px 20px;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`;

export const Label = styled.label`
  display: grid;
  grid-template-columns: 1fr 3fr;
  ${(props) =>
    props.addBook &&
    css`
      display: grid;
      grid-template-columns: none;
    `}
  h3 {
    color: #fff;
    font-size: 16px;
  }
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 28px;
`;

export const Text = styled.p`
  color: #737373;
  font-size: 16px;
  font-weight: 500;
`;

export const Input = styled.input`
  background: #333;

  border-radius: 4px;
  border: 0;
  color: #fff;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
  ${(props) =>
    props.editForm &&
    css`
      margin-left: 17px;
      line-height: 31px;
      height: 31px;
      width: 100%;
    `}

  &:last-of-type {
    margin-bottom: 30px;
  }
`;

export const Submit = styled.button`
  background: #e50914;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px;
  ${(props) =>
    props.editBook &&
    css`
      margin: 0;
      margin-top: 7px;
    `}
  padding: 16px;
  border: 0;
  color: white;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;

export const Link = styled(ReachRouterLink)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const TextArea = styled.textarea`
  background: #333;
  border-radius: 4px;
  border: 0;
  color: #fff;
  padding: 5px 20px;
  margin-bottom: 20px;
  min-height: 115px;
  ${(props) =>
    props.editForm &&
    css`
      margin-left: 17px;
      line-height: 31px;
      width: 100%;
    `}
`;
