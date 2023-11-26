"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const PromptCard = ({ transition }) => {
  const { data: session } = useSession();

  // const pathName = usePathname();
  // const router = useRouter();

  const handleDeleteClick = async (e) => {
    const response = await fetch(`/api/transition/${transition._id}/`, {
      method: "DELETE", // ou 'GET', 'PUT', etc.
      headers: {
        Authorization: `${session.user.id}`, // se precisar de autenticação
      },
    });
  };

  const handleEditClick = (e) => {
    alert(transition.description);
  };

  return (
    <div className="prompt_card flex flex-col">
      <div>
        <div className="flex flex-col justify-between items-start gap-5">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {transition.description}
          </h3>
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(transition.tag)}
          >
            {transition.tag}
          </p>
        </div>

        {transition.type === "I" ? (
          <p className="my-4 font-satoshi text-sm text-green-700">
            {parseFloat(transition.value.$numberDecimal).toFixed(2)}
          </p>
        ) : (
          <p className="my-4 font-satoshi text-sm text-red-700">
            {parseFloat(transition.value.$numberDecimal).toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Link
          className="border w-full text-center rounded-xl p-1 bg-yellow-300 hover:bg-yellow-400 cursor-pointer"
          href={`/transition/edit?id=${transition._id}`}
        >
          Edit
        </Link>
        <div
          className="border w-full text-center rounded-xl p-1 text-white bg-red-600 hover:bg-red-700 cursor-pointer"
          onClick={() => handleDeleteClick()}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
