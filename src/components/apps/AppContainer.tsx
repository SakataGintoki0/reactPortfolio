import React, { useRef } from 'react';
import { useAppStore } from '../../store/appStore.ts';
import Draggable from 'react-draggable';
import AppFooter from './AppFooter.tsx';
import { Button } from '../ui/button.tsx';
import { X } from 'lucide-react';

export default function AppContainer({
  app,
  children,
}: {
  app: any; // tofix
  children: React.ReactNode;
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const closeApp = useAppStore((state) => state.closeApp);
  const setActiveApp = useAppStore((state) => state.setActiveApp);
  const activeApp = useAppStore((state) => state.activeApp);
  const updateAppPosition = useAppStore((state) => state.updateAppPosition);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeApp(app.name);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only set active on click if it's not a drag operation
    if (!e.defaultPrevented) {
      setActiveApp(app);
    }
  };

  const handleDragStop = (e: any, data: any) => {
    updateAppPosition(app.id, { x: data.x, y: data.y });
  };

  const isActive = activeApp && app.id === activeApp.id;

  return (
    <Draggable
      bounds='parent'
      handle='.drag-handle'
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      position={app.position}
      onStart={() => {
        // Use setTimeout to defer the state change slightly
        setTimeout(() => setActiveApp(app), 0);
      }}
      onStop={handleDragStop}
    >
      <div
        ref={nodeRef}
        className={`
          border w-[600px] h-[400px] absolute
          rounded-md overflow-hidden bg-[var(--window-bg)]
          ${isActive ? 'border-[var(--border-focus)]' : 'border-[var(--border-light)]'}
        `}
        style={{
          zIndex: app.zIndex, // Use the app's zIndex property
        }}
        onClick={handleClick}
      >
        <div className='flex justify-between items-center bg-[var(--panel-bg)] p-[10px] px-4 text-[var(--text-secondary)] cursor-move drag-handle'>
          <div className='flex-1 text-xs'>{app.name}</div>
          <div className='flex gap-2'>
            <span></span>
            <Button
              onClick={(e: React.MouseEvent) => handleClose(e)}
              variant={'destructive'}
              size={'icon'}
              className='cursor-pointer hover:text-text-primary'
            >
              <X size={16} />
            </Button>
          </div>
        </div>
        <div className='h-[320px]'>{children}</div>
        <AppFooter app={app} />
      </div>
    </Draggable>
  );
}
