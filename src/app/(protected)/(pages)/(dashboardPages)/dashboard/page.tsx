import { getAllProjects } from '../../../../actions/project';
import Projects from '../../../../../components/global/projects';

const DashboardPage = async () => {
  const allProject = await getAllProjects();

  const projects =
    allProject.status === 200 &&
    allProject.data &&
    Array.isArray(allProject.data) &&
    allProject.data.length > 0
      ? allProject.data
      : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className=" pl-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">All your work in one place</p>
      </div>

      {/* projects  */}
      <div className="pl-6">
        <Projects projects={projects} />
      </div>
    </div>
  );
};

export default DashboardPage;
