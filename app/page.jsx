"use client";

import Feed from "@components/Feed";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
        {session?.user ? (
            <Feed />
        ) : (
          <>
            <h1>Faça Login para proceguir</h1>
          </>
        )}
    </section>
  );
};

export default Home;
