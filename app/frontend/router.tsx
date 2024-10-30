import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root/root.tsx';
import { AccountSelection } from './routes/signup/account-selection/account-selection.tsx';
import { CreateAccount } from './routes/signup/create-account/create-account.tsx';
import { CreateUser } from './routes/signup/create-user/create-user.tsx';
import { Deposit } from './routes/signup/deposit/deposit.tsx';
import { JointAccess } from './routes/signup/joint-access/joint-access.tsx';
import { StockRestrictions } from './routes/signup/stock-restrictions/stock-restrictions.tsx';
import { Routes } from './helpers/constants/routes.enum.ts';

const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    // TODO: handle logged in redirect vs logged out redirect
    element: <Navigate to={Routes.CREATE_ACCOUNT} replace />,
  },
  {
    path: Routes.ACCOUNT_SELECTION,
    element: <AccountSelection />,
  },
  {
    path: Routes.CREATE_ACCOUNT,
    element: <CreateAccount />,
  },
  {
    path: Routes.CREATE_USER,
    element: <CreateUser />,
  },
  {
    path: Routes.JOINT_ACCESS,
    element: <JointAccess />,
  },
  {
    path: Routes.STOCK_RESTRICTIONS,
    element: <StockRestrictions />,
  },
  {
    path: Routes.DEPOSIT,
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
