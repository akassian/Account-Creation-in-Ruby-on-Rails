import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root/root.tsx';
import { AccountSelection } from './routes/signup/account-selection/account-selection.tsx';
import { CreateAccount } from './routes/signup/create-account/create-account.tsx';
import { CreateUser } from './routes/signup/create-user/create-user.tsx';
import { Deposit } from './routes/signup/deposit/deposit.tsx';
import { JointAccess } from './routes/signup/joint-access/joint-access.tsx';
import { StockRestrictions } from './routes/signup/stock-restrictions/stock-restrictions.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    // TODO: handle logged in redirect vs logged out redirect
    element: <Navigate to="/create-account" replace />,
  },
  {
    path: '/signup/account-selection',
    element: <AccountSelection />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
  {
    path: '/signup/create-user',
    element: <CreateUser />,
  },
  {
    path: '/signup/joint-access',
    element: <JointAccess />,
  },
  {
    path: '/signup/stock-restrictions',
    element: <StockRestrictions />,
  },
  {
    path: '/signup/deposit',
    element: <Deposit />,
  },
]);

export function Router() {
  return (
    <main className="h-screen w-screen">
      <div className="h-full w-full max-w-[1200px] my-0 mx-auto">
        <RouterProvider router={router} />
      </div>
    </main>
  );
}
