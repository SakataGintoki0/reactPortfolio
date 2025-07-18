import {
  BoldIcon,
  // AddImageIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CodeIcon,
  CodeBlockIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  H4Icon,
  HighlightIcon,
  ItalicIcon,
  LinkIcon,
  OlIcon,
  ParagraphIcon,
  RedoIcon,
  StrikeIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UlIcon,
  UnderlineIcon,
  UndoIcon,
} from "../components/icons";

export const editOptions = [
  {
    name: "bold",
    icon: BoldIcon,
    isActive: (editor: any) => editor.isActive("bold"),
    handleClick: (editor: any) => editor.chain().focus().toggleBold().run(),
    disabled: (editor: any) => !editor.can().chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    icon: ItalicIcon,
    isActive: (editor: any) => editor.isActive("italic"),
    handleClick: (editor: any) => editor.chain().focus().toggleItalic().run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleItalic().run(),
  },
  {
    name: "underline",
    icon: UnderlineIcon,
    isActive: (editor: any) => editor.isActive("underline"),
    handleClick: (editor: any) =>
      editor.chain().focus().toggleUnderline().run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleUnderline().run(),
  },
  {
    name: "strike",
    icon: StrikeIcon,
    isActive: (editor: any) => editor.isActive("strike"),
    handleClick: (editor: any) => editor.chain().focus().toggleStrike().run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleStrike().run(),
  },
  {
    name: "highlight",
    icon: HighlightIcon,
    isActive: (editor: any) =>
      editor.isActive("highlight", { color: "#fef08a" }), // light yellow, example
    handleClick: (editor: any) =>
      editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleHighlight({ color: "#fef08a" }).run(),
  },
];

export const linkOption = {
  name: "link",
  icon: LinkIcon,
  isActive: (editor: any) => editor.isActive("link"),
  handleClick: () => {},
  disabled: () => false,
};

export const undoOptions = [
  {
    name: "undo",
    icon: UndoIcon,
    isActive: (editor: any) => editor.isActive("undo"),
    handleClick: (editor: any) => editor.chain().focus().undo().run(),
    disabled: (editor: any) => !editor.can().chain().focus().undo().run(),
  },
  {
    name: "redo",
    icon: RedoIcon,
    isActive: (editor: any) => editor.isActive("redo"),
    handleClick: (editor: any) => editor.chain().focus().redo().run(),
    disabled: (editor: any) => !editor.can().chain().focus().redo().run(),
  },
];

export const alignOptions = [
  {
    name: "left",
    icon: AlignLeftIcon,
    isActive: (editor: any) => editor.isActive({ textAlign: "left" }),
    handleClick: (editor: any) =>
      editor.chain().focus().setTextAlign("left").run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().setTextAlign("left").run(),
  },
  {
    name: "center",
    icon: AlignCenterIcon,
    isActive: (editor: any) => editor.isActive({ textAlign: "center" }),
    handleClick: (editor: any) =>
      editor.chain().focus().setTextAlign("center").run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().setTextAlign("center").run(),
  },
  {
    name: "right",
    icon: AlignRightIcon,
    isActive: (editor: any) => editor.isActive({ textAlign: "right" }),
    handleClick: (editor: any) =>
      editor.chain().focus().setTextAlign("right").run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().setTextAlign("right").run(),
  },
  {
    name: "justify",
    icon: AlignJustifyIcon,
    isActive: (editor: any) => editor.isActive({ textAlign: "justify" }),
    handleClick: (editor: any) =>
      editor.chain().focus().setTextAlign("justify").run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().setTextAlign("justify").run(),
  },
];

const headingLevels = [1, 2, 3, 4];
const headingIcons = [H1Icon, H2Icon, H3Icon, H4Icon];

export const headingOptions = [
  {
    label: "Normal",
    name: "paragraph",
    icon: ParagraphIcon,
    isActive: (editor: any) => editor.isActive("paragraph"),
    handleClick: (editor: any) => editor.chain().focus().setParagraph().run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().setParagraph().run(),
  },
  ...headingLevels.map((level, i) => ({
    name: `h${level}`,
    label: `Heading ${level}`,
    icon: headingIcons[i],
    isActive: (editor: any) => editor.isActive("heading", { level }),
    handleClick: (editor: any) =>
      editor.chain().focus().toggleHeading({ level }).run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleHeading({ level }).run(),
  })),
];

export const listOptions = [
  {
    name: "bulletList",
    icon: UlIcon,
    label: "Bullet list",
    isActive: (editor: any) => editor.isActive("bulletList"),
    handleClick: (editor: any) => {
      if (editor.isActive("bulletList")) {
        editor.chain().focus().toggleBulletList().run();
      } else {
        editor.chain().focus().toggleBulletList().run();
      }
    },
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleBulletList().run(),
  },
  {
    name: "orderedList",
    icon: OlIcon,
    label: "Ordered list",
    isActive: (editor: any) => editor.isActive("orderedList"),
    handleClick: (editor: any) => {
      if (editor.isActive("orderedList")) {
        editor.chain().focus().toggleOrderedList().run();
      } else {
        editor.chain().focus().toggleOrderedList().run();
      }
    },
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleOrderedList().run(),
  },
];

export const otherOptions = [
  {
    name: "blockquote",
    icon: CodeBlockIcon,
    label: "Blockquote",
    isActive: (editor: any) => editor.isActive("blockquote"),
    handleClick: (editor: any) =>
      editor.chain().focus().toggleBlockquote().run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleBlockquote().run(),
  },
  {
    name: "code",
    icon: CodeIcon,
    label: "Code",
    isActive: (editor: any) => editor.isActive("code"),
    handleClick: (editor: any) => editor.chain().focus().toggleCode().run(),
    disabled: (editor: any) => !editor.can().chain().focus().toggleCode().run(),
  },
  {
    name: "superscript",
    icon: SuperscriptIcon,
    label: "Superscript",
    isActive: (editor: any) => editor.isActive("superscript"),
    handleClick: (editor: any) =>
      editor.chain().focus().toggleSuperscript().run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleSuperscript().run(),
  },
  {
    name: "subscript",
    icon: SubscriptIcon,
    label: "Subscript",
    isActive: (editor: any) => editor.isActive("subscript"),
    handleClick: (editor: any) =>
      editor.chain().focus().toggleSubscript().run(),
    disabled: (editor: any) =>
      !editor.can().chain().focus().toggleSubscript().run(),
  },
];
