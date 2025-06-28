require('dotenv').config({ path: 'config/dev.env' })
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')



const app = express()

const cors = require('cors');
app.use(cors({
  origin: 'https://task-manager-8wji.vercel.app',
  credentials: true
}));

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app


