// this store controls the states of projects, including the list of projects, current project, and actions to manipulate projects (create, delete, update, etc.)

import { create } from 'zustand';
import { Project } from '@prisma/client';

type ProjectStore = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  removeProject: (id: string) => void;
  addProject: (project: Project) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],

  setProjects: (projects) => set({ projects }),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),
}));
