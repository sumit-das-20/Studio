
import { Portals } from "@/components/portals";
import { auth } from "@/lib/firebase";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';


export default async function Home() {
  // This is a workaround to check auth status on the server.
  // In a real app, you might use a more robust solution with middleware or a dedicated session management library.
  const cookieStore = cookies();
  const userCookie = cookieStore.get('firebaseAuth');

  if (userCookie) {
    // This doesn't verify the token, it just checks for presence.
    // For a production app, you should verify the token's validity.
    return redirect('/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl">
         <Portals />
      </div>
    </div>
  );
}
