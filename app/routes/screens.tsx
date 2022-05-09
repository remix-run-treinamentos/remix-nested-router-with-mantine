import { Outlet } from "@remix-run/react";
import AppLayout from "~/layout";

export default function ScreensPage() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
