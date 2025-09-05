import { Profile, User} from '../models/index.js';

//crear perfil vinculado a un usuario
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

//obtener todos los perfiles con datos de usuario
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({ include: { model: User, attributes: ['id', 'name', 'email'] } });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener perfil por ID con usuario
export const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id, {
      include: { model: User, attributes: ['id', 'name', 'email'] }
    });
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar perfil por ID
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { bio, avatar } = req.body;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    await profile.update({ bio, avatar });
    res.status(200).json({ message: 'Perfil actualizado correctamente', profile });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar perfil por ID
export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    await profile.destroy();
    res.status(200).json({ message: 'Perfil eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};