import { Octokit } from 'octokit'
import { config } from './config.js'

const octokit = new Octokit({
    auth: config['github-token']
})

export async function fetchIssues(targetProject) {
    const labels = targetProject.labels.join(',')

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: targetProject.owner,
        repo: targetProject.repository,
        since: targetProject.since,
        labels,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    const parsedIssues = data.map(i => ({
        _id: `${targetProject.owner}-${targetProject.repository}-${i.id}`,
        url: i.url,
        number: i.number,
        title: i.title,
        labels: i.labels.map(l => l.name),
        createdAt: i.created_at,
        updatedAt: i.updated_at,
        state: i.state,
        noticed: false
    }))

    return parsedIssues
}