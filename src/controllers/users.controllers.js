import { User, Task } from '../models/index.js';

// Mostrar todos los usuarios con sus tareas
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Task,
        attributes: ['id', 'title', 'description', 'isComplete']
      }
    });
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por ID con sus tareas
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Task,
        attributes: ['id', 'title', 'description', 'isComplete']
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email está en uso' });
    }
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await user.update(req.body);
    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};