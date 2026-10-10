import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Loader2,
  Eye,
  Pencil,
  Trash2,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TableControllerReturn } from "./useTableController";
import type { Column } from "./types";

interface MobileCardListViewProps<T extends { id: string | number }> {
  controller: TableControllerReturn<T>;
}

export function MobileCardListView<T extends { id: string | number }>({
  controller,
}: MobileCardListViewProps<T>) {
  const {
    columns,
    loading,
    selectable,
    visibleColumns,
    selectedRows,
    currentPaginatedData,
    toggleSelect,
    clearFilters,
    renderCellValue,
    onView,
    onEdit,
    onDuplicate,
    onDelete,
    renderMobileCard,
  } = controller;

  if (loading) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-xs">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-2" />
        <span className="text-sm text-muted-foreground font-medium">
          Đang tải dữ liệu...
        </span>
      </div>
    );
  }

  if (currentPaginatedData.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center shadow-xs">
        <Search className="w-10 h-10 mb-2 opacity-20 text-muted-foreground" />
        <p className="text-sm font-semibold text-foreground">
          Không tìm thấy dữ liệu phù hợp
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="mt-3 rounded-xl text-xs font-semibold"
        >
          Xóa tất cả bộ lọc
        </Button>
      </div>
    );
  }

  // Phân loại cột cho Card mặc định
  const visibleColList = columns.filter((c) => visibleColumns.has(c.key));

  const primaryCol =
    visibleColList.find((c) => c.mobilePriority === "primary") ||
    visibleColList[0];

  const badgeCol = visibleColList.find((c) => c.mobilePriority === "badge");

  const secondaryCols = visibleColList.filter(
    (c) =>
      c.key !== primaryCol?.key &&
      c.key !== badgeCol?.key &&
      c.mobilePriority !== "hidden",
  );

  return (
    <div className="space-y-3">
      {currentPaginatedData.map((row) => {
        const isSelected = selectedRows.has(row.id);

        // 1. Nếu có renderMobileCard tùy biến từ trang
        if (renderMobileCard) {
          return (
            <React.Fragment key={row.id}>
              {renderMobileCard(row, {
                selected: isSelected,
                toggleSelect: () => toggleSelect(row.id),
                onView: onView ? () => onView(row) : undefined,
                onEdit: onEdit ? () => onEdit(row) : undefined,
                onDuplicate: onDuplicate ? () => onDuplicate(row) : undefined,
                onDelete: onDelete ? () => onDelete(row) : undefined,
              })}
            </React.Fragment>
          );
        }

        // 2. Mặc định: Tự động render Card thông minh
        const rowRecord = row as Record<string, unknown>;
        const primaryVal = primaryCol
          ? primaryCol.render
            ? primaryCol.render(rowRecord[primaryCol.key], row)
            : renderCellValue(rowRecord[primaryCol.key])
          : null;

        const badgeVal = badgeCol
          ? badgeCol.render
            ? badgeCol.render(rowRecord[badgeCol.key], row)
            : renderCellValue(rowRecord[badgeCol.key])
          : null;

        const hasActions = Boolean(onView || onEdit || onDuplicate || onDelete);

        return (
          <div
            key={row.id}
            className={cn(
              "rounded-2xl border border-border bg-card p-4 shadow-xs transition-all space-y-3",
              isSelected && "ring-2 ring-primary/40 bg-primary/5",
            )}
            data-testid={`card-${row.id}`}
          >
            {/* Header của Card: Checkbox + Tiêu đề chính + Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                {selectable && (
                  <div className="pt-0.5">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(row.id)}
                      data-testid={`select-card-${row.id}`}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-foreground leading-snug break-words">
                    {primaryVal}
                  </div>
                </div>
              </div>

              {badgeVal && (
                <div className="shrink-0">{badgeVal}</div>
              )}
            </div>

            {/* Body của Card: Các cột phụ */}
            {secondaryCols.length > 0 && (
              <div className="space-y-1.5 pt-1 border-t border-border/60">
                {secondaryCols.map((col: Column<T>) => {
                  const val = col.mobileRender
                    ? col.mobileRender(rowRecord[col.key], row)
                    : col.render
                      ? col.render(rowRecord[col.key], row)
                      : renderCellValue(rowRecord[col.key]);

                  if (val === null || val === undefined || val === "") {
                    return null;
                  }

                  return (
                    <div
                      key={col.key}
                      className="flex items-start justify-between gap-2 text-xs py-0.5"
                    >
                      <span className="text-muted-foreground shrink-0 font-medium">
                        {col.label}:
                      </span>
                      <span className="font-medium text-foreground text-right break-words">
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer của Card: Nút thao tác một chạm */}
            {hasActions && (
              <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-border/60">
                {onView && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg text-xs font-semibold gap-1"
                    onClick={() => onView(row)}
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    Xem
                  </Button>
                )}
                {onEdit && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg text-xs font-semibold gap-1"
                    onClick={() => onEdit(row)}
                  >
                    <Pencil className="w-3.5 h-3.5 text-blue-600" />
                    Sửa
                  </Button>
                )}
                {onDuplicate && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg text-xs font-semibold gap-1"
                    onClick={() => onDuplicate(row)}
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    Nhân bản
                  </Button>
                )}
                {onDelete && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg text-xs font-semibold gap-1 text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(row)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
