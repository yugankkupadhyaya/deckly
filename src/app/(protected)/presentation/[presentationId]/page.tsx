'use client';

import { useEffect, useState } from 'react';
import { useSlideStore } from '../../../../store/useSlideStore';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { getProjectById } from '../../../actions/project';
import { Loader2 } from 'lucide-react';
import { showErrorToast } from '../../../../lib/toast';
import { themes } from '../../../../lib/constants';
import { Theme } from '../../../../lib/types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const { setCurrentTheme, setSlides, setActiveProject: setProject } = useSlideStore();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await getProjectById(params.presentationId as string);

        if (res.status !== 200 || !res.data) {
          showErrorToast('Unable to fetch project');
          router.push('/dashboard');
          return;
        }

        const findTheme = themes.find((theme) => theme.name === res.data.themeName);

        const resolvedTheme = findTheme?.type === 'dark' ? 'dark' : 'light';

        setTheme(resolvedTheme);
        setCurrentTheme(resolvedTheme as unknown as Theme);

        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        console.error(error);
        showErrorToast('An unexpected error occurred');
        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [params.presentationId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return <DndProvider backend={HTML5Backend}>{/* Your presentation UI here */}</DndProvider>;
};

export default Page;
