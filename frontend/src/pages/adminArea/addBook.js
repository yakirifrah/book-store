import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '../../components';
import { authAdminListener } from '../../utils';
import API from '../../api';

export default function AddBook() {
  const history = useHistory();
  const [author, setAuthor] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState({});
  const [error, setError] = useState('');
  const isInvalid =
    author?.fullName === '' ||
    price === '' ||
    title === '' ||
    description === '' ||
    publisher?.publisherName === '';
  const handleAddBook = async (event) => {
    event.preventDefault();
    try {
      const { token } = authAdminListener();

      await API.addBook(
        {
          author,
          description,
          price,
          publisher,
          imageURL,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      setError(error.message);
    }
    return history.goBack();
  };

  return (
    <>
      <Form addBook>
        <Form.Title>Add Book</Form.Title>
        {error && <Form.Error>{error}</Form.Error>}
        <Form.Base onSubmit={handleAddBook}>
          <Form.Label addBook>
            <h3>Title:</h3>
            <Form.Input
              placeholder="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Label>
          <Form.Label addBook>
            <h3>Publisher:</h3>
            <Form.Input
              placeholder="publisher"
              value={publisher.publisherName || ''}
              onChange={({ target }) => setPublisher({ publisherName: target.value })}
            />
          </Form.Label>
          <Form.Label addBook>
            <h3>Author:</h3>
            <Form.Input
              placeholder="author"
              value={author.fullName || ''}
              onChange={({ target }) => setAuthor({ fullName: target.value })}
            />
          </Form.Label>
          <Form.Label addBook>
            <h3>Price:</h3>
            <Form.Input
              placeholder="price"
              type="number"
              value={price}
              onChange={({ target }) => setPrice(target.value)}
            />
          </Form.Label>
          <Form.Label addBook>
            <h3>Image URL:</h3>
            <Form.Input
              placeholder="image URL"
              value={imageURL}
              onChange={({ target }) => setImageURL(target.value)}
            />
          </Form.Label>
          <Form.Label addBook>
            <h3>Summery:</h3>
            <Form.TextArea
              value={description}
              placeholder="Book description"
              onChange={({ target }) => setDescription(target.value)}
            />
          </Form.Label>
          <Form.Submit disabled={isInvalid} type="submit">
            Add Book
          </Form.Submit>
        </Form.Base>
      </Form>
    </>
  );
}
