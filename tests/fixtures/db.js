const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const user1ID = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1ID,
    name: 'h1',
    email: 'aniruddhs559@gmail.com',
    password: 'Green12345!',
    tokens: [{
        token: jwt.sign({ _id: user1ID}, process.env.JWT_SECRET)
    }]
}

const user2ID = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2ID,
    name: 'h2',
    email: 'aniruddhs559@example.com',
    password: 'Green1234!',
    tokens: [{
        token: jwt.sign({ _id: user2ID}, process.env.JWT_SECRET)
    }]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First',
    completed: false,
    owner: user1._id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second',
    completed: false,
    owner: user1._id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third',
    completed: true,
    owner: user2._id
}

const setUpDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}

module.exports ={
    user1ID,
    user1,
    user2ID,
    user2,
    task1,
    setUpDatabase
}