"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { headingOptions } from "@/constants/tiptapConstants";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  editor: any;
};

export function HeadingDropdown({ editor }: Props) {
  const [open, setOpen] = useState(false);
  const current =
    headingOptions.find((option) => option.isActive(editor)) ||
    headingOptions[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {current ? (
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
        ) : (
          "Heading"
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" side="bottom" align="start">
        {headingOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => option.handleClick(editor)}
            disabled={option.isActive(editor)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <option.icon className="w-6 h-6" />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
