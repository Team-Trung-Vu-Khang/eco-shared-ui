# Shop Layout — FE Integration

Layout quản trị cửa hàng (desktop + mobile) từ `@Team-Trung-Vu-Khang/eco-shared-ui`.

## 1. Cài / cập nhật

```bash
npm i @Team-Trung-Vu-Khang/eco-shared-ui@latest
```

Cần bản có `ShopAdminLayout` (sau `0.0.23`). CSS đã import sẵn như cũ: `import "@Team-Trung-Vu-Khang/eco-shared-ui/index.css";`

## 2. Exports

```ts
import {
  ShopAdminLayout,       // desktop: sidebar + header
  ShopMobileLayout,      // mobile: header + bottom nav
  menuShopAdminGroups,   // menu sidebar shop
  SHOP_ROUTES,           // hằng số route
  SHOP_MOBILE_NAV_ITEMS, // bottom nav mặc định
} from "@Team-Trung-Vu-Khang/eco-shared-ui";
```

## 3. Routes cần tạo

| Route | Trang | Roles |
|---|---|---|
| `/admin/dashboard` | Dashboard | SHOP_ADMIN, ADMIN, SUPER_ADMIN |
| `/admin/products` | Danh sách sản phẩm | SHOP_ADMIN, ADMIN, SUPER_ADMIN |
| `/admin/products/new` | Thêm sản phẩm | SHOP_ADMIN, ADMIN, SUPER_ADMIN |
| `/admin/products/approval` | Duyệt sản phẩm | SHOP_ADMIN, ADMIN, SUPER_ADMIN |
| `/admin/orders` | Đơn đặt hàng | SHOP_ADMIN, ADMIN, SUPER_ADMIN |
| `/admin/agencies` | Đại lý | SHOP_ADMIN, SUPER_ADMIN |
| `/profile` | Tài khoản (tab mobile) | — |

Roles = `MEVI_SHOP_ADMIN`, `MEVI_ADMIN`, `MEVI_SUPER_ADMIN`. Dùng `SHOP_ROUTES.*` thay vì hard-code.

## 4. Desktop

```tsx
import { ShopAdminLayout } from "@Team-Trung-Vu-Khang/eco-shared-ui";

export default function OrdersPage() {
  return (
    <ShopAdminLayout
      title="Đơn đặt hàng"
      description="Quản lý đơn hàng của cửa hàng"
      actions={<Button>Xuất file</Button>}
    >
      <OrdersTable />
    </ShopAdminLayout>
  );
}
```

Props = `AdminLayoutProps` (trừ các cờ `isDev/isMevi/isRice/isEcoSystemAdmin/isFactory/isOwnerFactory/isShop`):
`children`, `title`, `description`, `actions`, `menu`, `brandIcon` (mặc định `Store`), `brandTitle` (mặc định `"Eco Shop"`), `brandSubtitle`, `moduleSwitcher`.

- Không cần workspace — layout không chờ load workspace.
- Sidebar tự lọc theo role user (`useAuth`).

## 5. Mobile

```tsx
import { ShopMobileLayout } from "@Team-Trung-Vu-Khang/eco-shared-ui";

export default function MobileOrdersPage() {
  return (
    <ShopMobileLayout headerActions={<NotificationBell />}>
      <OrdersList />
    </ShopMobileLayout>
  );
}
```

Props = `MobileAppLayoutProps`: `navItems` (mặc định `SHOP_MOBILE_NAV_ITEMS`), `brandIcon`, `brandTitle`, `brandSubtitle`, `headerActions`, `moduleSwitcher`, `ignoredHeaderRoutes`, `hideHeader`, ...

Bottom nav mặc định: **Sản phẩm · Duyệt SP · Tổng quan (nút giữa) · Đơn hàng · Tài khoản**. Đại lý chỉ có trên sidebar desktop.

Đổi bottom nav:

```tsx
<ShopMobileLayout
  navItems={[
    ...SHOP_MOBILE_NAV_ITEMS.slice(0, 4),
    { label: "Đại lý", href: SHOP_ROUTES.agencies, icon: Store, matchPrefixes: [SHOP_ROUTES.agencies] },
  ]}
>
```

## 6. Chọn desktop / mobile

