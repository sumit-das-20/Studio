
import { Portals } from "@/components/portals";
import { Trophy } from "lucide-react";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl">
         <Portals />
      </div>
    </div>
  );
}
