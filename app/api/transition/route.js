import Transition from "@models/transition";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  const creator = request.headers.get("Authorization");

  try {
    await connectToDB();

    const transition = await Transition.find({ creator: creator, deletedAt: null }).populate(
      "creator"
    );
    return new Response(JSON.stringify(transition), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all transition", { status: 500 });
  }
};
