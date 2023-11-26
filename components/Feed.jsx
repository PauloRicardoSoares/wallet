"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import WalletCard from "./WalletCard";
import TransitionCard from "./TransitionCard";
import Link from "next/link";

const Feed = () => {
  const [wallet, setWallet] = useState([]);
  const [transition, setTransition] = useState([]);
  const { data: session } = useSession();


  useEffect(() => {
    const fetchWallet = async () => {
      const response = await fetch("/api/wallet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.id}`,
        },
      });
      const data = await response.json();

      data.value = parseFloat(data.value.$numberDecimal).toFixed(2);

      setWallet(data);
    };

    fetchWallet();
  }, []);

  useEffect(() => {
    const fetchTransition = async () => {
      const response = await fetch("/api/transition", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.id}`,
        },
      });
      const data = await response.json();

      setTransition(data);
    };

    fetchTransition();
  }, []);

  return (
    <session className="feed">
      <WalletCard wallet={wallet} />

      <div className="transitions">
        <div className="transitions-title">
          <h2 className="title">Transitions</h2>
          <Link href="/transition" className="transition-all">
            See all
          </Link>
        </div>

        {transition.map((tran) => (
          <TransitionCard transition={tran} />
        ))}
      </div>
    </session>
  );
};

export default Feed;
