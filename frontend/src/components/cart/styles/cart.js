import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 100px;
  margin: 0px 12rem 0px 12rem;
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 2;

  text-align: left;
  max-width: 135px;
  font-weight: bold;
  color: white;
`;

export const SubTitle = styled.h4`
  font-size: 12px;
  color: white;
  font-weight: bold;
`;

export const Image = styled.img`
  border: 0;
  width: 100%;
  max-width: 100px;
  height: auto;
  padding: 0;
  margin: 0;
  margin-bottom: 18px;
`;

export const Icon = styled.button`
  cursor: pointer;
  background: transparent;
  border: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  img {
    width: 100%;
    display: none;
  }
`;

export const Item = styled.div`
  border: 2px solid #cccc;
  max-height: 135px;
  margin-bottom: 1rem;
  background-color: black;
  padding: 9px;
  display: flex;
  justify-content: space-between;
  min-width: 70vw;
  position: relative;
  .wrapper {
    position: relative;
    border-radius: 50%;
    color: #6b6b6b;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .trash__icon {
      box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.5);
      background-color: black;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const Meta = styled.div`
  display: flex;
`;

export const Entities = styled.div`
  display: flex;
  flex-direction: column;
`;
