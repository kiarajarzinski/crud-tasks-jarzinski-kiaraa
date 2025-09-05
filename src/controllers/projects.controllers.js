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
    const projects = await Project.findAll({
      where: { isDeleted: false },
      include: { model: User, attributes: ['id', 'name', 'email'] } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener proyecto por ID con usuarios
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id, {
      include: { model: User, attributes: ['id', 'name', 'email'] }
    });
    if (!project || project.isDeleted) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar proyecto por ID
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, userIds } = req.body;
  try {
    const project = await Project.findByPk(id);
    if (!project || project.isDeleted) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    if (name && name !== project.name) {
      const existingProject = await Project.findOne({ where: { name } });
      if (existingProject) {
        return res.status(400).json({ error: 'Ya existe un proyecto con ese nombre' });
      }
    }
    await project.update({ name, description });
    if (userIds && Array.isArray(userIds)) {
      const users = await User.findAll({ where: { id: userIds } });
      await project.setUsers(users);
    }
    res.status(200).json({ message: 'Proyecto actualizado correctamente', project });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//eliminar proyecto con eliminación lógica(es decir, marcar como eliminado sin borrar)
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    project.isDeleted = true;
    await project.save();
    res.status(200).json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
