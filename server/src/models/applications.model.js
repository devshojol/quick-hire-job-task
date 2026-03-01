import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const ApplicationSchema = new Schema(
  {
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    resumeLink: { type: String, required: true, trim: true },
    coverNote: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

const Application =
  models.Application || model("Application", ApplicationSchema);
export default Application;
