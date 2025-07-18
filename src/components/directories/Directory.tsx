import { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useAppStore } from "../../store/appStore.ts";

export default function Directory({
  name,
  imgUrl,
}: {
  name: string;
  imgUrl: string;
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const selectedDir = useAppStore((state) => state.selectedDir);
  const handleSelected = useAppStore((state) => state.setSelectedDir);
  const removeSelection = useAppStore((state) => state.removeSelectedDir);
  const openApp = useAppStore((state) => state.openApp);

  const handleMouseDown = () => {};

  const handleDoubleClick = () => {
    openApp(name);
  };

  const handleLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDir === name) {
      removeSelection();
    } else {
      handleSelected(name);
    }
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("right click");
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        removeSelection();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
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
        onDoubleClick={handleDoubleClick}
        className={
          selectedDir.includes(name)
            ? "flex flex-col gap-[4px] items-center justify-center w-20 p-[3px] py-[7px] bg-blue-600/10 border border-white/20 cursor-pointer"
            : "flex flex-col gap-[4px] items-center justify-center w-20 p-1 py-2 cursor-pointer"
        }
      >
        <img
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          src={imgUrl}
          className="w-10 h-10"
        />
        <span className="text-white text-xs">{name}</span>
      </div>
    </Draggable>
  );
}
