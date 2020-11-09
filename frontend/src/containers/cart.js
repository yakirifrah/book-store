import  { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { authUserListener } from '../utils';
import { Modal, Cart } from '../components';
import { Login } from '../pages/common';
import { BookContext } from '../store/contexts';
import { addDefaultSrc } from '../utils';
import styled from 'styled-components/macro';

export default function CartContainer() {
  const history = useHistory();
  const { cart, deleteItem, totalPurchaseToPay, addToHistoryPurchase } = useContext(BookContext);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalOrder, setShowModalOrder] = useState(false);
  const handleOnClickBtnPay = (event) => {
    if (!authUserListener()) {
      return setShowModalLogin(true);
    }
    return setShowModalOrder(true);
  };

  const handleOnOKConfirmOrder = (event, cb) => {
    const userId = authUserListener().user_id;
    cb(userId);
    return history.goBack();
  };
  return (
    <>
      <Cart>
        <Cart.Entities>
          {Object.values(cart).map((item) => {
            const { _id, imageURL, title, price } = item;
            return (
              <Cart.Item key={_id}>
                <Cart.Meta>
                  <Cart.Image alt={{ title }} src={imageURL} onError={(e) => addDefaultSrc(e)} />
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
                  <div className="trash__icon">
                    <FontAwesomeIcon
                      onClick={() => deleteItem(item._id)}
                      icon={faTrashAlt}
                      color="white"
                      size="lg"
                    />
                  </div>
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
        {Object.keys(cart).length && (
          <Footer>
            <div className="final-payment">
              <h3 className="final-payment__title">Final payment:</h3>
              <h3 className="final-payment__title">&#8362;{totalPurchaseToPay()}</h3>
            </div>
            <hr />
            <Button
              type="primary"
              size="large"
              className="complete_order_payment"
              onClick={handleOnClickBtnPay}
            >
              Completion of order and payment
            </Button>
            <Modal
              title="login"
              visible={showModalLogin}
              onCancel={() => setShowModalLogin(false)}
              bodyStyle={{
                backgroundColor: '#333333',
                height: 'fit-content',
              }}
              cancelButtonProps={{ style: { display: 'none' } }}
              okButtonProps={{ style: { display: 'none' } }}
              login
            >
              <Login modalLogin={true} setShowModalLogin={setShowModalLogin} />
            </Modal>
            <Modal
              title="The order"
              visible={showModalOrder}
              onCancel={() => setShowModalOrder(false)}
              onOk={(event) => handleOnOKConfirmOrder(event, addToHistoryPurchase)}
            >
              <h3>Click Okay to confirm the order</h3>
            </Modal>
          </Footer>
        )}
      </Cart>
    </>
  );
}

const Footer = styled.div`
  text-align: center;
  margin-top: 3em;
  .final-payment {
    display: flex;
    justify-content: space-between;
    &__title {
      color: white;
    }
  }
  .complete_order_payment {
    border-radius: 1em;
    margin-top: 3em;
    margin-bottom: 3em;
  }
`;
