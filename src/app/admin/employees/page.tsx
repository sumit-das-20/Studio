
import { EmployeeManager } from "@/components/admin/employee-manager";

export default function EmployeesPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <EmployeeManager />
        </main>
    );
}
