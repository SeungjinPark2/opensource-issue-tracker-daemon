import fs from 'node:fs'
// import path from 'node:path'

export const config = JSON.parse(
    fs.readFileSync(
        'config.json',
        {encoding: 'utf8'}
    )
)
