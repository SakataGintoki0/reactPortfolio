import { EllipsisVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { otherOptions } from "@/constants/tiptapConstants";
import { useState } from "react";

type Props = {
  editor: any;
};

export function OtherDropdown({ editor }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={`${
            open ? "bg-[var(--paint-buttonBg)]" : ""
          } cursor-pointer flex items-center hover:bg-[var(--paint-buttonBg)] p-1 rounded`}
        >
          <EllipsisVertical color="var(--icon-primary)" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" side="bottom" align="start">
        {otherOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => option.handleClick(editor)}
            // disabled={option.isActive(editor)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <option.icon
              className="w-6 h-6"
              color={
                option.isActive(editor)
                  ? "var(--icon-secondary)"
                  : "var(--icon-primary)"
              }
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
