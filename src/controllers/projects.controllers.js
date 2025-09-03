import { Project, User } from '../models/index.js';

//crear proyecto vinculado a usuarios
export const createProject = async (req, res) => {
  const { name, description, userIds } = req.body;
  try {
    const project = await Project.create({ name, description });
    if (userIds && Array.isArray(userIds)) {
      const users = await User.findAll({ where: { id: userIds } });
      await project.addUsers(users);
    }
    res.status(201).json({ message: 'Proyecto creado', project });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//obtener todos los proyectos con datos de usuario
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ include: { model: User, attributes: ['id', 'name', 'email'] } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};