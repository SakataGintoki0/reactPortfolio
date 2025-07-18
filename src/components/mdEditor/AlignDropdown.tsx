"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { alignOptions } from "../../constants/tiptapConstants";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  editor: any;
};

export function AlignDropdown({ editor }: Props) {
  const [open, setOpen] = useState(false);
  const current =
    alignOptions.find((option) => option.isActive(editor)) || alignOptions[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={`${
            open ? "bg-overlay-5" : ""
          } cursor-pointer flex items-center hover:bg-overlay-5 p-1 rounded`}
        >
          <current.icon
            className="w-6 h-6"
            color={
              current.isActive(editor)
                ? "var(--icon-secondary)"
                : "var(--icon-primary)"
            }
          />
          <ChevronDown color="var(--icon-secondary)" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 " side="bottom" align="start">
        {alignOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => option.handleClick(editor)}
            disabled={option.isActive(editor)}
            className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
          >
            <option.icon className="w-6 h-6" />
            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
