import {
  Edit2Icon,
  RectangleHorizontal,
  Eraser,
  Circle,
  Slash,
} from 'lucide-react';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '../../ui/button';

type DrawMode = 'draw' | 'rect' | 'erase' | 'ellipse' | 'line';
interface Point {
  x: number;
  y: number;
}

export default function PaintApp() {
  const [mode, setMode] = useState<DrawMode>('draw');
  const [strokeSize, setStrokeSize] = useState<number>(3);
  return (
    <div className='flex flex-row h-[500px] w-[700px]'>
      <div className='w-[90px]'>
        <SideBar
          mode={mode}
          setMode={setMode}
          strokeSize={strokeSize}
          setStrokeSize={setStrokeSize}
        />
      </div>
      <div className='flex-1 h-full w-full bg-[#fff]'>
        <Canvas mode={mode} strokeSize={strokeSize} />
      </div>
    </div>
  );
}

interface SidebarDataType {
  name: string;
  value: DrawMode;
  icon: any;
}

const sidebarData: SidebarDataType[] = [
  { name: 'Draw', value: 'draw', icon: Edit2Icon },
  { name: 'Rect', value: 'rect', icon: RectangleHorizontal },
  { name: 'Ellipse', value: 'ellipse', icon: Circle },
  { name: 'Line', value: 'line', icon: Slash },
  { name: 'Erase', value: 'erase', icon: Eraser },
];

function SideBar({
  setMode,
  strokeSize,
  setStrokeSize,
  mode,
}: {
  setMode: Dispatch<SetStateAction<DrawMode>>;
  strokeSize: number;
  setStrokeSize: Dispatch<SetStateAction<number>>;
  mode: DrawMode;
}) {
  return (
    <div className='w-[80px] m-auto h-full pt-2 flex flex-col justify-between items-center'>
      <div className='w-fit flex flex-wrap gap-1 mx-auto'>
        {sidebarData.map((el) => {
          return (
            <Button
              key={el.name}
              variant={'paintIcon'}
              size={'sm'}
              className={`${mode === el.value ? '!bg-[var(--paint-buttonBgHover)]' : ''}`}
              onClick={() => setMode(el.value)}
            >
              <el.icon color={'var(--text-muted)'} />
            </Button>
          );
        })}
      </div>
      <div className='flex flex-col items-start w-full gap-1 mb-2 px-1'>
        <div className='flex justify-between items-center w-full'>
          <label
            htmlFor='stroke-size-slider'
            className='text-xs text-[var(--text-primary)]'
          >
            Size:
          </label>
          <span className='text-xs text-[var(--text-muted)]'>
            {strokeSize}px
          </span>
        </div>
        <input
          id='stroke-size-slider'
          type='range'
          min={1}
          max={32}
          value={strokeSize}
          onChange={(e) => setStrokeSize(Number(e.target.value))}
          className='w-full cursor-[ew-resize] accent-[var(--text-muted)]'
        />
      </div>
    </div>
  );
}

function Canvas({ mode, strokeSize }: { mode: DrawMode; strokeSize: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 610;
    canvas.height = 500;
    const context = canvas.getContext('2d');

    if (context) {
      context.lineCap = 'round';
      context.strokeStyle = '#000';
      context.lineWidth = 3;
      setCtx(context);
    }
  }, []);

  useEffect(() => {
    if (!ctx) return;
    if (mode === 'erase') {
      ctx.strokeStyle = '#fff'; // Erase with white (background color)
      ctx.lineWidth = strokeSize * 3; // Eraser is thicker
    } else {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = strokeSize;
    }
  }, [mode, ctx, strokeSize]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!ctx) return;

    const { x, y } = getMousePos(e);
    if (mode === 'draw' || mode === 'erase') {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    } else if (mode === 'rect' || mode === 'ellipse' || mode === 'line') {
      setStartPoint({ x, y });
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (canvas) {
        setImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing || !ctx) return;

    const { x, y } = getMousePos(e);
    if (mode === 'draw' || mode === 'erase') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (
      (mode === 'rect' || mode === 'ellipse' || mode === 'line') &&
      imageData
    ) {
      ctx.putImageData(imageData, 0, 0);
      const width = x - startPoint.x;
      const height = y - startPoint.y;
      if (mode === 'rect') {
        ctx.strokeRect(startPoint.x, startPoint.y, width, height);
      } else if (mode === 'ellipse') {
        ctx.beginPath();
        ctx.ellipse(
          startPoint.x + width / 2,
          startPoint.y + height / 2,
          Math.abs(width / 2),
          Math.abs(height / 2),
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      } else if (mode === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing || !ctx) return;

    const { x, y } = getMousePos(e);
    if (
      (mode === 'rect' || mode === 'ellipse' || mode === 'line') &&
      imageData
    ) {
      const width = x - startPoint.x;
      const height = y - startPoint.y;
      ctx.putImageData(imageData, 0, 0);
      if (mode === 'rect') {
        ctx.strokeRect(startPoint.x, startPoint.y, width, height);
      } else if (mode === 'ellipse') {
        ctx.beginPath();
        ctx.ellipse(
          startPoint.x + width / 2,
          startPoint.y + height / 2,
          Math.abs(width / 2),
          Math.abs(height / 2),
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      } else if (mode === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
    ctx.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        cursor: mode === 'erase' ? 'cell' : 'crosshair',
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
}
