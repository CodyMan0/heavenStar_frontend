import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuth = Boolean(useSelector(user => user.token));

  return (
    <>
      <main>{isAuth ? <Outlet /> : <Navigate to="/" />}</main>
    </>
  );
};

export default ProtectedRoute;
