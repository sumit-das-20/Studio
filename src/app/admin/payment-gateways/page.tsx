
import { PaymentGatewayManager } from "@/components/admin/payment-gateway-manager";

export default function PaymentGatewaysPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <PaymentGatewayManager />
        </main>
    );
}
