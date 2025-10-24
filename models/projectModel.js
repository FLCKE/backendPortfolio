// models/Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    slug: { type: String, unique: true, index: true },
    description: { type: String, default: "" },
    techStack: { type: [String], default: [] }, // ex: ["React", "Node", "MongoDB"]
    repoUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => /^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+\/?$/i.test(v),
        message: "repoUrl doit être une URL GitHub valide (https://github.com/user/repo).",
      },
    },
    liveUrl: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/i.test(v),
        message: "liveUrl doit être une URL valide.",
      },
    },
    imageUrl: { type: String, default: "" }, // banner/thumbnail (optionnel)
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// slug auto à partir du titre
ProjectSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  const base = this.title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  this.slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  next();
});

ProjectSchema.index({ title: "text", description: "text", techStack: 1 });

export default mongoose.model("Project", ProjectSchema);
