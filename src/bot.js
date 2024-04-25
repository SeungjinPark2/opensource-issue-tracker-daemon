export async function startNotice(issueCollection) {
    const unProcessedIssuesCursor = issueCollection.find({ noticed: false })
    await unProcessedIssuesCursor.forEach(console.log)
    // 봇 관련 동작 추가하기
}