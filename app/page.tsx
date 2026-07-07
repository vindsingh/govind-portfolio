'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import ProjectGrid from '@/components/ProjectGrid';
import CuriousCanvas from '@/components/CuriousCanvas';

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'work' | 'about' | 'experience'
  >('all');
  const [isCuriousMode, setIsCuriousMode] = useState(false);
  const [filter, setFilter] = useState('everything');

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768 && isCuriousMode) {
        setIsCuriousMode(false);
      }
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [isCuriousMode]);

  return (
    <DesktopSurface>
      <SiteHeader />
      <div style={{ position: 'relative', marginTop: '12px' }}>
        <FileTabNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCuriousMode={isCuriousMode}
          onToggleCuriousMode={() => setIsCuriousMode((prev) => !prev)}
          filter={filter}
          setFilter={setFilter}
        />
        <FileContainer>
          <AnimatePresence mode="wait">
            {isCuriousMode ? (
              <motion.div
                key="curious"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <CuriousCanvas
                  onExitCuriousMode={() => setIsCuriousMode(false)}
                  filter={filter}
                  setFilter={setFilter}
                />
              </motion.div>
            ) : (
              <motion.div
                key="file"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectGrid activeTab={activeTab} />
              </motion.div>
            )}
          </AnimatePresence>
        </FileContainer>
      </div>
    </DesktopSurface>
  );
}
