import { AppLayout } from "@/components/layout/app-layout";

export default function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
