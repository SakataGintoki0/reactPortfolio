import { wallpapers } from '../../../constants/constants';
import { useAppearancesStore } from '../../../store/appearancesStore';
import { useAppStore } from '../../../store/appStore';
import { useImageStore } from '../../../store/imageStore';
import React from 'react';

export default function WallpapersApp() {
  const selectedBg = useAppearancesStore((state) => state.selectedBg);
  const setSelectedBg = useAppearancesStore((state) => state.setSelectedBg);
  const openApp = useAppStore((state) => state.openApp);
  const setActiveImage = useImageStore((state) => state.setActiveImage);
  const setAllImages = useImageStore((state) => state.setAllImages);

  const handleWallpaperClick = (index: number) => {
    if (selectedBg === index) {
      setSelectedBg(-1);
    } else {
      setSelectedBg(index);
    }
  };

  const viewImage = (imageIndex: number, allImages: string[]) => {
    setActiveImage(imageIndex);
    setAllImages(allImages);
    setSelectedBg(imageIndex);
    openApp('Image Viewer');
  };

  return (
    <div onClick={() => setSelectedBg(-1)} className='h-full'>
      <div className='flex gap-8 text-gray-400 text-sm p-4'>
        {wallpapers.map((el, i) => {
          return (
            <div
              key={el.img}
              className={`${selectedBg === i ? 'bg-blue-600/10 outline outline-white/20' : ''}
                  p-1 py-2 flex flex-col items-center gap-1 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                handleWallpaperClick(i);
              }}
              onDoubleClick={() =>
                viewImage(
                  i,
                  wallpapers.map((image) => image.img)
                )
              }
            >
              <img
                alt={`Wallpaper ${i + 1}`}
                src={el.img}
                className='w-20 h-12 object-contain'
              />
              <span>{`Wallpaper ${i + 1}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
