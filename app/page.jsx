"use client";

import Feed from "@components/Feed";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
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
