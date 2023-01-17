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
  viewAuthorDetails(firebaseKey).then(setAuthor);
}, [firebaseKey])

return (
  <>
  <div className="mt-5 d-flex flex-wrap">
    <div className="d-flex flex-column">
      <img src={author.image} alt={author.last_name} style={{ width: '300px' }} />
    </div>
    <div className="text-white ms-5 details">
      <h2>
        {author.first_name} {author.last_name}
      </h2>
      <h6>{author.favorite ? <span class="badge text-bg-warning">Favorite</span> : ''}
      </h6>
      Author Email: <a href={`mailto:${author.email}`}>{author.email}</a>
    </div>
  </div>
  <div>


    
  </div>
  </>
  );
}
