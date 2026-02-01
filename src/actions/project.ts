'use server';

import { redirect } from 'next/dist/server/api-utils';
import { client } from '../lib/prisma';
import { onAuthenticateUser } from './user';
import { Project } from '@prisma/client';
import { error } from 'console';
import { ReactJsxRuntime } from 'next/dist/server/route-modules/app-page/vendored/rsc/entrypoints';
import { OutlineCard } from '../lib/types';
import { stat } from 'fs';

import { use } from 'react';

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'User not authenticated' };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return { status: 200, data: projects || [] };
  } catch (err) {
    console.error('❌ Internal Server Error:', err);
    return { status: 500, error: 'Internal Server Error' };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'User not authenticated' };
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });
    if (projects.length == 0) {
      return {
        status: 404,
        error: 'no recent projects available',
      };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.error('❌ Internal Server Error:', error);
    return { status: 500, error: 'Internal Server Error' };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'User not authenticated' };
    }
    const updatedProject = await client.project.update({
      where: { id: projectId },
      data: {
        isDeleted: false,
      },
    });
    if (!updatedProject) {
      return { status: 500, error: 'Failed to recover ' };
    }
    return {
      status: 200,
      data: updatedProject,
    };
  } catch (error) {
    console.error('❌ Internal Server Error:', error);
    return { status: 500, error: 'Internal Server Error' };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'User not authenticated' };
    }
    const updatedProject = await client.project.update({
      where: { id: projectId },
      data: { isDeleted: true },
    });
    if (!updatedProject) {
      return { status: 500, error: 'Failed to delete Project ' };
    }
    return {
      status: 200,
      data: updatedProject,
    };
  } catch (error) {
    console.error('❌ Internal Server Error:', error);
    return { status: 500, error: 'Internal Server Error' };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: 'Title and outlines are required' };
    }
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'User not authenticated' };
    }

    const allOutLines = outlines.map((outline) => outline.title);
    const project = await client.project.create({
      data: {
        title,
        outlines: allOutLines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: checkUser.user.id,
      },
    });
    if (!project) {
      return { status: 500, error: 'Failed to create a project ' };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.error('❌ Internal Server Error:', error);
    return { status: 500, error: 'Internal Server Error' };
  }
};
