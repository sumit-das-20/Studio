
import { TaskManager } from "@/components/admin/task-manager";

export default function TasksPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <TaskManager />
        </main>
    );
}
