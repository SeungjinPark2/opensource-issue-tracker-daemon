import { MongoClient } from 'mongodb'
import { config } from './config.js'

const mongodbURL = config['mongodb-url']
const dbName = config['mongodb-db-name']

const mongoClient = new MongoClient(mongodbURL)

export {
    mongoClient,
    dbName
}
