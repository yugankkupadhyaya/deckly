'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setShowGap] = useState(false);

  return (
    <motion.div
      className="w-full relative overflow-hidden"
      initial={{ height: '0.5rem' }}
      animate={{
        height: showGap ? '2rem' : '0.5rem',
        transition: { duration: 0.3, ease: 'easeInOut' },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-40%"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
