import React from 'react'
import DeleteAllButton from './_components/DeleteAllButton';

type Props = {}

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary">Trash</h1>

          <p className="text-base font-normal dark:text-secondary">
            All your deleted presentations
          </p>
        </div>

        <DeleteAllButton />
      </div>
    </div>
  );
}

export default page
