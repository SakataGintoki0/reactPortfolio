import ImageViewer from './parts/ImageViewerApp';
import WallpapersApp from './parts/WallpapersApp';

export default function AppDisplay({ name }: { name: string }) {
  if (name === 'Wallpapers') return <WallpapersApp />;
  if (name === 'Image Viewer') return <ImageViewer />;
  return <div className='p-1'>{name}</div>;
}
