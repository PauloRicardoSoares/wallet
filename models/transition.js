import { Schema, model, models } from "mongoose";

const TransitionSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  value: {
    type: Schema.Types.Decimal128,
    required: [true, "Value is required!"],
  },
  type: {
    type: String,
    required: [true, "Type is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
});

const Transition = models.Transition || model("Transition", TransitionSchema);

export default Transition;
