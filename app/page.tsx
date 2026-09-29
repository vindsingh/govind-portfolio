'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav, { Tab } from '@/components/FileTabNav';
import ProjectGrid from '@/components/ProjectGrid';
import CuriousCanvas from '@/components/CuriousCanvas';
import CustomCursor from '@/components/CustomCursor';

function HomeContent() {
  const params = useSearchParams();
  const tab: Tab = params.get('tab') === 'work' ? 'work' : 'all';
  const [isCuriousMode, setIsCuriousMode] = useState(
    params.get('curious') === '1' || params.get('curious') === 'true'
  );
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
        <SiteHeader
          isCuriousMode={isCuriousMode}
          onToggleCuriousMode={() => setIsCuriousMode((prev) => !prev)}
        />
        <div style={{ position: 'relative', marginTop: '12px' }}>
          <FileTabNav
            activeTab={tab}
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
                <ProjectGrid activeTab={tab} />
              )}
            </div>
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
