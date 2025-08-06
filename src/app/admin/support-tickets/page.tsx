
import { SupportTicketManager } from "@/components/admin/support-ticket-manager";

export default function SupportTicketsPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <SupportTicketManager />
        </main>
    );
}
