import Task from '../models/tasks.models.js';


//mostrar todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las tareas" });
  }
}

//añadir una nueva tarea
export const createTask = async (req, res) => {
  const { title, description, isComplete } = req.body;
  try {
    if (!title || !description || typeof isComplete !== 'boolean' || title.length > 100 || description.length > 100) {
      return res.status(400).json({ error: 'Faltan datos, superan el limite o el tipo de dato es incorrecto.' });
    }
    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ error: 'Ya existe una tarea con ese titulo.' });
    }
    const newTask = await Task.create({ title, description, isComplete });
    res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


//obtener una tarea por ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la tarea" });
  }
}

//actualizar una tarea por ID
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


//eliminar una tarea por ID
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
}