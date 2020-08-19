const express = require('express')
const Task = require('..//models/Task')
const router = new express.Router()
const auth = require('../middleware/auth')

//tasks
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.send(500).send(e)
    }
})
//GET /tasks?completed= true
//GET /tasks?limit= 5&skip10
//GET /tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const values = req.query.sortBy.split(':')
        sort[values[0]] = values[1] === 'desc' ? -1 : 1 
    }
    try {
        //const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort              //1 ascending, -1 descending
                
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const validUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!validUpdate) {
        return res.status(400).send({ error: 'Update is not allowed' })
    }
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send({ error: 'Task not found' })
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router