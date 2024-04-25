import { Octokit } from 'octokit'
import { config } from './config.js'

const octokit = new Octokit({
    auth: config['github-token']
})

const targetProject = config['projects'][0]

try {
    const labels = targetProject.labels.join(',')

    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: targetProject.owner,
        repo: targetProject.repository,
        since: targetProject.since,
        labels,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    console.log(issues)

    // mongodb 에 upsert 하기
    // 만약 bot 알림조건에 만족하는 raw 가 있다면 알림 보내기
} catch (error) {
    console.error(error)
}
  