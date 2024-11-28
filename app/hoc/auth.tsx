'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== undefined){
        if (!isAuthenticated) {
          const user = localStorage.getItem('user');
          if (!user) {
            router.push('/login');
          }
        }
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'AuthComponent'})`;

  return AuthenticatedComponent;
};

export default withAuth;
