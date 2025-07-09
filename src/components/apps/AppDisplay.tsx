import ImageViewer from './parts/ImageViewerApp';
import WallpapersApp from './parts/WallpapersApp';
import PaintApp from './parts/PaintApp';
import SocialsApp from './parts/SocialsApp';
import React from 'react';

export default function AppDisplay({ name }: { name: string }) {
  if (name === 'Wallpapers') return <WallpapersApp />;
  if (name === 'Image Viewer') return <ImageViewer />;
  if (name === 'Paint') return <PaintApp />;
  if (name === 'Socials') return <SocialsApp />;
  return (
    <div className='p-4 text-[var(--text-muted)] text-sm'>
      Nothing to show here
    </div>
  );
}
