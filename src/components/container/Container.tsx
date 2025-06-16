import Directories from '../directories/Directories';

const wallpapers = [
  { img: '/wallpapers/1.jpg' },
  { img: '/wallpapers/2.jpg' },
  { img: '/wallpapers/3.jpg' },
  { img: '/wallpapers/4.jpg' },
];

export default function Container() {
  return (
    <div
      style={{
        backgroundImage: `url(${wallpapers[0].img})`,
      }}
      className={`h-screen w-full bg-cover bg-center`}
    >
      <Directories />
    </div>
  );
}
