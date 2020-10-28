import React, { useState } from 'react';
import { CartConsumer } from '../context/cart';
import { Cart } from '../components';
import { addDefaultSrc, authUserListener } from '../utils';
import styled from 'styled-components/macro';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
export default function PurchaseHistoryContainer() {
  const [userId] = useState(authUserListener()?.user_id || '');
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
        <CartConsumer>
          {(value) => (
            <Cart>
              <Cart.Entities>
                {value.getHistoryPurchasesById(userId)?.map((item) => (
                  <Cart.Item key={item._id}>
                    <Cart.Meta>
                      <Cart.Image
                        src={`/images/books/${item.title}.jpg`}
                        onError={(e) => addDefaultSrc(e)}
                      />
                      <div
                        style={{
                          marginLeft: '15px',
                          textAlign: 'left',
                          color: 'white',
                        }}
                      >
                        <Cart.Title>{item.title}</Cart.Title>
                        <h3
                          style={{
                            color: 'white',
                          }}
                        >
                          {item.price}&#8362;
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
                ))}
              </Cart.Entities>
            </Cart>
          )}
        </CartConsumer>
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 9em;
  left: 43em;
  max-width: 400px;
`;

const Title = styled.h1`
  color: white;
  font-family: 'Courier New', Courier, monospace;
`;
