import User from '../models/userModel.js';
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

export const updateUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  let updateData = req.body;
  console.log('updateData', req.file);
  if (req.file && req.file.path) {
    updateData.imageUrl = req.file.path; // URL Cloudinary
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true , runValidators: true } // new: true pour retourner le document mis à jour
  ).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}