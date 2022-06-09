import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout({ children }) {
  console.log('🚀 => children', children);
  return (
    <div>
      <span>AuthLayout</span>
      <Outlet />
      {children}
    </div>
  );
}