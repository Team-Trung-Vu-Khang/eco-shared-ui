import { useState, type KeyboardEvent } from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import type { AutoCompleteOption } from "./select";

export type RemoteAutoCompleteSelectProps = {
  options: AutoCompleteOption[];
  value?: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
};

export function RemoteAutoCompleteSelect({
  options,
  value,
  onChange,
  onSearch,
  placeholder = "Chọn...",
  searchPlaceholder = "Tìm kiếm...",
  emptyText = "Không có dữ liệu",
  disabled,
  loading,
  clearable = true,
}: RemoteAutoCompleteSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = options.find((option) => option.value === value);

  const handleSearch = (nextSearch: string) => {
    setSearch(nextSearch);
    onSearch(nextSearch);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setSearch("");
  };

  const handleClear = () => {
    onChange("");
    onSearch("");
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "h-9 w-full justify-between px-3 text-sm font-normal shadow-sm",
            !value && "text-muted-foreground",
          )}
        >
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <span className="flex items-center">
            {clearable && value && !disabled ? (
              <span
                role="button"
                tabIndex={0}
                aria-label="Xóa lựa chọn"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClear();
                }}
                onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleClear();
                  }
                }}
                className="mr-2 rounded-full p-0.5 opacity-60 hover:bg-muted hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </span>
            ) : null}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0 z-[9999]"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={handleSearch}
          />
          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang tìm...
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyText}</CommandEmpty>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onChange(option.value === value ? "" : option.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
