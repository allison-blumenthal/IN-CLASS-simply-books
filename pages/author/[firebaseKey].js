import React from 'react'
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ViewAuthor() {
  const [author, setAuthor] = useState({})

const router = useRouter();
const { firebaseKey } = router.query;

useEffect(() => {
  viewAuthorDetails(firebaseKey).then()
}, [])

return (
    <div>View Author</div>
  );
}
