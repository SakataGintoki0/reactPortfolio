import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./Menubar";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";

const extensions = [
  Highlight.configure({
    multicolor: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "Enter a heading...";
      }
      return "Start typing here...";
    },
    // considerAnyAsEmpty: false,
    showOnlyWhenEditable: true,
    showOnlyCurrent: true,
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    defaultAlignment: "left",
  }),
  Code,
  Superscript,
  Subscript,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "text-left", // default if you want
      },
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const TipTap = ({
  content,
  isEditable = true,
}: {
  content: string;
  isEditable?: boolean;
}) => {
  return (
    <EditorProvider
      slotBefore={isEditable ? <MenuBar /> : <></>}
      extensions={extensions}
      editable={isEditable}
      content={content}
    ></EditorProvider>
  );
};

export default TipTap;
