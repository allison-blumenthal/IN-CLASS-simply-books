import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAuthors, createAuthor, updateAuthor } from '../../api/authorData';

const initialState = {
  email: '',
  first_name: '',
  last_name: '',
  image: '',
  favorite: false, 
};

function AuthorForm({ authorObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [authors, setAuthors] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAuthors(user.uid).then(setAuthors);

    if (authorObj.firebaseKey) setFormInput(authorObj);
  }, [authorObj, user]);

const handleChange = (e) => {
  console.warn('hello');

  const { name, value } = e.target;
  setFormInput((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authorObj.firebaseKey) {
      updateAuthor(formInput)
        .then(() => router.push(`/author/${authorObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then((response) => {
        const patchPayload = { firebaseKey: response };

        updateAuthor(patchPayload.firebaseKey);
      }).then(() => {
        router.push('/authors');
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{authorObj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* FIRST NAME */}
      <FloatingLabel controlId="floatingInput1" label="Author First Name" className="mb-3"> 
        <Form.Control
          type="text"
          placeholder="Author's first name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
          />
        </FloatingLabel>

        {/* LAST NAME */}
        <FloatingLabel controlId="floatingInput2" label="Author Last Name" className="mb-3"> 
        <Form.Control
          type="text"
          placeholder="Author's last name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
          />
        </FloatingLabel>

         {/* IMAGE */}
         <FloatingLabel controlId="floatingInput3" label="Author Image" className="mb-3"> 
        <Form.Control
          type="url"
          placeholder="Author Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
          />
        </FloatingLabel>

         {/* EMAIL */}
         <FloatingLabel controlId="floatingInput4" label="Author Email" className="mb-3"> 
        <Form.Control
          type="email"
          placeholder="Author's email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
          />
        </FloatingLabel>

      {/* FAVORITE */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

       {/* SUBMIT BUTTON  */}
       <Button type="submit">{authorObj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  authorObj: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  authorObj: initialState,
};

export default AuthorForm;
