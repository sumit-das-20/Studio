
import { Portals } from "@/components/portals";
import { Trophy } from "lucide-react";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <div className="flex items-center gap-2 mb-8">
            <Trophy className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold font-headline text-foreground">TaskRabbit</h1>
       </div>
      <div className="w-full max-w-4xl">
         <Portals />
      </div>
    </div>
  );
}
