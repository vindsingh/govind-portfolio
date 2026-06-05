'use client';

import { useState, useEffect } from 'react';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import ProjectGrid from '@/components/ProjectGrid';
import CursorLabel from '@/components/CursorLabel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'work' | 'about' | 'experience'
  >('all');
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <DesktopSurface>
      <SiteHeader />
      <FileContainer>
        <FileTabNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Spacer between tab nav and grid */}
        <div style={{ marginTop: '24px' }}>
          <ProjectGrid onProjectHover={setHovered} activeTab={activeTab} />
        </div>
      </FileContainer>
      <CursorLabel visible={hovered} x={mousePos.x} y={mousePos.y} />
    </DesktopSurface>
  );
}
