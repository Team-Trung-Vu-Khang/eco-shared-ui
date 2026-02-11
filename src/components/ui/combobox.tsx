"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ComboboxOption = {
  label: string;
  value: string;
  image?: string;
};

type Props = {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
};

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  searchPlaceholder = "Tìm kiếm...",
  emptyText = "Không có dữ liệu",
  disabled,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  // Vietnamese accent-insensitive filter
  const commandFilter = (
    value: string,
    search: string,
    keywords?: string[],
  ) => {
    const extendValue = (
      value +
      " " +
      (keywords?.join(" ") || "")
    ).toLowerCase();
    if (extendValue.includes(search.toLowerCase())) return 1;

    const normalize = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();

    const normalizedValue = normalize(extendValue);
    const normalizedSearch = normalize(search);

    if (normalizedValue.includes(normalizedSearch)) return 1;
    return 0;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between min-h-9 px-3 py-1",
            "text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-md border border-input bg-transparent focus-visible:ring-2 focus-visible:ring-offset-0",
            className,
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {selectedOption?.image && (
              <Avatar className="size-5 shrink-0">
                <AvatarImage
                  className="object-contain"
                  src={selectedOption.image}
                />
                <AvatarFallback>
                  {selectedOption.label.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn("p-0", "w-[--radix-popover-trigger-width]")}
      >
        <Command filter={commandFilter}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onChange(isSelected ? "" : opt.value);
                      setOpen(false);
                    }}
                    keywords={[opt.label, opt.value]}
                    className="flex items-center gap-3 py-3"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {opt.image && (
                      <Avatar className="size-5 shrink-0">
                        <AvatarImage
                          src={opt.image}
                          className="rounded-none object-contain"
                        />
                        <AvatarFallback>{opt.label.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <span className="truncate">{opt.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
