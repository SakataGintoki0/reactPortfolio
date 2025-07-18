export default function PdfViewer() {
  return (
    <div className="w-[800px] h-[700px]">
      <iframe
        src="/pdfs/resume.pdf#zoom=91&navpanes=0"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}
