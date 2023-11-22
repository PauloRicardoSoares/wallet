"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ transition }) => {
  const { data: session } = useSession();

  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleDeleteClick = (e) => {
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
      <div className="text-red-700" onClick={() => handleDeleteClick()}>
        Deletar
      </div>
    </div>
  );
};

export default PromptCard;
