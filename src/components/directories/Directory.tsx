import { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function Directory({
  name,
  imgUrl,
  selected,
  handleSelected,
  removeSelection,
}: {
  name: string;
  imgUrl: string;
  selected: string;
  handleSelected: (name: string) => void;
  removeSelection: () => void;
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = () => {
    // handleSelected(name);
  };

  const handleLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected === name) {
      removeSelection();
    } else {
      handleSelected(name);
    }
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('right click');
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        removeSelection();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      bounds="parent"
      onStart={() => handleMouseDown()}
    >
      <div
        ref={nodeRef}
        onContextMenu={handleRightClick}
        onClick={handleLeftClick}
        className={
          selected.includes(name)
            ? 'flex flex-col gap-[4px] items-center justify-center w-16 p-1 py-2 bg-blue-600/10 border border-white/20'
            : 'flex flex-col gap-[4px] items-center justify-center w-16 p-1 py-2'
        }
      >
        <img src={imgUrl} className="w-10 h-10" />
        <span className="text-white text-xs">{name}</span>
      </div>
    </Draggable>
  );
}
