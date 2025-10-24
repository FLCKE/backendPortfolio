
import app from './app.js'; // Assurez-vous que le chemin est correct
import db from './config/db.js'; // Assurez-vous que le chemin est correct
import dotenv from 'dotenv'; // Pour charger les variables d'environnement
dotenv.config();

const PORT = process.env.PORT || 5000;



db(); // Connexion à la base de données MongoDB


app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
