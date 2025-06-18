// const  mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL)
  .then(client => {
    console.log('Connected')
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'c',
    //     age: 18
    // }).then(result => {
    //     console.log(result.acknowledged)
    // }).catch(error => {
    //     console.log(error)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'a',
    //         age: 1
    //     },{
    //         name: 'b',
    //         age: '2'
    //     }
    // ]).then(result => {
    //     console.log(result.insertedIds)
    //     console.log(result.insertedCount)
    // }).catch(error => {
    //     console.log(error)
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Brush',
    //         completed: false
    //     },
    //     {
    //         description: 'Bath',
    //         completed: false
    //     },
    //     {
    //         description: 'Eat',
    //         completed: false
    //     }

    // ]).then(result => {
    //     console.log(result.insertedIds)
    // }).catch(error => {
    //     console.log(error)
    // })

    // db.collection('users').findOne({_id: new ObjectId("6847c0b7b32fc374e1e91109")}).then ( user => {
    //     console.log(user)
    // }).catch(error => (
    //     console.log("Unable to fetch")
    // ))

    // db.collection('users').find({age: 19}).toArray().then(users => {
    //     console.log(users);
    // }).catch(error => {
    //     console.log("Unable to fetch")
    // })

    // db.collection('users').find({age: 19}).count().then(count => {
    //     console.log(count);
    // }).catch(error => {
    //     console.log("Unable to fetch")
    // })
    // db.collection('tasks').findOne({_id: new ObjectId("6847ed301d63c067acdc6330")}).then(task => {
    //     console.log(task)
    // }).catch(error => {
    //     console.log("Unabel to fetch")
    // })
    // db.collection('tasks').find({completed: false}).toArray().then(tasks => {
    //     console.log(tasks)
    // }).catch(error => {
    //     console.log("Unabel to fetch")
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectId("6847c0b7b32fc374e1e91109")
    // },{
    //     $inc:{
    //         age: 1
    //     }
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set:{
    //         completed: true
    //     }
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age: 19
    }).then((result) => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        description: "Brush"
    }).then((result) => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })

  })
  .catch(error => {
    console.error('Unable to connect', error)
  })
