'use client';

import { useState, useEffect } from 'react';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import ProjectGrid from '@/components/ProjectGrid';
import CursorLabel from '@/components/CursorLabel';
import SiteFooter from '@/components/SiteFooter';

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
      <div style={{ position: 'relative', marginTop: '12px' }}>
        <FileTabNav activeTab={activeTab} onTabChange={setActiveTab} />
        <FileContainer>
          <ProjectGrid onProjectHover={setHovered} activeTab={activeTab} />
        </FileContainer>
      </div>
      <SiteFooter />
      <CursorLabel visible={hovered} x={mousePos.x} y={mousePos.y} />
    </DesktopSurface>
  );
}
