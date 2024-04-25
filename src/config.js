import fs from 'node:fs'

export const config = JSON.parse(
    fs.readFileSync(
        'config.json',
        {encoding: 'utf8'}
    )
)
