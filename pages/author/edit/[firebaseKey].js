import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthorForm from '../../../components/forms/AuthorForm';
import { getSingleAuthor } from '../../../api/authorData';

export default function EditAuthor() {
  const [editAuthor, setEditAuthor] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the author data
  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditAuthor);
  }, [firebaseKey]);

  // pass object to form
  return (<AuthorForm key={firebaseKey} authorObj={editAuthor} />);
};
