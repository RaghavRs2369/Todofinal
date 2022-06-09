import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
// import { CircularProgress } from '@mui/material';
import {
  // selectIsLoadingFromAuth,
  selectIsAuthenticated,
} from '../redux/slices/auth';

export default function ProtectedRoutes({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const isLoading = useSelector(selectIsLoadingFromAuth);

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return children;
}