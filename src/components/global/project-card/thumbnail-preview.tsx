import { Image } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Slide, Theme } from './../../../lib/types';

type Props = { slide?: Slide; theme: Theme };

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <div
      className={cn(
        'w-full h-full relative rounded-lg overflow-hidden transition-all duration-200'
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] overflow-hidden">
          {/* wip:add a preview of slides   */}
          this is a slide{' '}
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
