import ImageViewer from "./parts/ImageViewerApp";
import WallpapersApp from "./parts/WallpapersApp";
import PaintApp from "./parts/PaintApp";
import SocialsApp from "./parts/SocialsApp";
import BrowserApp from "./parts/BrowserApp";
import PdfViewer from "./parts/PdfViewer";
import Editor from "./parts/Editor";

export default function AppDisplay({ name }: { name: string }) {
  if (name === "Wallpapers") return <WallpapersApp />;
  if (name === "Image Viewer") return <ImageViewer />;
  if (name === "Paint") return <PaintApp />;
  if (name === "Editor") return <Editor />;
  if (name === "Socials") return <SocialsApp />;
  if (name === "Browser") return <BrowserApp />;
  if (name === "resume.pdf") return <PdfViewer />;
  return (
    <div className="w-[600px] h-[320px] p-4 text-[var(--text-muted)] text-sm">
      Nothing to show here
    </div>
  );
}
