"use client";

import Feed from "@components/Feed";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
      <div className="flex">
        {session?.user ? (
          <div className="flex gap-3 gap-5">
            <Feed />
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Home;
