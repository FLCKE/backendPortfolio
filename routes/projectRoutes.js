// src/routes/projects.routes.js
import express from "express";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  createProjectWithUpload,
  // createProjectWithUpload,
} from "../controllers/projectController.js";
import { upload } from "../middlewares/pictureAdd.js";
import auth from "../middlewares/auth.js";
// Option upload (si activée)
// import multer from "multer";
// const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

const router = express.Router();

router.get("/",auth, listProjects);
router.get("/:id", getProject);
router.post("/",auth, createProject);
router.post("/upload",auth, upload.single("image"), createProjectWithUpload);
router.put("/:id",auth, updateProject);
router.delete("/:id",auth, deleteProject);

export default router;
