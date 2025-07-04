import { AppSidebar } from "@/components/ui/app-sidebar";
import Navbar from "@/pages/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AppSidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
