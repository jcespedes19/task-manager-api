const express = require('express')
const app = express()
const User = require('./models/User')
const Task = require('./models/Task')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
require('./db/mongo')
const port = process.env.PORT
//midleware
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//             res.send('GET Request are disabled')
//     } else{
//         next()
//     }
// })
// app.use((req, res, next) => {
//     res.status(503).send('Server under maintance')
// })
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) { //filter by the type of a file 
        // cb(new Error('File not allowed'))
        // cb(undefined, true)
        // cb(undefined, false)
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('File not allowed'))
        }
        cb(undefined, true)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
app.use(express.json())
//registering routes
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server running in ' + port)
})

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//    const token =  jwt.sign({_id: 'asasa'}, 'thisissasasasas@@@Ssasasasasas', {
//         expiresIn: '0 seconds'
//    }) //1 parameter is the data stored in the token, 2 secret key, 3 options
//    console.log(token)
//    const data = jwt.verify(token, 'thisissasasasas@@@Ssasasasasas')
//    console.log(data)
// }
// myFunction()

//const Task = require('../src/models/Task')

// const main = async () => {
//     // const task = await Task.findById('5f3c5da1e033ce978f2c5895')
//     // const owner = await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user = await User.findById('5f3c5cc8abad3b9768e57ac8')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()