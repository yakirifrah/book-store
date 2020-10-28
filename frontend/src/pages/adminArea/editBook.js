import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form } from '../../components';
import { Button } from 'antd';

export default function EditBook({ children, ...restProps }) {
  const { modalEditBook, handleCancel, item, handleUpdateItem } = restProps;
  const { _id } = item;
  const myItemFromProp = item;
  const changeInput = useRef(true);
  const [myItem, setMyItem] = useState(myItemFromProp);
  const isInvalid =
    myItem.title === '' || myItem.description === '' || myItem.author === '' || myItem.price === '';
  useEffect(() => {
    setMyItem(item);
  }, [item]);

  return (
    <Modal
      title="Edit book"
      visible={modalEditBook}
      onCancel={handleCancel}
      bodyStyle={{ backgroundColor: '#333333', height: 'fit-content' }}
      footer={[
        <Button
          form="editBook"
          key="submit"
          htmlType="submit"
          disabled={changeInput.current || isInvalid}
          onClick={(e) => handleUpdateItem(e, myItem)}
        >
          update
        </Button>,
      ]}
      editModal
    >
      <Form id="editBook">
        <Form.Title>Edit book</Form.Title>
        <Form.Base>
          <Form.Label>
            <h3>Title:</h3>
            <Form.Input
              placeholder="title"
              value={myItem.title}
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
              value={myItem.author}
              onChange={({ target }) => {
                changeInput.current = false;
                setMyItem((prevState) => ({ ...prevState, author: target.value }));
              }}
              editForm
            />
          </Form.Label>
          <Form.Label>
            <h3>Price:</h3>
            <Form.Input
              placeholder="price"
              value={myItem.price}
              type="number"
              onChange={({ target }) => {
                changeInput.current = false;
                setMyItem((prevState) => ({ ...prevState, price: target.value }));
              }}
              editForm
            />
          </Form.Label>
          <Form.Label>
            <h3>decs:</h3>
            <Form.TextArea
              placeholder="description"
              value={myItem.description}
              type="text"
              onChange={({ target }) => {
                changeInput.current = false;
                setMyItem((prevState) => ({ ...prevState, description: target.value }));
              }}
              editForm
            />
          </Form.Label>
        </Form.Base>
      </Form>
    </Modal>
  );
}
