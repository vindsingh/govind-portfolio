'use client';

import { useState } from 'react';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import ProjectGrid from '@/components/ProjectGrid';

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'work' | 'about' | 'experience'
  >('all');

  return (
    <DesktopSurface>
      <SiteHeader />
      <FileContainer>
        <FileTabNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Spacer between tab nav and grid */}
        <div style={{ marginTop: '24px' }}>
          <ProjectGrid />
        </div>
      </FileContainer>
    </DesktopSurface>
  );
}
