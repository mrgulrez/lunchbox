// src/components/Login.js

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const handleLogin = (response) => {
    console.log('Google login response:', response);
    // Handle login, e.g., send token to backend for verification
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={handleLogin}
        onFailure={(error) => console.log('Login failed:', error)}
      />
    </div>
  );
};

export default Login;