```tsx
import { useIsMobile } from "@/hooks/use-mobile";

export function ShopLayout(props: { children: React.ReactNode; title?: string }) {
  const isMobile = useIsMobile();
  return isMobile
    ? <ShopMobileLayout>{props.children}</ShopMobileLayout>
    : <ShopAdminLayout title={props.title}>{props.children}</ShopAdminLayout>;
}
```

## 7. Duyệt sản phẩm — bắt buộc xác nhận

Trang `/admin/products/approval`: **Duyệt** và **Từ chối** đều phải mở dialog xác nhận, không gọi API trực tiếp khi click.

| Hành động | Tiêu đề | Nội dung | Nút xác nhận |
|---|---|---|---|
| Duyệt | Xác nhận duyệt sản phẩm | Duyệt "{tên SP}"? Sản phẩm sẽ hiển thị trên cửa hàng. | `Duyệt` (primary) |
| Từ chối | Xác nhận từ chối sản phẩm | Từ chối "{tên SP}"? + ô **Lý do từ chối** | `Từ chối` (destructive) |

Quy tắc:
- Đóng dialog / bấm `Hủy` → không làm gì.
- Đang gọi API: disable cả 2 nút, nút xác nhận hiện `loading`; không đóng dialog được.
- Thành công → đóng dialog, toast, refetch danh sách. Lỗi → giữ dialog, toast lỗi.
- Duyệt/từ chối hàng loạt (nếu có) cũng confirm, ghi rõ số lượng: "Duyệt 5 sản phẩm đã chọn?".

```tsx
import { useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  Textarea,
} from "@Team-Trung-Vu-Khang/eco-shared-ui";

type Action = "approve" | "reject";

interface Props {
  product: { id: string; name: string } | null;
  action: Action | null;
  onClose: () => void;
  onConfirm: (id: string, action: Action, reason?: string) => Promise<void>;
}

export function ProductApprovalDialog({ product, action, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const isReject = action === "reject";

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault(); // giữ dialog mở tới khi API xong
    if (!product || !action) return;
    setLoading(true);
    try {
      await onConfirm(product.id, action, isReject ? reason.trim() : undefined);
      setReason("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={!!product && !!action} onOpenChange={(o) => !o && !loading && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isReject ? "Xác nhận từ chối sản phẩm" : "Xác nhận duyệt sản phẩm"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isReject
              ? `Từ chối "${product?.name}"?`
              : `Duyệt "${product?.name}"? Sản phẩm sẽ hiển thị trên cửa hàng.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isReject && (
          <Textarea
            placeholder="Lý do từ chối"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={loading}
          />
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            loading={loading}
            className={isReject ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : undefined}
          >
            {isReject ? "Từ chối" : "Duyệt"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

Dùng:

```tsx
const [target, setTarget] = useState<{ product: Product; action: Action } | null>(null);

<Button onClick={() => setTarget({ product, action: "approve" })}>Duyệt</Button>
<Button variant="destructive" onClick={() => setTarget({ product, action: "reject" })}>Từ chối</Button>

<ProductApprovalDialog
  product={target?.product ?? null}
  action={target?.action ?? null}
  onClose={() => setTarget(null)}
  onConfirm={(id, action, reason) =>
    action === "approve" ? approveProduct(id) : rejectProduct(id, reason)
  }
/>
```

## 8. Lưu ý phân quyền

`ShopAdminLayout` kiểm tra route hiện tại với menu (`isRouteAuthorized`). Route **không có trong menu** (vd `/admin/products/:id/edit`) có thể hiện "Không có quyền truy cập". Kiểm tra route chi tiết trên app; nếu bị chặn, truyền `menu` tùy chỉnh hoặc báo để bổ sung vào `menuShopAdminGroups`.

## Câu hỏi còn mở

- Route chi tiết/sửa sản phẩm, chi tiết đơn hàng có qua được `isRouteAuthorized` không?
- Shop admin có cần workspace không? (hiện đang tắt)
- Mobile có cần tab Đại lý không?
- Lý do từ chối có bắt buộc không? (hiện tùy chọn — nếu bắt buộc: disable nút `Từ chối` khi `reason.trim()` rỗng)
