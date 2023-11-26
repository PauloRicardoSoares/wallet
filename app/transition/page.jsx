"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import TransitionCard from "@components/TransitionCard";

const Transitions = () => {
  const [transition, setTransition] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTransition = async () => {
      const response = await fetch("/api/transition", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user.id}`,
        },
      });
      const data = await response.json();

      setTransition(data);
    };

    fetchTransition();
  }, []);
  return (
    <section className="transitions">
      <div className="transitions-title">
        <h2 className="title">Transitions</h2>
        <Link href="/" className="transition-all">
          Voltar
        </Link>
      </div>

      {transition.map((tran) => (
        <TransitionCard transition={tran} />
      ))}
    </section>
  );
};

export default Transitions;
