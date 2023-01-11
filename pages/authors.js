import React from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAuthors } from '../api/authorData';
import { useState } from 'react';
import { useEffect } from 'react';
import AuthorCard from '../components/AuthorCard';

export default function ShowAuthors() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);

  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  }

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div>{authors.map((author) => (
      <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
    ))}
    </div>
  );
}
