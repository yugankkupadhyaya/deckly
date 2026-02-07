'use client';

import { useEffect, useState } from 'react';
import { useSlideStore } from '../../../../store/useSlideStore';
import { redirect, useParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { getProjectById } from '../../../actions/project';
import { stat } from 'fs';
import { Flashlight, Loader2, ShowerHead } from 'lucide-react';
import { showErrorToast } from '../../../../lib/toast';
import { themes } from '../../../../lib/constants';
import { Theme } from '../../../../lib/types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Props = {};


const page = (props: Props) => {
  //WIP:create the presentation view

  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentTheme, setSlides, setProject, currentTheme } = useSlideStore();
  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params.presentationId as string);
        if (res.status != 200 || !res.data) {
          showErrorToast('Unable to fetch project ');
          redirect('/dashboard');
        }

        const findTheme = themes.find((theme) => (theme.name = res.data.themeName));
        setCurrentTheme((findTheme?.type === 'dark' ? 'dark' : 'light') as unknown as Theme);
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        console.log(error);
        showErrorToast('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>;
  }

  return <DndProvider backend={HTML5Backend}></DndProvider>;
};
  
export default page;
