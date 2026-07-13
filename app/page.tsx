'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import ProjectGrid from '@/components/ProjectGrid';
import CuriousCanvas from '@/components/CuriousCanvas';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'work' | 'about' | 'experience'
  >('all');
  const [isCuriousMode, setIsCuriousMode] = useState(false);
  const [curiousCategory, setCuriousCategory] = useState<
    'everything' | 'process' | 'work' | 'personal'
  >('everything');

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
    <>
      <CustomCursor />
      <DesktopSurface>
        <SiteHeader />
        <div style={{ position: 'relative', marginTop: '12px' }}>
          <FileTabNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isCuriousMode={isCuriousMode}
            onToggleCuriousMode={() => setIsCuriousMode((prev) => !prev)}
            filter={curiousCategory}
            setFilter={(val) => setCuriousCategory(val as any)}
          />
          <FileContainer>
            <div style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 0,
              ...(isCuriousMode ? { height: 'calc(100vh - 215px)', minHeight: '600px' } : {})
            }}>
              {isCuriousMode ? (
                <CuriousCanvas category={curiousCategory} />
              ) : (
                <ProjectGrid activeTab={activeTab} />
              )}
            </div>
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
