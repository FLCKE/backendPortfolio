// src/controllers/projectController.js
import Project from "../models/projectModel.js";
import connectDB from "../config/db.js";

import  Cloudinary  from "../config/cloudinary.js";

/** GET /api/projects */
export async function listProjects(req, res, next) {
  try {
    const { q, tech } = req.query;
    const where = {};
    if (q) where.$text = { $search: q };
    if (tech) where.techStack = { $in: tech.split(",") };
    const items = await Project.find(where).sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (e) { next(e); }
}

/** GET /api/projects/:id */
export async function getProject(req, res, next) {
  try {
    const doc = await Project.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: "Projet introuvable" });
    res.json(doc);
  } catch (e) { next(e); }
}

/** POST /api/projects (JSON, sans upload) */
export async function createProject(req, res, next) {
  try {
    const { title, description, techStack = [], repoUrl, liveUrl, imageUrl = "" } = req.body || {};
    if (!title?.trim()) return res.status(400).json({ error: "title requis" });
    if (!repoUrl?.trim()) return res.status(400).json({ error: "repoUrl requis" });

    const project = await Project.create({
      title,
      description,
      techStack,
      repoUrl,
      liveUrl,
      imageUrl,
    });

    res.status(201).json(project);
  } catch (e) {
    if (e.name === "ValidationError") return res.status(400).json({ error: e.message });
    next(e);
  }
}

/** PUT /api/projects/:id (JSON) */
export async function updateProject(req, res, next) {
  try {
    const allowed = ["title", "description", "techStack", "repoUrl", "liveUrl", "imageUrl", "featured"];
    const patch = {};
    for (const k of allowed) if (k in req.body) patch[k] = req.body[k];

    const doc = await Project.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: "Projet introuvable" });
    res.json(doc);
  } catch (e) {
    if (e.name === "ValidationError") return res.status(400).json({ error: e.message });
    next(e);
  }
}

/** DELETE /api/projects/:id */
export async function deleteProject(req, res, next) {
  try {
    const doc = await Project.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Projet introuvable" });
    res.json({ ok: true });
  } catch (e) { next(e); }
}

/* ---------- Variante upload image (optionnelle) ---------- */

export async function createProjectWithUpload(req, res, next) {
  try {
    const { title, description, repoUrl, liveUrl, techStack = "" } = req.body || {};
    if (!title?.trim()) return res.status(400).json({ error: "title requis" });
    if (!repoUrl?.trim()) return res.status(400).json({ error: "repoUrl requis" });
    if (!req.file) return res.status(400).json({ error: "image requise" });
    const img = req.file;
    const project = await Project.create({
      title,
      description,
      repoUrl,
      liveUrl,
      techStack: techStack ? techStack.split(",").map(s => s.trim()).filter(Boolean) : [],
      imageUrl: img.path,
    });

    res.status(201).json(project);
  } catch (e) {
    if (e.name === "ValidationError") return res.status(400).json({ error: e.message });
    next(e);
  }
}

