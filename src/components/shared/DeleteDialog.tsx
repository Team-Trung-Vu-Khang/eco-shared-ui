import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteDialog({
  open,
  onOpenChange,
  title = "Xác nhận xóa",
  description = "Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.",
  onConfirm,
  loading = false,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-testid="delete-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} data-testid="delete-cancel">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            loading={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-testid="delete-confirm"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
