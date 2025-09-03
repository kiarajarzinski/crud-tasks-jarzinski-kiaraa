import { Task, User } from '../models/index.js';

// Mostrar todas las tareas con el usuario que las creó
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

// Obtener una tarea por ID con el usuario que la creó
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

// Crear una nueva tarea vinculada a un usuario
export const createTask = async (req, res) => {
  const { title, description, isComplete, userId } = req.body;
  try {
    if (!title || !description || typeof isComplete !== 'boolean' || title.length > 100 || description.length > 100) {
      return res.status(400).json({ error: 'Faltan datos, superan el límite o el tipo de dato es incorrecto.' });
    }
    if (!userId) {
      return res.status(400).json({ error: 'La tarea debe estar vinculada a un usuario.' });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ error: 'Ya existe una tarea con ese título.' });
    }
    const newTask = await Task.create({ title, description, isComplete, userId });
    res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Actualizar una tarea por ID
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    if ((title && title.length > 100) || (description && description.length > 100) || (isComplete !== undefined && typeof isComplete !== 'boolean')) {
      return res.status(400).json({ error: 'Los datos superan el limite o el tipo es incorrecto.' });
    }
    if (title && title !== task.title) {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask) {
        return res.status(400).json({ error: 'Ya existe una tarea con ese titulo.' });
      }
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.isComplete = isComplete !== undefined ? isComplete : task.isComplete;
    await task.save();
    res.status(200).json({ message: 'Tarea actualizada correctamente', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Eliminar una tarea por ID
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    await task.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};