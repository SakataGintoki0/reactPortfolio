import { useAppearancesStore } from '../../../store/appearancesStore';
import { useImageStore } from '../../../store/imageStore';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function ImageViewer() {
  const activeImageIndex = useImageStore((state) => state.activeImageIndex);
  const setActiveImage = useImageStore((state) => state.setActiveImage);
  const allImages = useImageStore((state) => state.allImages);
  const setSelectedBg = useAppearancesStore((state) => state.setSelectedBg);

  const onImageChange = (dir: 'left' | 'right') => {
    if (dir === 'left') {
      setActiveImage(
        (activeImageIndex - 1 + allImages.length) % allImages.length
      );
      setSelectedBg(
        (activeImageIndex - 1 + allImages.length) % allImages.length
      );
    } else {
      setActiveImage((activeImageIndex + 1) % allImages.length);
      setSelectedBg((activeImageIndex + 1) % allImages.length);
    }
  };

  return (
    <div className='h-[316px] w-[600px] bg-black/50 relative'>
      <img
        src={allImages[activeImageIndex]}
        alt={'Image Viewer'}
        className='w-full h-full object-contain object-center'
      />
      <ChevronLeft
        onClick={() => onImageChange('left')}
        className='absolute top-[calc(50%-24px)] left-2 text-white h-12 w-12 cursor-pointer shadow-xl'
      />
      <ChevronRight
        onClick={() => onImageChange('right')}
        className='absolute top-[calc(50%-24px)] right-2 text-white h-12 w-12 cursor-pointer shadow-xl'
      />
    </div>
  );
}
