import { useState } from 'react';
import Directory from './Directory';

const direoctoriesData = [
  { id: 0, name: 'Projects', imgUrl: '/icons/folder.svg' },
  { id: 1, name: 'Wallpapers', imgUrl: '/icons/folder.svg' },
  { id: 2, name: 'Socials', imgUrl: '/icons/folder.svg' },
];

export default function Directories() {
  const [selected, setSelected] = useState<string>('');

  const handleSelected = (name: string) => {
    setSelected(name);
  };

  const removeSelection = () => {
    setSelected('');
  };

  return (
    <div className="h-full w-full p-2 flex flex-col gap-3">
      {direoctoriesData.map((el) => {
        return (
          <Directory
            name={el.name}
            key={el.id}
            imgUrl={el.imgUrl}
            selected={selected}
            handleSelected={handleSelected}
            removeSelection={removeSelection}
          />
        );
      })}
    </div>
  );
}
