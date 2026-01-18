import React from 'react';
import { getAllProjects } from '../../../../../actions/project';

const DashboardPage = async () => {
  const allProject = await getAllProjects();

  return (
    <div className="relative w-full flex flex-col gap-6 px-6 py-6 bg-[#0b0f14] text-gray-200">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold text-gray-100">Projects</h1>
          <p className="text-sm text-gray-400">All of your work in one place</p>
        </div>
      </div>

      {/* projects */}
    </div>
  );
};

export default DashboardPage;
