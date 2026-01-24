import { getAllProjects } from '../../../../../actions/project';
import NotFound from '../../../../../components/global/not-found';
import ProjectCard from '../../../../../components/global/project-card';
import Projects from '../../../../../components/global/projects';

const DashboardPage = async () => {
  const allProject = await getAllProjects();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className=" pl-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">All your work in one place</p>
      </div>

      {/* projects  */}
      {allProject.data && allProject.data.length > 0 ? (
        <Projects projects={allProject.data} />
        // <ProjectCard projects={allProject.data} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
