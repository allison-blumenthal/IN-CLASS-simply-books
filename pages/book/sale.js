import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext'; 
import { booksOnSale } from '../../api/bookData';
import BookCard from '../../components/BookCard';

export default function BooksOnSale() {
  const { user } = useAuth();
  const [ books, setBooks ] = useState([]);

  const getAllBooksOnSale = () => {
    booksOnSale(user.uid).then(setBooks);
  }

  useEffect(() => {
    getAllBooksOnSale()
  }, []);

  return (
    <div>{books.map((book) => (
      <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllBooksOnSale}/>
    ))}</div>
  );
}
