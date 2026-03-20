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
import Navbar from './_components/Navbar/Navbar';
import { persist } from 'zustand/middleware';
import LayoutPreview from './_components/editor-sidebar/leftSidebar/LayoutPreview';
import ComponentsPanel from './_components/editor-sidebar/rightSidebar/tabs/ComponentsPanel';
import Editor from './_components/editor/Editor';
import EditorRightSideBar from './_components/editor-sidebar/rightSidebar/index';
import PresentationMode from './_components/Navbar/PresentationMode';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'edit' | 'present'>('edit');
  const {
    setCurrentTheme,
    setSlides,
    setActiveProject: setProject,
    currentTheme,
  } = useSlideStore();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await getProjectById(params.presentationId as string);

        if (res.status !== 200 || !res.data) {
          showErrorToast('Unable to fetch project');
          router.push('/dashboard');
          return;
        }

        console.log('Fetched themeName:', res.data.themeName);

        const findTheme = themes.find((theme) => theme.name === res.data.themeName);
        if (!findTheme) {
          console.warn(`Theme not found for name: ${res.data.themeName}. Applying default theme.`);
        }
        const resolvedTheme = findTheme || themes.find((theme) => theme.name === 'Default')!;

        setCurrentTheme(resolvedTheme);
        console.log('Resolved theme:', resolvedTheme);

        setTheme(resolvedTheme.type);
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

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar
        mode={mode}
        setMode={setMode}
        presentationId={params.presentationId as string}
        theme={currentTheme}
      ></Navbar>

      {mode == 'edit' && (
        <div
          className="flex-1 flex pt-16 min-h-screen"
          style={{
            color: currentTheme.fontColor,
            fontFamily: currentTheme.fontFamily,
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <LayoutPreview />

          <div className="flex-1 pl-72 pr-64">
            <Editor isEditable={true} />
          </div>

          {/* <EditorRightSideBar /> */}
          <EditorRightSideBar />
        </div>
      )}
      {mode == 'present' && <PresentationMode onClose={() => setMode('edit')} />}
    </DndProvider>
  );
};

export default Page;
