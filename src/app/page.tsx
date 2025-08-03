
import { Portals } from "@/components/portals";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";


export default async function Home() {
  const cookieStore = cookies();
  const employeeCookie = cookieStore.get('firebaseAuth');
  const buyerCookie = cookieStore.get('firebaseBuyerAuth');
  const adminCookie = cookieStore.get('firebaseAdminAuth');

  if (employeeCookie) {
    return redirect('/employee/dashboard');
  }

  if (buyerCookie) {
    return redirect('/buyer/dashboard');
  }

  if (adminCookie) {
    return redirect('/admin/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl">
         <Portals />
      </div>
    </div>
  );
}
