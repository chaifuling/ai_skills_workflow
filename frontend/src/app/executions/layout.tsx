import { AppLayout } from "@/components/layout/app-layout";

export default function ExecutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
