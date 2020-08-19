//CRUD operations
//C => create R=>read U=> update D=> delete
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' //localhost cause strange issues
const databaseName ='task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Error has ocurred')
    } 
    const db = client.db(databaseName)
    
    // db.collection('users').findOne({name: 'Josue', age: 1}, (error, user) => {
    //     if(error){
    //         console.log('error has ocurred')
    //     } else if(!user){
    //         console.log('Not found')
    //     }
    //     console.log(user)
    // })
    // db.collection('users').findOne({_id: new ObjectID("5f36bf5c97403c7a11f503d7")}, (error, user) => {
    //         if(error){
    //             console.log('error has ocurred')
    //         } else if(!user){
    //             console.log('Not found')
    //         }
    //         console.log(user)
    //     })
    //    db.collection('users').find({age: 23}).toArray((error, user) => {
    //     if(error){
    //         console.log('error has ocurred')
    //     } else if(!user){
    //         console.log('Not found')
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({age: 23}).count((error, count) => {
    //     if(error){
    //         console.log('error has ocurred')
    //     } 
    //     console.log(count)
    // }) 
    // db.collection('task').findOne({_id: new ObjectID("5f36c3fd9f3b227a64046d06")},(error, task)=>{
    //     if(error){
    //         return console.log('Error has ocurred')
    //     }
    //     console.log(task)
    // } )
    // db.collection('task').find({completed: false}).toArray((error, tasks) => {
    //     if(error){
    //         console.log(error)
    //     }
    //     console.log(tasks)
    // })
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5f36c0f39634a57a2af9997e")
    // }, {
    //     $set : {
    //         name: 'Juan'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) =>{ 
    //     console.log(error)
    // })
    // db.collection('task').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('users').deleteOne({
    //     age: 23
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    db.collection('task').deleteOne({
        description: 'Call with Jose'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error);
    })
})
