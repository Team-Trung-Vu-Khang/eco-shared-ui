import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AutoCompleteSelect } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Settings2, Download, X } from "lucide-react";
import type { TableControllerReturn } from "./useTableController";

interface TableToolbarProps<T extends { id: string | number }> {
  controller: TableControllerReturn<T>;
}

export function TableToolbar<T extends { id: string | number }>({
  controller,
}: TableToolbarProps<T>) {
  const {
    searchable,
    searchPlaceholder,
    search,
    handleSearchChange,
    filterable,
    filters,
    activeFilters,
    handleFilterChange,
    clearFilters,
    columnToggleable,
    downloadable,
    columns,
    visibleColumns,
    setVisibleColumns,
  } = controller;

  const showFilter = filterable && filters.length > 0;
  const showToolbar =
    searchable || showFilter || columnToggleable || downloadable;

  if (!showToolbar && Object.keys(activeFilters).length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {showToolbar && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            {searchable && (
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-10 border-muted-foreground/20 focus:ring-primary/20"
                  data-testid="table-search"
                />
              </div>
            )}

            {showFilter && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 border-muted-foreground/20 gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Bộ lọc</span>
                    {Object.keys(activeFilters).length > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 h-5 px-1.5 bg-primary/10 text-primary"
                      >
                        {Object.keys(activeFilters).length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2">
                  <DropdownMenuLabel>Lọc theo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {filters.map((filter) => (
                    <div key={filter.key} className="px-2 py-1.5 space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground">
                        {filter.label}
                      </p>
                      <AutoCompleteSelect
                        options={[
                          { label: "Tất cả", value: "all" },
                          ...filter.options,
                        ]}
                        value={activeFilters[filter.key] || "all"}
                        onChange={(val) => handleFilterChange(filter.key, val)}
                        placeholder="Tất cả"
                        searchPlaceholder="Tìm kiếm..."
                        clearable={false}
                        autocomplete={filter.options.length > 10}
                        className="h-8 min-h-8 w-full max-w-[250px] px-2 text-xs"
                      />
                    </div>
                  ))}
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={clearFilters}
                  >
                    <X className="w-3 h-3 mr-2" />
                    Xóa bộ lọc
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {(columnToggleable || downloadable) && (
            <div className="flex items-center gap-2">
              {columnToggleable && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 border-muted-foreground/20"
                    >
                      <Settings2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Hiển thị cột</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {columns.map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.key}
                        checked={visibleColumns.has(column.key)}
                        onCheckedChange={(checked) => {
                          const next = new Set(visibleColumns);
                          if (checked) next.add(column.key);
                          else next.delete(column.key);
                          setVisibleColumns(next);
                        }}
                      >
                        {column.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {downloadable && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-muted-foreground/20"
                >
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-muted-foreground">
            Đang lọc theo:
          </span>
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || value === "all") return null;
            const filterDef = filters.find((f) => f.key === key);
            const label =
              filterDef?.options.find((o) => o.value === value)?.label || value;
            return (
              <Badge
                key={key}
                variant="secondary"
                className="gap-1 pr-1 bg-muted"
              >
                {filterDef?.label}: {label}
                <button
                  type="button"
                  onClick={() => handleFilterChange(key, "all")}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
