import React from 'react'
import { useRouter } from 'next/router';

export default function ShowAuthor() {

const router = useRouter();
const { firebaseKey } = router.query;

return (
    <div>Show Author</div>
  );
}
