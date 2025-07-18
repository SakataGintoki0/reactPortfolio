import { useEffect, useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import {
  editOptions,
  undoOptions,
  otherOptions,
  linkOption,
} from "@/constants/tiptapConstants";
import { HeadingDropdown } from "./HeadingDropdown";
import { ListDropdown } from "./ListDropdown";
import { AlignDropdown } from "./AlignDropdown";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { OtherDropdown } from "./OtherDropdown";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [editLinkOpen, setEditLinkOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [, setEditorState] = useState(0); // Add this line

  useEffect(() => {
    if (!editor) return;
    const update = () => setEditorState((s) => s + 1);
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const handleSaveUrl = () => {
    if (url === null || url === undefined) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      setEditLinkOpen(false);
      return;
    }

    const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;

    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: urlWithProtocol })
        .run();
      setEditLinkOpen(false);
    } catch (error: any) {
      console.error("Error setting link:", error);
      alert(error.message);
    }
  };

  const handleUnsetLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editor?.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setEditLinkOpen(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full absolute top-0 control-group p-4 border-y border-[var(--border-light)] bg-[var(--panel-bg)] z-[10]">
      <div className="span-group flex flex-wrap gap-4 items-center">
        {undoOptions.map((el) => (
          <span
            key={el.name}
            onClick={() => el.handleClick(editor)}
            className="hover:bg-[var(--paint-buttonBg)] p-1 rounded cursor-pointer"
          >
            <el.icon
              color={
                el.isActive(editor)
                  ? "var(--icon-secondary)"
                  : "var(--icon-primary)"
              }
            />
          </span>
        ))}

        <div className="w-[1px] h-8 bg-[var(--border-light)] rounded-full"></div>

        <AlignDropdown editor={editor} />
        <HeadingDropdown editor={editor} />
        <ListDropdown editor={editor} />

        <div className="w-[1px] h-8 bg-[var(--border-light)] rounded-full"></div>

        {editOptions.map((el) => (
          <span
            key={el.name}
            onClick={() => el.handleClick(editor)}
            className="hover:bg-[var(--paint-buttonBg)] p-1 rounded cursor-pointer"
          >
            <el.icon
              height="24"
              width="24"
              color={
                el.isActive(editor)
                  ? "var(--icon-secondary)"
                  : "var(--icon-primary)"
              }
            />
          </span>
        ))}

        <Popover open={editLinkOpen} onOpenChange={setEditLinkOpen}>
          <PopoverTrigger asChild>
            <button
              className="hover:bg-[var(--paint-buttonBg)] p-1 rounded cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (editor.isActive("link")) {
                  handleUnsetLink(e);
                } else {
                  setEditLinkOpen(true);
                }
              }}
            >
              <linkOption.icon
                height="24"
                width="24"
                color={
                  linkOption.isActive(editor)
                    ? "var(--icon-secondary)"
                    : "var(--icon-primary)"
                }
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3 z-[100]" side="bottom">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="url-input"
                className="text-[var(--text-secondary)] font-normal"
              >
                URL
                <span className="text-[var(--error)]">*</span>
              </Label>
              <Input
                id="url-input"
                value={url || ""}
                placeholder="Enter the URL"
                className="caret-[var(--icon-secondary)]"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUrl(e.target.value)
                }
              />
              <Button className="w-full" onClick={handleSaveUrl}>
                Save
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <div className="w-[1px] h-8 bg-[var(--border-light)] rounded-full"></div>

        {otherOptions.map((el) => (
          <span
            key={el.name}
            onClick={() => el.handleClick(editor)}
            className="hover:bg-[var(--paint-buttonBg)] p-1 rounded cursor-pointer hidden min-[1340px]:block"
          >
            <el.icon
              height="24"
              width="24"
              color={
                el.isActive(editor)
                  ? "var(--icon-secondary)"
                  : "var(--icon-primary)"
              }
            />
          </span>
        ))}
        <div className="block  min-[1340px]:hidden">
          <OtherDropdown editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
