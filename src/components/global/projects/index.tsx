'use client';

import { Project } from '@prisma/client';
import { motion } from 'framer-motion';
import { containerVariants } from '../../../lib/constants';
import ProjectCard from '../project-card';
import NotFound from '../not-found';

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  if (!projects || projects.length === 0) {
    return <NotFound />;
  }

  console.log('Projects component rendering with:', projects.length, 'projects');
  console.log('Projects data:', projects);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          projectId={project?.id}
          title={project?.title}
          createdAt={project.createdAt.toString()}
          isDeleted={project?.isDeleted}
          slideData={project?.slides}
          themeName={project.themeName}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
