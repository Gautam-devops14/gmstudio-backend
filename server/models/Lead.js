import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    package: { type: String }, // ✅ New optional field
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
