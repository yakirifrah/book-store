import React from 'react';
import { Cart } from '../components';
import { CartConsumer } from '../context/cart';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';
import { Button } from 'antd';
export function CartContainer() {
	const addDefaultSrc = (event) => {
		event.target.src = '/images/books/default-placeholder-image-300x300.png';
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
											onError={addDefaultSrc}
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
								>
									Completion of order and payment
								</Button>
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
