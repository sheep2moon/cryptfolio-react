import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useFire } from './contexts/FireContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useFire();

  console.log(user ? 'tak' : 'nie');
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    ></Route>
  );
}
