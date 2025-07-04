import Container from './components/container/Container';
import { useEffect } from 'react';
import React from 'react';

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
    <div className='h-screen w-full overflow-hidden'>
      <Container />
    </div>
  );
}

export default App;
