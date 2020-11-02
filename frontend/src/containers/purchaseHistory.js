import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Cart } from '../components';
import { StoreContext } from '../context/store';
import { addDefaultSrc, authUserListener } from '../utils';
import styled from 'styled-components/macro';

export default function PurchaseHistoryContainer() {
  const [userId] = useState(authUserListener()?.user_id || '');
  const { getHistoryPurchasesById } = useContext(StoreContext);
  const renderLogin = () => {
    return (
      <Wrapper>
        <Title>you need to login to see the last purchases</Title>
        <Link to={'/login'}>
          <Button type="primary">Login</Button>
        </Link>
      </Wrapper>
    );
  };
  return (
    <>
      {!userId.length ? (
        renderLogin()
      ) : (
        <Cart>
          <Cart.Entities>
            {getHistoryPurchasesById(userId)?.map((item) => {
              const { _id, title, imageURL, price } = item;
              return (
                <Cart.Item key={_id}>
                  <Cart.Meta>
                    <Cart.Image alt={title} src={imageURL} onError={(e) => addDefaultSrc(e)} />
                    <div
                      style={{
                        marginLeft: '15px',
                        textAlign: 'left',
                        color: 'white',
                      }}
                    >
                      <Cart.Title>{title}</Cart.Title>
                      <h3
                        style={{
                          color: 'white',
                        }}
                      >
                        {price}&#8362;
                      </h3>
                    </div>
                  </Cart.Meta>
                  <div className="wrapper">
                    <h3
                      style={{
                        color: 'white',
                        display: 'list-item',
                        listStyle: 'none',
                      }}
                    >
                      Quantity:{item?.quantity}{' '}
                    </h3>
                  </div>
                </Cart.Item>
              );
            })}
          </Cart.Entities>
        </Cart>
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 9em;
  left: 37em;
  max-width: 400px;
`;

const Title = styled.h1`
  color: white;
  font-family: 'Courier New', Courier, monospace;
`;
