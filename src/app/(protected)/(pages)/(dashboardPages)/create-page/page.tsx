import React, { Suspense } from 'react';

import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton';
import RenderPage from './_components/RenderPage';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <main className="w-full h-full pt-6">
        <Suspense fallback={<CreatePageSkeleton />}>
          <RenderPage />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
