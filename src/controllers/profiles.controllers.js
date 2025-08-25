import Profile from '../models/profile.models.js';
import User from '../models/users.models.js';

export const createProfile = async (req, res) => {
  const { bio, avatar, userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const profile = await Profile.create({ bio, avatar, userId });
    res.status(201).json({ message: 'Perfil creado', profile });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({ include: { model: User, attributes: ['id', 'name', 'email'] } });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};