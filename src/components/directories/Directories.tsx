import Directory from "./Directory";
const direoctoriesData = [
  { id: 0, name: "Projects", imgUrl: "/icons/folder.svg" },
  { id: 1, name: "Wallpapers", imgUrl: "/icons/folder.svg" },
  { id: 2, name: "Socials", imgUrl: "/icons/folder.svg" },
  { id: 3, name: "Editor", imgUrl: "/icons/folder.svg" },
  { id: 4, name: "Paint", imgUrl: "/icons/folder.svg" },
  { id: 5, name: "Browser", imgUrl: "/icons/folder.svg" },
  { id: 6, name: "resume.pdf", imgUrl: "/icons/folder.svg" },
];

export default function Directories() {
  return (
    <div className="h-full w-full p-2 flex flex-col gap-3 absolute top-0 left-0">
      {direoctoriesData.map((el) => {
        return <Directory name={el.name} key={el.id} imgUrl={el.imgUrl} />;
      })}
    </div>
  );
}
