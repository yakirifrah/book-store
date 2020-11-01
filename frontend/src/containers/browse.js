import React, { useEffect, useState, useRef, useContext } from 'react';
import { faShoppingCart, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Card, Header, Modal, Loading } from '../components';
import { EditBook } from '../pages/adminArea';
import { authAdminListener, signOutAdmin } from '../utils';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../context/store';
import * as ROUTES from '../constants/routes';
import { addDefaultSrc } from '../utils';
import API from '../api';
export default function BrowseContainer() {
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
  const { addToCart, sumQuantity } = useContext(StoreContext);
  const location = useLocation();

  if (location.pathname === '/') {
    signOutAdmin();
  }

  const user = authAdminListener();
  const isAdmin = user?.token && user?.role === 'admin' && user?.login === true;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.getBooks();
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
          <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link to={`/admin/add-book`}>
            <button className="add_book">To add a new book click here! </button>
          </Link>
        </Header>
      </div>

      <Modal title="delete book" visible={visible} onOk={handleOk} onCancel={handleCancel}>
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
          {books.map((item) => {
            const { _id, title, imageURL } = item;
            return (
              <Card.Item key={_id} item={item}>
                <Card.Meta>
                  <Card.Image
                    alt={title}
                    src={imageURL}
                    onError={(e) => addDefaultSrc(e)}
                    onClick={() => handleEditItem(item)}
                    editBook
                  />
                  {commonArea(item)}
                </Card.Meta>
                <Card.Icon onClick={() => handleOnClick(_id)}>
                  <img src="/images/icons/delete.png" alt="Delete" />
                </Card.Icon>
              </Card.Item>
            );
          })}
        </Card.Entities>
      </Card>
    </>
  );
  const commonArea = (item) => {
    const { title, price, description, publisher, author } = item;
    return (
      <>
        <Card.Title>{title}</Card.Title>
        <Card.SubTitle>By{author?.fullName}</Card.SubTitle>
        <div className="book__details">
          {' '}
          <hr />
          <Card.SubTitle>{description}</Card.SubTitle>
          <h5>Publisher: {publisher?.publisherName}</h5>
          <Card.Title>{price}&#8362;</Card.Title>
        </div>
      </>
    );
  };

  const userArea = () => (
    <>
      <div
        style={{
          zIndex: '115',
          boxShadow: '0 5px 20px rgba(0,0,0,0.25)',
        }}
      >
        <Header>
          <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="wrapper__icon__user">
            <Header.Icon to={ROUTES.MY_ORDER_HISTORY}>
              <FontAwesomeIcon icon={faHistory} color="white" size="lg" title="order history" />
            </Header.Icon>
            <Header.Icon to={ROUTES.MY_CART}>
              <FontAwesomeIcon icon={faShoppingCart} color="white" size="lg" title="shooing cart" />
              {sumQuantity() > 0 && <Header.NumOfItems>{sumQuantity()}</Header.NumOfItems>}
            </Header.Icon>
          </div>
        </Header>
      </div>
      <Card>
        <Card.Entities>
          {books.map((item) => {
            const { _id, imageURL, title } = item;
            return (
              <Card.Item key={item._id} item={item}>
                <Card.Meta>
                  <Card.Image
                    alt={title}
                    src={imageURL}
                    onError={(e) => addDefaultSrc(e)}
                    onClick={() => handleEditItem(item)}
                  />
                  {commonArea(item)}
                </Card.Meta>
                <Card.Icon onClick={() => handleOnClick(_id)}>
                  <img
                    src="/images/icons/add_to_cart.png"
                    alt="add_to_cart"
                    style={{ fontSize: '16px' }}
                    onClick={() => addToCart(item)}
                  />
                </Card.Icon>
              </Card.Item>
            );
          })}
        </Card.Entities>
      </Card>
    </>
  );

  const handleOnClick = (id) => {
    setVisible(true);
    itemRef.current = id;
  };

  const handleOk = async (event) => {
    try {
      const { token } = JSON.parse(sessionStorage.getItem('login'));
      await API.deleteBook(itemRef.current, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
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
    console.log({ newItem });
    try {
      await API.updateBook(
        _id,
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
