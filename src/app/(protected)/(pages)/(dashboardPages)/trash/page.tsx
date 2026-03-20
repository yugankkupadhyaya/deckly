import NotFound from '../../../../../components/global/not-found';
import Projects from '../../../../../components/global/projects';
import { getDeletedProjects } from '../../../../actions/project';
import DeleteAllButton from './_components/DeleteAllButton';

const page = async () => {
  const deletedProjects = await getDeletedProjects();

  if (!deletedProjects || deletedProjects.status !== 200) {
    return <NotFound />;
  }

  const projects = deletedProjects.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold">Trash</h1>
          <p className="text-base text-muted-foreground">All your deleted presentations</p>
        </div>

        <DeleteAllButton projects={projects} />
      </div>

      {/* Content */}
      {projects.length > 0 ? <Projects projects={projects} /> : <NotFound />}
    </div>
  );
};

export default page;
