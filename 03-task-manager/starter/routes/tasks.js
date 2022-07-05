const express = require('express');
const router = express.Router();

//invoke controller
const { getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task-controller')

//define the methods that are used
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router