import { Image } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Slide, Theme } from './../../../lib/types';
import { MasterRecursiveComponent } from '../../../app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent';

type Props = { slide: Slide; theme: Theme };

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <div
      className={cn('w-full relative rounded-lg overflow-hidden ')}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        background: theme.gradientBackground || theme.slideBackgroundColor,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
          <div className="w-full h-full flex items-start justify-start">
            <MasterRecursiveComponent
              slideId={slide.id}
              content={slide.content}
              onContentChange={() => {}}
              isPreview={true}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <Image className="w-10 h-10 text-muted-foreground/50" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
