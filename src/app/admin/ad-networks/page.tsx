
import { AdNetworkManager } from "@/components/admin/ad-network-manager";

export default function AdNetworksPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <AdNetworkManager />
        </main>
    );
}
