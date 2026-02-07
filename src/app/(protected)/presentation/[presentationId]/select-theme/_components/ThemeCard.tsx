// import React from 'react';
// import { motion, useAnimation, type Variants } from 'framer-motion';
// import { Theme } from './../../../../../../lib/types';
// import { Card, CardContent } from '../../../../../../components/ui/card';
// import Image from 'next/image';

// type Props = {
//   title: string;
//   description: string;
//   content: React.ReactNode;
//   variant: 'left' | 'main' | 'right';
//   theme: Theme;
//   controls: ReturnType<typeof useAnimation>;
// };

// const ThemeCard = ({ title, description, content, variant, theme, controls }: Props) => {
//   const variantConfigs = {
//     left: {
//       hidden: { opacity: 0, x: '-50%', y: '-50%', scale: 0.9, rotate: 0 },
//       visible: {
//         opacity: 1,
//         x: '-25%',
//         y: '-25%',
//         scale: 0.95,
//         rotate: -10,
//         transition: { type: 'spring' as const, stiffness: 300, damping: 30, delay: 0.1 },
//       },
//     },
//     right: {
//       hidden: { opacity: 0, x: '50%', y: '-50%', scale: 0.9, rotate: 0 },
//       visible: {
//         opacity: 1,
//         x: '25%',
//         y: '25%',
//         scale: 0.95,
//         rotate: 10,
//         transition: { type: 'spring' as const, stiffness: 300, damping: 30, delay: 0.1 },
//       },
//     },
//     main: {
//       hidden: { opacity: 0, scale: 0.9 },
//       visible: {
//         opacity: 1,
//         scale: 1,
//         transition: { type: 'spring' as const, stiffness: 300, damping: 30, delay: 0.2 },
//       },
//     },
//   };

//   const variants: Variants = variantConfigs[variant];

//   return (
//     // <motion.div
//     //   initial="hidden"
//     //   animate={controls}
//     //   variants={variants}
//     //   className="absolute w-full max-w-3xl"
//     //   style={{ zIndex: variant === 'main' ? 10 : 0 }}
//     // >
//     //   <Card
//     //     className="h-full shadow-2xl backdrop-blur-sm"
//     //     style={{
//     //       backgroundColor: theme.slideBackgroundColor,
//     //       border: `1px solid ${theme.accentColor}20`,
//     //     }}
//     //   >
//     //     <div className="flex flex-col md:flex-row">
//     //       <CardContent className="flex-1 p-8 space-y-6">
//     //         <div className="space-y-3">
//     //           <h2
//     //             className="text-3xl font-bold tracking-tight"
//     //             style={{ color: theme.accentColor }}
//     //           >
//     //             {title}
//     //           </h2>
//     //           <p className="text-lg ">{description}</p>
//     //         </div>
//     //         {content}
//     //       </CardContent>
//     //       <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden rounded-r-lg">
//     //         <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden rounded-r-lg">
//     //           <Image
//     //             src="https://images.unsplash.com/photo-1567095751004-aa51a2690368?q=80&w=1170&auto=format&fit=crop"
//     //             alt="Theme preview image"
//     //             fill
//     //             className="object-cover transition-transform duration-500 hover:scale-105"
//     //           />
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </Card>
//     // </motion.div>
//     <motion.div
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       className="
//     absolute
//     w-[90vw]
//     max-w-[36rem]
//     scale-[0.85]
//   "
//       style={{
//         zIndex: variant === 'main' ? 10 : 0,
//         transformOrigin: 'center center',
//         translateX: '-6%',
//         translateY: '6%',
//       }}
//     >
//       <Card
//         className="overflow-hidden shadow-2xl backdrop-blur-sm"
//         style={{
//           backgroundColor: theme.slideBackgroundColor,
//           border: `1px solid ${theme.accentColor}20`,
//         }}
//       >
//         <CardContent className="p-8 space-y-6">
//           {/* Title + description */}
//           <div className="space-y-3">
//             <h2 className="text-3xl font-bold tracking-tight" style={{ color: theme.accentColor }}>
//               {title}
//             </h2>
//             <p className="text-lg text-foreground/80">{description}</p>
//           </div>

//           {/* Custom content */}
//           {content}

//           {/* Image BELOW everything */}
//           <div className="relative w-full h-72 overflow-hidden rounded-xl">
//             <Image
//               src="https://images.unsplash.com/photo-1567095751004-aa51a2690368?q=80&w=1170&auto=format&fit=crop"
//               alt="Theme preview image"
//               fill
//               className="object-cover transition-transform duration-500 hover:scale-105"
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default ThemeCard;

import React from 'react';
import { motion, useAnimation, type Variants } from 'framer-motion';
import { Theme } from './../../../../../../lib/types';
import { Card, CardContent } from '../../../../../../components/ui/card';
import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
  variant: 'left' | 'main' | 'right';
  theme: Theme;
  controls: ReturnType<typeof useAnimation>;
};

const ThemeCard = ({ title, description, content, variant, theme, controls }: Props) => {
  const variantConfigs: Record<'left' | 'main' | 'right', Variants> = {
    main: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        x: '0%',
        y: '0%',
        rotate: 0,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 28,
        },
      },
    },

    left: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: {
        opacity: 1,
        scale: 0.9,
        x: '-55%', // 👈 BIG horizontal move
        y: '-5%',
        rotate: -10,
        transition: {
          type: 'spring',
          stiffness: 220,
          damping: 30,
          delay: 0.08,
        },
      },
    },

    right: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: {
        opacity: 1,
        scale: 0.9,
        x: '55%', // 👈 BIG horizontal move
        y: '5%',
        rotate: 10,
        transition: {
          type: 'spring',
          stiffness: 220,
          damping: 30,
          delay: 0.08,
        },
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variantConfigs[variant]}
      className={`
        absolute
        w-[90vw]
        ${variant === 'main' ? 'max-w-[36rem] scale-[1.0] translate-x-0 translate-y-0' : 'max-w-[32rem] scale-[0.85]'}
        ${variant === 'left' ? 'translate-x-[-50%] translate-y-[-5%] rotate-[-10deg]' : ''}
        ${variant === 'right' ? 'translate-x-[50%] translate-y-[5%] rotate-[10deg]' : ''}
      `}
      style={{
        zIndex: variant === 'main' ? 20 : 10,
        transformOrigin: 'center center',
      }}
    >
      <Card
        className="overflow-hidden shadow-2xl backdrop-blur-sm"
        style={{
          backgroundColor: theme.slideBackgroundColor,
          border: `1px solid ${theme.accentColor}20`,
        }}
      >
        <CardContent className="p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: theme.accentColor }}>
              {title}
            </h2>
            <p className="text-lg text-foreground/80">{description}</p>
          </div>

          {content}

          <div className="relative w-full h-64 overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1567095751004-aa51a2690368?q=80&w=1170&auto=format&fit=crop"
              alt="Theme preview"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ThemeCard;
