
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Power, Shield } from "lucide-react";
import { signOut } from "../employee/actions";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                <Shield className="h-6 w-6" />
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <div className="ml-auto flex items-center gap-2">
                    <form action={signOut}>
                        <Button variant="ghost" size="icon" type="submit" aria-label="Sign Out">
                            <Power />
                        </Button>
                    </form>
                </div>
            </header>
            {children}
        </div>
    </SidebarProvider>
  );
}
