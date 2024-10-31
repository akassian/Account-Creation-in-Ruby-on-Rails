import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PUBLIC_ROUTES, Routes } from '../../helpers/constants/routes.enum';

interface Props {
  children: ReactNode;
}

// TODO: hide logout when user is not logged in
// TODO: back button
export function FlowLayout({ children }: Props) {
  // TODO: actually check JWT for user is authenticated
  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname as Routes);

  return (
    <div className="h-full mt-5 max-w-[1000px] mx-auto">
      <div className="w-full text-right">
        {!isPublicRoute &&
          <Link to="/logout" reloadDocument>
            Logout
          </Link>
        }
      </div>
      {children}
    </div>
  );
}
