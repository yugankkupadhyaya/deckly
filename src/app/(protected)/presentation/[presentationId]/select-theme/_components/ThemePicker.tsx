import React from 'react';
import { Theme } from '../../../../../../lib/types';
import { Button } from '../../../../../../components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../../../../../lib/toast';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { useParams, useRouter } from 'next/navigation';
import { generateLayouts } from '../../../../../actions/ai.actions';
import { ScrollArea } from '../../../../../../components/ui/scroll-area';
import { motion, MotionConfig, scale } from 'framer-motion';

type Props = {
  selectedTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  themes: Theme[];
};

const ThemePicker = ({ selectedTheme, onSelectTheme, themes }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { project, setSlides, currentTheme } = useSlideStore();
  const handleGenerateLayouts = async () => {
    setLoading(true);
    if (!selectedTheme) {
      showErrorToast('Please select a Theme');
      return;
    }
    if (project?.id === '') {
      showErrorToast('Please create a project');
      router.push('/create-page');
      return;
    }

    try {
      const res = await generateLayouts(params.presentationId as string, currentTheme.name);

      if (res.status != 200 && !res.data) {
        throw new Error('Error generating layouts');
      }
      showSuccessToast('Layouts generated successfully');
      setSlides(res.data);
      router.push(`/presentation/${project?.id}`);
    } catch (error) {
      showErrorToast('Error Failed to generate layouts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full lg:w-90 lg:min-w-[320px] lg:max-w-185 overflow-hidden flex flex-col min-h-screen lg:h-screen lg:sticky lg:top-0 border-t lg:border-t-0 lg:border-l"
      style={{
        backgroundColor: selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderColor: `${selectedTheme.accentColor}20`,
        boxShadow: `-12px 0 32px ${selectedTheme.accentColor}10`,
      }}
    >
      <div className="p-8 space-y-4 shrink-0">
        <div className="space-y-3">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Pick a Theme
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: `${selectedTheme.accentColor}90` }}
          >
            Select a theme that best fits your presentation style or generate a custom one based on
            your content. You can always change it later!
          </p>
        </div>
        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin"></Loader2>
          ) : (
            <Wand2 className="mr-2 h-5 w-5"></Wand2>
          )}
          {loading ? <p className="animate-pulse">Generating....</p> : 'Generate Theme'}
        </Button>
      </div>
      <ScrollArea className="flex grow px-8      ">
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <motion.div key={theme.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => onSelectTheme(theme)}
                className="flex flex-col items-center justify-start p6 w-full h-auto"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-xl font-bold">{theme.name}</span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  ></div>
                  <div className="space-y-1 w-full">
                    <div className="text-2xl font-bold" style={{ color: theme.accentColor }}>
                      Your Title
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThemePicker;
