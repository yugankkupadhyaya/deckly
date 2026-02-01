import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="flex flex-col items-center justify-center h-screen">{children}</div>;
};

export default Layout;
