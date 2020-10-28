import React, { useState } from 'react';
import { Cart } from '../components';
import { CartConsumer } from '../context/cart';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { authUserListener } from '../utils';
import { Modal } from '../components';
import { Login } from '../pages/common';
import styled from 'styled-components/macro';
import { addDefaultSrc } from '../utils';
export default function CartContainer() {
	const history = useHistory();
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalOrder, setShowModalOrder] = useState(false);
	const handleOnClickBtnPay = (event) => {
		if (!authUserListener()) {
			return setShowModalLogin(true);
		}
		return setShowModalOrder(true);
	};


	const handelOnOKConfirmOrder = (event, cb) => {
		const userId = authUserListener().user_id;
		cb(userId);
		return history.goBack();
	};
	return (
		<CartConsumer>
			{(value) => (
				<>
					<Cart>
						<Cart.Entities>
							{value.cart.map((item) => (
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
										<div className="trash__icon">
											<FontAwesomeIcon
												onClick={() => value.deleteItem(item._id)}
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
							))}
						</Cart.Entities>
						{value?.cart.length && (
							<Footer>
								<div className="final-payment">
									<h3 className="final-payment__title">Final payment:</h3>
									<h3 className="final-payment__title">
										&#8362;{value.totalPurchaseToPay()}
									</h3>
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
									<Login />
								</Modal>
								<Modal
									title="The order"
									visible={showModalOrder}
									onCancel={() => setShowModalOrder(false)}
									onOk={(event) =>
										handelOnOKConfirmOrder(event, value.addToHistoryPurchase)
									}
								>
									<h3>Click Okay to confirm the order</h3>
								</Modal>
							</Footer>
						)}
					</Cart>
				</>
			)}
		</CartConsumer>
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
	}
`;
