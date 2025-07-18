import { socials } from '@/constants/constants';
import { useState } from 'react';

export default function SocialsApp() {
  const [selectedSocial, setSelectedSocial] = useState(-1);
  const handleSocialClick = (index: number) => {
    if (selectedSocial === index) {
      setSelectedSocial(-1);
    } else {
      setSelectedSocial(index);
    }
  };
  const handleDoubleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div onClick={() => setSelectedSocial(-1)} className='h-[320px] w-[600px]'>
      <div className='flex gap-8 text-gray-400 text-sm p-4'>
        {socials.map((el, i) => {
          return (
            <div
              key={el.img}
              className={`${selectedSocial === i ? 'bg-blue-600/10 outline outline-white/20' : ''}
                  p-1 py-2 flex flex-col items-center gap-2 cursor-pointer w-20`}
              onClick={(e) => {
                e.stopPropagation();
                handleSocialClick(i);
              }}
              onDoubleClick={() => handleDoubleClick(el.link)}
            >
              <div className='bg-[var(--text-primary)] w-12 h-12 rounded-md p-1'>
                <img
                  alt={`Social ${i + 1}`}
                  src={el.img}
                  className='w-10 h-10 object-contain'
                />
              </div>
              <span className='text-[var(--text-secondary)]'>{el.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
