import { wallpapers } from '../../constants/constants';
import { useAppearancesStore } from '../../store/appearancesStore';
import AppList from '../apps/AppList';
import Directories from '../directories/Directories';
import React from 'react';

export default function Container() {
  const bg = useAppearancesStore((state) => state.bg);
  return (
    <div
      style={{
        backgroundImage: `url(${wallpapers[bg].img})`,
      }}
      className={`h-screen w-full relative bg-cover bg-center overflow-none`}
    >
      <AppList />
      <Directories />
    </div>
  );
}
