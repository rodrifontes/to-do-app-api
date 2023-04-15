const TaskRepository = require('../repositories/TaskRepository');
const isValidUUID = require('../utils/isValidUUID');

class TaskController {
  async index(request, response) {
    const tasks = await TaskRepository.findAll();
    response.json(tasks);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid task id' });
    }

    const task = await TaskRepository.findById(id);
    if (!task) {
      return response.status(404).json({ error: 'Task not found' });
    }
    response.json(task);
  }

  async store(request, response) {
    const {
      title, description,
    } = request.body;

    if (!title) return response.status(400).json({ error: 'Title is required' });

    if (!description) return response.status(400).json({ error: 'Description is required' });

    const task = await TaskRepository.create({
      title,
      description,
    });

    response.status(201).json(task);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      title, description,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid task id' });
    }


    if (!title) return response.status(400).json({ error: 'Title is required' });

    if (!description) return response.status(400).json({ error: 'Description is required' });

    const taskExists = await TaskRepository.findById(id);
    if (!taskExists) return response.status(404).json({ error: 'Task not found' });

    const task = await TaskRepository.update(id, {
      title,
      description,
    });

    response.json(task);
  }

  async updateStatus(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid task id' });
    }

    const taskExists = await TaskRepository.findById(id);
    if (!taskExists) return response.status(404).json({ error: 'Task not found' });

    const task = await TaskRepository.updateStatus(id);

    response.json(task);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid task id' });
    }

    await TaskRepository.delete(id);

    response.sendStatus(204);
  }

}

module.exports = new TaskController();
