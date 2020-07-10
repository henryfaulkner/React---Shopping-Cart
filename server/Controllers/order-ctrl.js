const Order = require('../Models/order-model');
const MongoClient = require('mongodb').MongoClient;

const HttpError = require('../Models/http-error');
const { ObjectID } = require('mongodb');

const url = "mongodb+srv://henryfaulkner:HLouFau9@perficient.jpuuz.azure.mongodb.net/Shopping-Cart?retryWrites=true&w=majority";

getOrders = async (req, res, next) => {
    const client = new MongoClient(url);
    let result = [];

    try {
        await client.connect();
        const db = client.db();
        result = await db.collection('Orders').find().toArray();
    } catch (error) {
        return res.json({message: "Could not retrieve products."})
    }
    client.close();

    res.json(result);
}

createOrder = async (req, res, next) => {
    const client = new MongoClient(url);

    let order = {};

    for (let key in req.body) {
        if(req.body.hasOwnProperty(key) && key.includes(' ')) {
            order[key.replace(' ', '_')] = req.body[key];
            console.log(req.body[key]);
            console.log(key.replace(' ', '_'));
        } else if (req.body.hasOwnProperty(key)) {
            order[key] = req.body[key];
            console.log(req.body[key]);
            console.log(key);
        }
    }

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('Orders').insertOne(order);
    } catch (error) {
        return res.json({message: "Could not store data."});
    }
    client.close();

    res.json(order);
}

deleteOrder = async (req, res, next) => {
    let deleteId = req.params.oid;
    console.log(deleteId);

    const client = new MongoClient(url);
    let result = [];

    try {
        await client.connect();
        const db = client.db();
        result = await db.collection('Orders').find().toArray();
    } catch (error) {
        return res.json({message: "Could not retrieve order."})
    }

    let objectToDelete;
    result.forEach(obj => {
        if(obj["_id"].toString() === deleteId) {
            objectToDelete = obj;
        }
    })

    try {
        const db = client.db();
        result = await db.collection('Orders').remove({ _id: objectToDelete['_id'] });
    } catch (error) {
        return res.json({message: "Could not delete order."})
    }
    client.close();

    res.json({message: "we did it! i think"});
}

deleteAll = async (req, res, next) => {
    const client = new MongoClient(url);
    let result = [];

    try {
        await client.connect();
        const db = client.db();
        await db.collection('Orders').deleteMany({});
    } catch (error) {
        return res.json({message: "Couldn't delete all Orders collection records."});
    }
    client.close();

    res.json({message: "Deleted all Order History."})
}

module.exports = {
    getOrders,
    createOrder,
    deleteOrder,
    deleteAll
}