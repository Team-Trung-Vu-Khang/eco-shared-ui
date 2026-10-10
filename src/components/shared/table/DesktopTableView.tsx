import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Loader2,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TableControllerReturn } from "./useTableController";

interface DesktopTableViewProps<T extends { id: string | number }> {
  controller: TableControllerReturn<T>;
}

export function DesktopTableView<T extends { id: string | number }>({
  controller,
}: DesktopTableViewProps<T>) {
  const {
    columns,
    loading,
    selectable,
    visibleColumns,
    selectedRows,
    currentPaginatedData,
    toggleSelectAll,
    toggleSelect,
    clearFilters,
    renderCellValue,
    runAfterMenuClose,
    onView,
    onEdit,
    onDuplicate,
    onDelete,
  } = controller;

  const visibleColumnCount = columns.filter((c) =>
    visibleColumns.has(c.key),
  ).length;

  const rowSpanCount =
    visibleColumnCount +
    (selectable ? 1 : 0) +
    (onView || onEdit || onDuplicate || onDelete ? 1 : 0);

  return (
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
                            onSelect={() =>
                              runAfterMenuClose(() => onView(row))
                            }
                            data-testid={`view-${row.id}`}
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                        )}
                        {onEdit && (
                          <DropdownMenuItem
                            onSelect={() =>
                              runAfterMenuClose(() => onEdit(row))
                            }
                            data-testid={`edit-${row.id}`}
                            className="cursor-pointer"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                        )}
                        {onDuplicate && (
                          <DropdownMenuItem
                            onSelect={() =>
                              runAfterMenuClose(() => onDuplicate(row))
                            }
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
                            onSelect={() =>
                              runAfterMenuClose(() => onDelete(row))
                            }
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
  );
}
