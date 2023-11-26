import Transition from "@models/transition";
import { connectToDB } from "@utils/database";

// #region GET => Read

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const transition = await Transition.findById(params.id).populate("creator");

    if (!transition)
      return new Response("Transition not found", { status: 404 });

    return new Response(JSON.stringify(transition), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all transitions", { status: 500 });
  }
};

// #endregion

// #region PATCH => Update

export const PATCH = async (request, { params }) => {
  const { transition, tag } = await request.json();

  try {
    await connectToDB();

    const existingTransition = await Transition.findById(params.id);

    if (!existingTransition)
      return new Response("Transition not found", { status: 404 });

    existingTransition.transition = transition;
    existingTransition.tag = tag;

    await existingTransition.save();

    return new Response(JSON.stringify(existingTransition), { status: 200 });
  } catch (error) {
    return new Response("Failed to update", { status: 500 });
  }
};

// #endregion

// #region DELETE => Delete

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const existingTransition = await Transition.findById(params.id);
    const creator = request.headers.get("Authorization");

    if (!existingTransition) {
      return new Response("Transition not found", { status: 404 });
    }

    if (existingTransition.creator != creator) {
      return new Response(`User validate fail ${existingTransition.creator} -- ${creator} `, { status: 401 });
    }

    existingTransition.deletedAt = Date();

    await existingTransition.save();

    return new Response("Transition deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete", { status: 500 });
  }
};

// #endregion
