import { useAppearancesStore } from '../../store/appearancesStore';
import React from 'react';

export default function AppFooter({ app }: { app: any }) {
  const selectedBg = useAppearancesStore((state) => state.selectedBg);
  const setBg = useAppearancesStore((state) => state.setBg);
  return (
    <div className='h-10 w-full rounded-b flex items-center justify-end gap-2 bg-[var(--panel-bg)] px-4'>
      {selectedBg >= 0 &&
        (app.name === 'Wallpapers' || app.name === 'Image Viewer') && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setBg(selectedBg);
            }}
            className='text-[var(--text-secondary)] hover:text-[var(--text-muted)] text-sm cursor-pointer'
          >
            Set as desktop background
          </span>
        )}
    </div>
  );
}
