"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import WalletCard from "./WalletCard";
import TransitionCard from "./TransitionCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [wallet, setWallet] = useState([]);
  const [transition, setTransition] = useState([]);
  const [filteredWallet, setFilteredWallet] = useState([]);
  const { data: session, status } = useSession();

  //   const filterPost = (search) => {
  //     if (!search) {
  //       setFilteredWallet(wallet);
  //     }
  //
  //     setFilteredWallet(
  //       wallet.filter(
  //         (p) =>
  //           p.transition.includes(search.trim()) ||
  //           p.tag.includes(search.trim()) ||
  //           p.creator.username.includes(search.trim())
  //       )
  //     );
  //   };

  //   const handleSearchChange = (e) => {
  //     e.preventDefault();
  //
  //     const search = e.target.value;
  //     setSearchText(search);
  //     filterPost(search);
  //   };

  useEffect(() => {
    const fetchWallet = async () => {
      const response = await fetch("/api/wallet", {
        method: "GET", // ou 'GET', 'PUT', etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.id}`, // se precisar de autenticação
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
        method: "GET", // ou 'GET', 'PUT', etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.id}`, // se precisar de autenticação
        },
      });
      const data = await response.json();

      setTransition(data);
    };

    fetchTransition();
  }, []);

  return (
    <div>
      <session className="feed">
        <WalletCard wallet={wallet} />

        {/* <form className="relative w-full flex-center">
          <input
            type="search"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form> */}

        <h2 class="head_text text-left">
          <span class="blue_gradient">Transitions</span>
        </h2>
        {transition.map((tran) => (
          <TransitionCard transition={tran} />
        ))}
      </session>
    </div>
  );
};

export default Feed;
