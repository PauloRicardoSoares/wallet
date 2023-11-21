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

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <div className="flex flex-col">
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
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {parseFloat(transition.value.$numberDecimal).toFixed(2)}
      </p>
    </div>
  );
};

export default PromptCard;
