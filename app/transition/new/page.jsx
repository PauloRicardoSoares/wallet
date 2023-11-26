"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateTransition = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    description: "",
    tag: "",
    value: "",
    type: "",
  });

  const createTransition = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/transition/new", {
        method: "POST",
        body: JSON.stringify({
          description: post.description,
          userId: session?.user.id,
          value: post.value,
          tag: post.tag,
          type: post.type,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTransition}
    />
  );
};

export default CreateTransition;
