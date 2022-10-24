import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    username: { type: String, required: false },
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    url: { type: String, required: true },
    hash: { type: String, required: false },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export default mongoose.model("Files", fileSchema);
