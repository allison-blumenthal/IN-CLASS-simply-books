import React from 'react';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { Button } from 'react-bootstrap';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div class="user-profile">
      <img src={user.photoURL} alt="userURL" width="100px" height="100px" />
      <h1>{user.displayName}</h1>
      <h3>{user.email}</h3>
      <h4>{user.metadata.lastSignInTime}</h4>
      <Button type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  )
}
