import React from 'react';
import FirebaseAuth from '../components/firebase-auth';

const Auth = () => {
  return (
    <div>
      <p>Sign in</p>
      <div>
        <FirebaseAuth />
      </div>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
