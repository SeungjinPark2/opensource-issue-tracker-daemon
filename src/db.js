import { MongoClient } from 'mongodb'
import { config } from './config.js'

const mongodbURL = config['mongodb-url']
const dbName = config['mongodb-db-name']

const mongoClient = new MongoClient(mongodbURL)

await mongoClient.connect()

const db = mongoClient.db(dbName)

export {
    mongoClient,
    db
}
