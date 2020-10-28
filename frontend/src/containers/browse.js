import React, { useEffect, useState, useRef } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Fuse from 'fuse.js';
import { Card, Header, Modal, Loading } from '../components';
import { EditBook } from '../pages/adminArea';
import { authAdminListener, signOutAdmin } from '../utils';
import { useLocation } from 'react-router-dom';
import { CartConsumer } from '../context/cart';
import * as ROUTES from '../constants/routes';
export function BrowseContainer() {
	// state
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [fetchAllBooks, setFetchAllBooks] = useState('');
	const [visible, setVisible] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);
	const [editItem, setEditItem] = useState(false);
	const [modalEditBook, setModalEditBook] = useState(false);
	const itemRef = useRef('');
	const location = useLocation();
	if (location.pathname === '/') {
		signOutAdmin();
	}

	const user = authAdminListener();
	const isAdmin = user?.token && user?.role === 'admin' && user?.login === true;

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get('http://localhost:3001/api/v1/books');
				const {
					data: { books },
				} = res.data;
				setBooks(books);
				setFetchAllBooks(books);
				setLoading(false);
			} catch (error) {
				setError(error.message);
			}
		}
		fetchData();
	}, [deleteItem, editItem]);

	useEffect(() => {
		const fuse = new Fuse(books, { keys: ['title'] });
		const results = fuse.search(searchTerm).map(({ item }) => item);
		if (books.length > 0 && searchTerm.length > 3 && results.length > 0) {
			setBooks(results);
		} else {
			setBooks(fetchAllBooks);
		}
	}, [searchTerm]);

	const adminArea = () => (
		<>
			<div style={{ zIndex: '115', boxShadow: '0 5px 20px rgba(0,0,0,0.25)' }}>
				<Header>
					<Header.Search
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
					<Link to={`/admin/add-book`}>
						<button className="add_book">To add a new book click here! </button>
					</Link>
				</Header>
			</div>

			<Modal
				title="delete book"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				Remove this book!
			</Modal>
			<EditBook
				modalEditBook={modalEditBook}
				handleCancel={handleCancel}
				item={itemRef.current}
				handleUpdateItem={handleUpdateItem}
			/>
			<Card>
				<Card.Entities>
					{books.map((item) => (
						<Card.Item key={item._id} item={item}>
							<Card.Meta>
								<Card.Image
									alt="book"
									src={`/images/books/${item.title}.jpg`}
									onError={addDefaultSrc}
									onClick={() => handleEditItem(item)}
									editBook
								/>
								{commonArea(item)}
							</Card.Meta>
							<Card.Icon onClick={() => handleOnClick(item._id)}>
								<img src="/images/icons/delete.png" alt="Delete" />
							</Card.Icon>
						</Card.Item>
					))}
				</Card.Entities>
			</Card>
		</>
	);
	const commonArea = (item) => (
		<>
			<Card.Title>{item.title}</Card.Title>
			<Card.Title>{item.price}&#8362;</Card.Title>
			<div class="book__details">
				{' '}
				<h4>Summery:</h4>
				<hr />
				<Card.SubTitle>{item.description}</Card.SubTitle>
				<h5>Publisher: {item.publisher}</h5>
				<h5>Author: {item.author}</h5>
			</div>
		</>
	);

	const userArea = () => (
		<CartConsumer>
			{(value) => (
				<>
					<div
						style={{
							zIndex: '115',
							boxShadow: '0 5px 20px rgba(0,0,0,0.25)',
						}}
					>
						<Header>
							<Header.Search
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
							<Header.Icon to={ROUTES.MY_CART}>
								<FontAwesomeIcon
									icon={faShoppingCart}
									color="white"
									size="lg"
								/>
								{value.sumQuantity() > 0 && (
									<Header.NumOfItems>{value.sumQuantity()}</Header.NumOfItems>
								)}
							</Header.Icon>
						</Header>
					</div>
					<Card>
						<Card.Entities>
							{books.map((item) => (
								<Card.Item key={item._id} item={item}>
									<Card.Meta>
										<Card.Image
											alt="book"
											src={`/images/books/${item.title}.jpg`}
											onError={addDefaultSrc}
											onClick={() => handleEditItem(item)}
										/>
										{commonArea(item)}
									</Card.Meta>
									<Card.Icon onClick={() => handleOnClick(item._id)}>
										<img
											src="/images/icons/add_to_cart.png"
											alt="add_to_cart"
											style={{ fontSize: '16px' }}
											onClick={() => value.addToCart(item)}
										/>
									</Card.Icon>
								</Card.Item>
							))}
						</Card.Entities>
					</Card>
				</>
			)}
		</CartConsumer>
	);

	const addDefaultSrc = (event) => {
		event.target.src = '/images/books/default-placeholder-image-300x300.png';
	};

	const handleOnClick = (id) => {
		setVisible(true);
		itemRef.current = id;
	};

	const handleOk = async (event) => {
		try {
			const { token } = JSON.parse(sessionStorage.getItem('login'));
			await axios.delete(
				`http://localhost:3001/api/v1/books/${itemRef.current}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			setDeleteItem(true);
		} catch (error) {
			setError(error.message);
		}

		setVisible(false);
	};

	const handleCancel = (event) => {
		setVisible(false);
		setModalEditBook(false);
	};

	const handleEditItem = (item) => {
		itemRef.current = item;
		setModalEditBook(true);
	};

	const handleUpdateItem = async (e, newItem) => {
		const { token } = JSON.parse(sessionStorage.getItem('login'));
		const { author, description, price, publisher, title } = newItem;
		const { _id } = newItem;
		try {
			await axios.patch(
				`http://localhost:3001/api/v1/books/${_id}`,
				{
					author,
					description,
					price,
					publisher,
					title,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				},
			);
			setModalEditBook(false);
			setEditItem((prevState) => !prevState);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<Loading.ReleaseBody />
					{isAdmin ? adminArea() : userArea()}
				</>
			)}
		</>
	);
}
