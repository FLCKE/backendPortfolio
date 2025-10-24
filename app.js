
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Assurez-vous que le chemin est correct
import authRoutes from "./routes/authRoutes.js"
import projectsRouter from "./routes/projectRoutes.js";
import rateLimiter from "./middlewares/rate-limiter.js"

const app = express();
app.use(express.json()); // Middleware pour parser le JSON dans les requêtes

app.use(cors({ origin: "*", credentials: true })); // Middleware pour activer CORS
app.use(rateLimiter);

app.get("/", (req, res) => {
    res.send("API OK ✅");
});
app.use("/api/projects", projectsRouter);
app.use("/api/users", userRoutes); // Assurez-vous que le chemin est correct
app.use("/api/auth", authRoutes); // Assurez-vous que le chemin est correct
export default app; // Exporter l'application Express pour l'utiliser dans d'autres fichiers