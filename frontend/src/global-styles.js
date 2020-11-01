import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #333333;
  color: #333333;
  font-size: 16px;
  width: 100%;
  height: 100%;
     .ant-modal-wrap{
      overflow: inherit;
      .ant-modal{
        top:2em;
      }
    }
  #root{
    width: 100%;
    height: 100%;
 
  }
}`;
