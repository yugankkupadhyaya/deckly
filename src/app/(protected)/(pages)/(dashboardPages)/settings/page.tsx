import React from 'react';
import { onAuthenticateUser } from '../../../../actions/user';

type Props = {};

const page = async (props: Props) => {
  const checkUser = await onAuthenticateUser();
  //wip::Setup some settings
  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">Settings</h1>

          <p className="text-base font-normal dark:text-secondary">All your settings</p>
        </div>
      </div>
    </div>
  );
};

export default page;
