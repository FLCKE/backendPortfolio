import rateLimit from "express-rate-limit";

// Créer l'instance UNE SEULE FOIS lors de l'initialisation
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limite à 100 requêtes par windowMs
    message: {
        error: "Trop de requêtes depuis cette IP, réessayez dans 15 minutes."
    },
    standardHeaders: true, // Retourne les infos de rate limit dans les headers `RateLimit-*`
    legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});

export default rateLimiter;