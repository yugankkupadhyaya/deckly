'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import usePromptStore, { Page } from '../../../../../../store/usePromptStore';
import CreatePage from './CreatePage/CreatePage';
import { redirect } from 'next/dist/server/api-utils';
import CreativeAi from './GenerateAi/CreativeAi';
import ScratchPage from './Scratch/ScratchPage';

type Props = {};

const RenderPage = (props: Props) => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const handleSelectOption = (option: string) => {
    if (option === 'template') {
      router.push('/templates');
    } else if (option === 'create-scratch') {
      setPage('create-scratch');
    } else {
      setPage('creative-ai');
    }
  };
  const handleBack = () => {
    setPage('create');
  };

  const renderStep = () => {
    switch (page) {
      case 'create':
        return (
          <>
            <CreatePage onSelectOption={handleSelectOption} />
          </>
        );

      case 'create-scratch':
        return <ScratchPage onBack={handleBack} />;

      case 'creative-ai':
        return <CreativeAi onBack={handleBack} />;

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
