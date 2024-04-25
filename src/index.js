import { CronJob } from 'cron'
import { config } from './config.js'
import { db, mongoClient } from './db.js'
import { fetchIssues } from './fetchIssues.js'
import { startNotice } from './bot.js'

new CronJob(
	'*/5 * * * * *', // cronTime
	main,
	null, // onComplete
	true // start
)

async function main() {
    for (const project of config['projects']) {
        try {
        
            const issueCollection = db.collection('issues')
        
            const parsedIssues = await fetchIssues(project)
            
            // mongodb 에 upsert 하기
            const promises = parsedIssues.map(pi => issueCollection.replaceOne(
                { _id: pi._id },
                pi,
                { upsert: true }
            ))
            
            await Promise.all(promises)
    
            // start bot as asynchronous
            startNotice(issueCollection)
        } catch (error) {
            console.error(error)
        }
    }
}

['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, async function () {
        // Do some cleanup such as close db
        console.log('program exited, closing mongo connection')

        if (mongoClient) {
            await mongoClient.close()
        }

        console.log('close succeeded')
        process.exit(0)
    });
})
