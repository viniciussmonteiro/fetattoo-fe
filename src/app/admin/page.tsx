import { createPageMetadata } from "@/lib/metadata";
import { DashboardClient } from "./DashboardClient";

export const metadata = createPageMetadata({
  title: "Admin Dashboard",
  description: "Visão geral da gestão de conteúdo do portfólio.",
  path: "/admin",
  noIndex: true
});

export default function AdminDashboardPage() {
  return <DashboardClient />;
}

