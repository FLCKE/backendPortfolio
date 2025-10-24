import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Accès refusé. Token requis.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};

export default auth;