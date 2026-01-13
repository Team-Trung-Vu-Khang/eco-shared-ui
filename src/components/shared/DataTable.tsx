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
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  pageSize?: number;
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
  onView,
  onEdit,
  onDelete,
  pageSize = 10,
  filters = [],
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((c) => c.key))
  );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Search filter
      const matchesSearch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      );

      // Advanced filters
      const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
        if (!value || value === "all") return true;
        return String((row as any)[key]) === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, search, activeFilters]);

  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPaginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

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
    setSearch("");
  };

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
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 border-muted-foreground/20 focus:ring-primary/20"
                data-testid="table-search"
              />
            </div>
          )}
          
          {filters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 border-muted-foreground/20 gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Bộ lọc</span>
                  {Object.keys(activeFilters).length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 bg-primary/10 text-primary">
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
                    <p className="text-xs font-medium text-muted-foreground">{filter.label}</p>
                    <Select
                      value={activeFilters[filter.key] || "all"}
                      onValueChange={(val) => 
                        setActiveFilters(prev => ({ ...prev, [filter.key]: val }))
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Tất cả" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        {filter.options.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
              <Button variant="outline" size="icon" className="h-10 w-10 border-muted-foreground/20">
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
          
          <Button variant="outline" size="icon" className="h-10 w-10 border-muted-foreground/20">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-muted-foreground">Đang lọc theo:</span>
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || value === "all") return null;
            const filterDef = filters.find(f => f.key === key);
            const label = filterDef?.options.find(o => o.value === value)?.label || value;
            return (
              <Badge key={key} variant="secondary" className="gap-1 pr-1 bg-muted">
                {filterDef?.label}: {label}
                <button 
                  onClick={() => setActiveFilters(prev => {
                    const next = { ...prev };
                    delete next[key];
                    return next;
                  })}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
              {selectable && (
                <TableHead className="w-12 px-4">
                  <Checkbox
                    checked={selectedRows.size === currentPaginatedData.length && currentPaginatedData.length > 0}
                    onCheckedChange={toggleSelectAll}
                    data-testid="select-all"
                  />
                </TableHead>
              )}
              {columns.filter(c => visibleColumns.has(c.key)).map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "font-bold text-foreground h-12 px-4 whitespace-nowrap", 
                    column.width && `w-[${column.width}]`
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
              {(onView || onEdit || onDelete) && (
                <TableHead className="w-16 px-4 text-right">Thao tác</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPaginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.filter(c => visibleColumns.has(c.key)).length + (selectable ? 1 : 0) + (onView || onEdit || onDelete ? 1 : 0)}
                  className="h-40 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="w-8 h-8 mb-2 opacity-20" />
                    <p>Không tìm thấy dữ liệu phù hợp</p>
                    <Button variant="link" onClick={clearFilters} className="mt-1 h-auto p-0">
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
                    selectedRows.has(row.id) && "bg-primary/5 hover:bg-primary/10"
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
                  {columns.filter(c => visibleColumns.has(c.key)).map((column) => (
                    <TableCell key={column.key} className="px-4 py-3 whitespace-nowrap">
                      {column.render
                        ? column.render((row as any)[column.key], row)
                        : (row as any)[column.key]}
                    </TableCell>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <TableCell className="px-4 py-3 text-right">
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
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel className="text-[10px] uppercase text-muted-foreground px-2 py-1">Tùy chọn</DropdownMenuLabel>
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(row)} data-testid={`view-${row.id}`} className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(row)} data-testid={`edit-${row.id}`} className="cursor-pointer">
                              <Pencil className="w-4 h-4 mr-2" />
                              Chỉnh sửa
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

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            Đang hiển thị <span className="font-medium text-foreground">{startIndex + 1}</span> - <span className="font-medium text-foreground">{Math.min(startIndex + rowsPerPage, filteredData.length)}</span> trên <span className="font-medium text-foreground">{filteredData.length}</span> kết quả
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm text-muted-foreground">Số dòng:</span>
              <Select
                value={String(rowsPerPage)}
                onValueChange={(val) => {
                  setRowsPerPage(Number(val));
                  setCurrentPage(1);
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
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              data-testid="first-page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-muted-foreground/20"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              data-testid="prev-page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1 mx-2">
              <span className="text-sm">Trang</span>
              <Input 
                className="h-8 w-12 text-center p-0 border-muted-foreground/20" 
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= totalPages) {
                    setCurrentPage(val);
                  }
                }}
              />
              <span className="text-sm text-muted-foreground">/ {totalPages}</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-muted-foreground/20"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              data-testid="next-page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-muted-foreground/20"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
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