import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import HomePublic from "@/components/HomePublic";
import HomeLogged from "@/components/HomeLogged";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <HomePublic />;
  }

  return <HomeLogged session={session} />;
}