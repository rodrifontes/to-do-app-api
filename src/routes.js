const { Router } = require('express');

const TaskController = require('./app/controllers/TaskController');

const router = Router();

router.get('/tasks', TaskController.index);
router.get('/tasks/:id', TaskController.show);
router.delete('/tasks/:id', TaskController.delete);
router.post('/tasks', TaskController.store);
router.put('/tasks/:id', TaskController.update);
router.put('/tasks/status/:id', TaskController.updateStatus);

module.exports = router;
