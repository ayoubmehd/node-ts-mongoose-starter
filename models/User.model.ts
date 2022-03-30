import { Schema, model, Types } from "mongoose";

export default model<User>(
  "User",
  new Schema<User>(
    {
      username: { type: String, required: true },
      password: { type: String, required: true },
      role: { type: Types.ObjectId, ref: "Role" },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
  )
);
