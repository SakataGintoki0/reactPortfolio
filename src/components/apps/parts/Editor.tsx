import TipTap from "@/components/mdEditor/Tiptap";

export default function Editor() {
  return (
    <div className="prose w-[800px] h-[600px] bg-[var(--text-primary)] relative last:pt-[65px]">
      <TipTap content="" />
    </div>
  );
}
