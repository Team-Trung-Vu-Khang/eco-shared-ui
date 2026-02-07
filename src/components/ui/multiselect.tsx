import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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

export type MultiSelectOption = {
  label: string;
  value: string;
  keywords?: string[];
};

type Props = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  searchPlaceholder = "Tìm kiếm...",
  emptyText = "Không có dữ liệu",
  disabled,
  clearable = false,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter((x) => x !== v));
    else onChange([...value, v]);
  };

  const remove = (v: string) => onChange(value.filter((x) => x !== v));

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

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
            "w-full justify-between min-h-9 px-3 py-1 group",
            "text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-md border border-input bg-transparent focus-visible:ring-2 focus-visible:ring-offset-0",
          )}
        >
          <div className="flex flex-wrap gap-2 items-center text-left">
            {value.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              value.map((v) => {
                const label = options.find((o) => o.value === v)?.label ?? v;
                return (
                  <Badge
                    key={v}
                    variant="secondary"
                    className="rounded-full gap-2"
                  >
                    {label}
                    <span
                      role="button"
                      tabIndex={0}
                      className="opacity-70 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(v);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          remove(v);
                        }
                      }}
                      aria-label={`Xoá ${label}`}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                );
              })
            )}
          </div>

          <div className="flex items-center ml-2 shrink-0">
            {clearable && value.length > 0 && !disabled && (
              <div
                role="button"
                onClick={handleClear}
                className="mr-2 rounded-full p-0.5 hover:bg-muted opacity-60 hover:opacity-100 transition-all cursor-pointer hidden group-hover:block"
              >
                <X className="h-3 w-3" />
              </div>
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-70" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "p-0",
          // match trigger width
          "w-[--radix-popover-trigger-width]",
        )}
      >
        <Command filter={commandFilter}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const selected = value.includes(opt.value);
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.label}
                    keywords={[opt.value, ...(opt.keywords || [])]}
                    onSelect={() => toggle(opt.value)}
                    className="flex items-center gap-3 py-3"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span>{opt.label}</span>
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
