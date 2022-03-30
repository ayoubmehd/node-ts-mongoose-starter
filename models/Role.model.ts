import { Schema, model } from "mongoose";

export default model<Role>(
  "Role",
  new Schema<Role>(
    {
      type: { type: String, required: true },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
  )
);
