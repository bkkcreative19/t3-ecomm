import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.email}
      <button onClick={() => signOut()}>log out</button>
    </div>
  );
};

export default ProfilePage;
