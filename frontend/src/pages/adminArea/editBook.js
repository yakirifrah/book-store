import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form } from '../../components';

export default function EditBook({ children, ...restProps }) {
  const { modalEditBook, handleCancel, item, handleUpdateItem, error } = restProps;
  const myItemFromProp = item;
  const changeInput = useRef(true);
  const [myItem, setMyItem] = useState(myItemFromProp);
  const { title, description, author, price, publisher, imageURL } = myItem;
  const isInvalid =
    title === '' ||
    description === '' ||
    author?.fullName === '' ||
    price === '' ||
    publisher?.publisherName === '';
  useEffect(() => {
    setMyItem(item);
  }, [item]);

  return (
    <Modal
      title="Edit book"
      visible={modalEditBook}
      onCancel={handleCancel}
      footer={null}
      editModal
    >
      <Form id="editBook">
        <Form.Title>Edit book</Form.Title>
        <Form.Base>
          <Form.Label>
            <h3>Title:</h3>
            <Form.Input
              placeholder="title"
              value={title}
              onChange={({ target }) => {
                changeInput.current = false;
                setMyItem((prevState) => ({ ...prevState, title: target.value }));
              }}
              editForm
            />
          </Form.Label>
          <Form.Label>
            <h3>Author:</h3>
            <Form.Input
              placeholder="author"
              value={author?.fullName}
              onChange={({ target }) => {
                changeInput.current = false;
                let newAuthor = {
                  fullName: target.value,
                };
                setMyItem((prevState) => ({ ...prevState, newAuthor }));
              }}
              editForm
            />
          </Form.Label>
          <Form.Label>
            <h3>Publisher:</h3>
            <Form.Input
              placeholder="publisher"
              value={publisher?.publisherName}
              onChange={({ target }) => {
                changeInput.current = false;
                let newPublisher = {
                  publisherName: target.value,
                };
                setMyItem((prevState) => ({ ...prevState, newPublisher }));
              }}
              editForm
            />
          </Form.Label>
          <Form.Label>
            <h3>imageURL:</h3>
            <Form.Input
              placeholder="imageURL"
              value={imageURL}
              onChange={({ target }) => {
                changeInput.current = false;
                setMyItem((prevState) => ({ ...prevState, imageURL: target.imageURL }));
              }}
              editForm
            />
          </Form.Label>
          <Form.Label>
            <h3>Price:</h3>
            <Form.Input
              placeholder="price"
              value={price}
              type="number"
              onChange={({ target }) => {
                changeInput.current = false;
                setMyItem((prevState) => ({ ...prevState, price: target.value }));
              }}
              editForm
            />
          </Form.Label>
          <Form.Label>
            <h3>summery:</h3>
            <Form.TextArea
              placeholder="description"
              value={description}
              type="text"
              onChange={({ target }) => {
                changeInput.current = false;
                setMyItem((prevState) => ({ ...prevState, description: target.value }));
              }}
              editForm
            />
          </Form.Label>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Submit
            form="editBook"
            key="submit"
            htmlType="submit"
            disabled={changeInput.current || isInvalid}
            onClick={(e) => handleUpdateItem(e, myItem)}
            editBook
          >
            update
          </Form.Submit>
        </Form.Base>
      </Form>
    </Modal>
  );
}
