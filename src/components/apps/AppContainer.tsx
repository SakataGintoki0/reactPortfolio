import React, { useRef } from 'react';
import { useAppStore } from '../../store/appStore.ts';
import Draggable from 'react-draggable';

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
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeApp(app.name);
  };

  return (
    <Draggable
      bounds='parent'
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      onDrag={() => setActiveApp(app)}
    >
      <div
        ref={nodeRef}
        className={`z-[${app.id}] border border-gray-600 w-[600px] h-[400px] bg-gray-800/90 absolute z-20 top-[100px] left-[100px] rounded-md overflow-hidden`}
        onClick={() => setActiveApp(app)}
      >
        <div className='flex justify-between bg-gray-700 p-2 px-4 text-gray-400'>
          <span>{app.name}</span>
          <span
            onClick={(e: React.MouseEvent) => handleClose(e)}
            className='cursor-pointer hover:text-gray-300'
          >
            Close
          </span>
        </div>
        <div className='p-4'>{children}</div>
      </div>
    </Draggable>
  );
}
