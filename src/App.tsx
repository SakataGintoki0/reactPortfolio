import Container from './components/container/Container';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const disableRightClick = (event: MouseEvent) => {
      event.preventDefault();
    };

    window.addEventListener('contextmenu', disableRightClick);

    return () => {
      window.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);
  return (
    <div className='h-full w-full'>
      <Container />
    </div>
  );
}

export default App;
