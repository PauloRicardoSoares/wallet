"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PromptCard = ({ transition }) => {
  const { data: session } = useSession();

  const pathName = usePathname();

  const handleDeleteClick = async (e) => {
    const response = await fetch(`/api/transition/${transition._id}/`, {
      method: "DELETE", // ou 'GET', 'PUT', etc.
      headers: {
        Authorization: `${session.user.id}`, // se precisar de autenticação
      },
    });
  };

  return (
    <div className="transition-card">
      <div>
        <h3 className="card-title">{transition.description}</h3>
        <p
          className="card-tag"
          onClick={() => handleTagClick && handleTagClick(transition.tag)}
        >
          {transition.tag}
        </p>

        {transition.type === "I" ? (
          <p className="card-value income">
            {"$ "}
            {parseFloat(transition.value.$numberDecimal).toFixed(2)}
          </p>
        ) : (
          <p className="card-value expenses">
            {"$ "}
            {parseFloat(transition.value.$numberDecimal).toFixed(2)}
          </p>
        )}
      </div>

      {pathName === "/transition" ? (
        <div className="card-buttons">
          <Link className="card-edit" href={`/transition/edit?id=${transition._id}`}>
            Edit
          </Link>
          <div className="card-delete" onClick={() => handleDeleteClick()}>
            Delete
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromptCard;
