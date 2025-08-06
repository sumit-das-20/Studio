
import { PushNotificationManager } from "@/components/admin/push-notification-manager";

export default function PushNotificationsPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <PushNotificationManager />
        </main>
    );
}
