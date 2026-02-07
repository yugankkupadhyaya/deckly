import React from 'react';

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return <div className="h-full w-full overflow-x-hidden">{children}</div>;
};

export default layout;
