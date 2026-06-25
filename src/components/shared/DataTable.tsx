import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Loader2,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Download,
  Settings2,
  X,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onSearch?: (value: string) => void;
  onPageSize?: (pageSize: number) => void;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDuplicate?: (row: T) => void;
  onDelete?: (row: T) => void;
  loading?: boolean;
  pageSize?: number;
  totalPages?: number;
  totalElements?: number;
  filters?: {
    key: string;
    label: string;
    options: { label: string; value: string }[];
  }[];
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Tìm kiếm...",
  selectable = false,
  onSearch,
  onPageSize,
  currentIndex,
  onIndexChange,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
  loading = false,
  pageSize = 10,
  totalPages,
  totalElements,
  filters = [],
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [internalCurrentPage, setInternalCurrentPage] = useState(
    currentIndex ?? 1,
  );
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set(),
  );
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((c) => c.key)),
  );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const rowValues = Object.values(row as Record<string, unknown>);

      // Search filter
      const matchesSearch = rowValues.some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      );

      // Advanced filters
      const matchesFilters = Object.entries(activeFilters).every(
        ([key, value]) => {
          if (!value || value === "all") return true;
          return String((row as Record<string, unknown>)[key]) === value;
        },
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, search, activeFilters]);

  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const currentPage = currentIndex ?? internalCurrentPage;

  const updateCurrentPage = (nextPage: number) => {
    const normalizedPage = Math.max(
      1,
      Math.min(nextPage, resolvedTotalPages || 1),
    );
    onIndexChange?.(normalizedPage);
    if (currentIndex === undefined) {
      setInternalCurrentPage(normalizedPage);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearch?.(value);
    updateCurrentPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setRowsPerPage(value);
    onPageSize?.(value);
    updateCurrentPage(1);
  };

  const isManualPagination =
    totalPages !== undefined || totalElements !== undefined;
  const resolvedTotalElements = totalElements ?? filteredData.length;
  const resolvedTotalPages =
    totalPages ?? Math.ceil(resolvedTotalElements / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPaginatedData = isManualPagination
    ? filteredData
    : filteredData.slice(startIndex, startIndex + rowsPerPage);

  const toggleSelectAll = () => {
    if (selectedRows.size === currentPaginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentPaginatedData.map((row) => row.id)));
    }
  };

  const toggleSelect = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const clearFilters = () => {
    setActiveFilters({});
    handleSearchChange("");
  };

  const renderCellValue = (value: unknown) => {
    if (value === null || value === undefined) return null;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value;
    }

    return String(value);
  };

  const visibleColumnCount = columns.filter((c) => visibleColumns.has(c.key)).length;
  const rowSpanCount =
    visibleColumnCount +
    (selectable ? 1 : 0) +
    (onView || onEdit || onDuplicate || onDelete ? 1 : 0);

  return (
    <div className="space-y-4">
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

          {filters.length > 0 && (
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
                    <Select
                      value={activeFilters[filter.key] || "all"}
                      onValueChange={(val) =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          [filter.key]: val,
                        }))
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Tất cả" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        {filter.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

        <div className="flex items-center gap-2">
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

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-muted-foreground/20"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

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
                  onClick={() =>
                    setActiveFilters((prev) => {
                      const next = { ...prev };
                      delete next[key];
                      return next;
                    })
                  }
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      <div
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden min-h-[420px]"
        aria-busy={loading}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
              {selectable && (
                <TableHead className="w-12 px-4">
                  <Checkbox
                    checked={
                      selectedRows.size === currentPaginatedData.length &&
                      currentPaginatedData.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                    data-testid="select-all"
                  />
                </TableHead>
              )}
              {columns
                .filter((c) => visibleColumns.has(c.key))
                .map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      "font-bold text-foreground h-12 px-4 whitespace-nowrap",
                      column.width && `w-[${column.width}]`,
                    )}
                  >
                    {column.label}
                  </TableHead>
                ))}
              {(onView || onEdit || onDuplicate || onDelete) && (
                <TableHead className="px-4 text-center text-xs">
                  Thao tác
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={Math.max(rowSpanCount, 1)} className="p-0">
                  <div className="flex min-h-[420px] items-center justify-center">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Đang tải dữ liệu...</span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : currentPaginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={Math.max(rowSpanCount, 1)}
                  className="h-[420px] text-center"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="w-8 h-8 mb-2 opacity-20" />
                    <p>Không tìm thấy dữ liệu phù hợp</p>
                    <Button
                      variant="link"
                      onClick={clearFilters}
                      className="mt-1 h-auto p-0"
                    >
                      Xóa tất cả bộ lọc
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentPaginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "group transition-all hover:bg-muted/20 border-b border-border last:border-0",
                    selectedRows.has(row.id) &&
                      "bg-primary/5 hover:bg-primary/10",
                  )}
                  data-testid={`row-${row.id}`}
                >
                  {selectable && (
                    <TableCell className="px-4 py-3">
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onCheckedChange={() => toggleSelect(row.id)}
                        data-testid={`select-${row.id}`}
                      />
                    </TableCell>
                  )}
                  {columns
                    .filter((c) => visibleColumns.has(c.key))
                    .map((column) => (
                      <TableCell
                        key={column.key}
                        className="px-4 py-3 whitespace-nowrap"
                      >
                        {(() => {
                          const rowRecord = row as Record<string, unknown>;
                          const value = rowRecord[column.key];

                          return column.render
                            ? column.render(value, row)
                            : renderCellValue(value);
                        })()}
                      </TableCell>
                    ))}
                  {(onView || onEdit || onDuplicate || onDelete) && (
                    <TableCell className="px-4 py-3 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            data-testid={`actions-${row.id}`}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 z-50">
                          <DropdownMenuLabel className="text-[10px] uppercase text-muted-foreground px-2 py-1">
                            Tùy chọn
                          </DropdownMenuLabel>
                          {onView && (
                            <DropdownMenuItem
                              onClick={() => onView(row)}
                              data-testid={`view-${row.id}`}
                              className="cursor-pointer"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem
                              onClick={() => onEdit(row)}
                              data-testid={`edit-${row.id}`}
                              className="cursor-pointer"
                            >
                              <Pencil className="w-4 h-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                          )}
                          {onDuplicate && (
                            <DropdownMenuItem
                              onClick={() => onDuplicate(row)}
                              data-testid={`duplicate-${row.id}`}
                              className="cursor-pointer"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Nhân bản
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(row)}
                              className="text-destructive focus:text-destructive cursor-pointer"
                              data-testid={`delete-${row.id}`}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {resolvedTotalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            Đang hiển thị{" "}
            <span className="font-medium text-foreground">
              {startIndex + 1}
            </span>{" "}
            -{" "}
            <span className="font-medium text-foreground">
              {Math.min(startIndex + currentPaginatedData.length, resolvedTotalElements)}
            </span>{" "}
            trên{" "}
            <span className="font-medium text-foreground">
              {resolvedTotalElements}
            </span>{" "}
            kết quả
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm text-muted-foreground">Số dòng:</span>
              <Select
                value={String(rowsPerPage)}
                onValueChange={(val) => {
                  handlePageSizeChange(Number(val));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-muted-foreground/20"
              onClick={() => updateCurrentPage(1)}
              disabled={currentPage === 1}
              data-testid="first-page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-muted-foreground/20"
              onClick={() => updateCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              data-testid="prev-page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentPage} / {resolvedTotalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-muted-foreground/20"
              onClick={() => updateCurrentPage(currentPage + 1)}
              disabled={currentPage === resolvedTotalPages}
              data-testid="next-page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-muted-foreground/20"
              onClick={() => updateCurrentPage(resolvedTotalPages)}
              disabled={currentPage === resolvedTotalPages}
              data-testid="last-page"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
