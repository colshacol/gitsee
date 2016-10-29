'use strict'

const
  schedule = require('node-schedule'),
  octonode = require('octonode'),
  github = octonode.client({id: 'a5a51f984' + 'c89b000260f', secret: '20e6d94a258db' + '36178f7615a574' + 'c873ef9b4a4de'}),
  mongo = require('mongojs'),
  db = mongo(`mongodb://gitsee:MarleyMC__14@ds019746.mlab.com:19746/gitsee`, ['repos'])

// for production: run blast every 24 hours.
const
  rule = new schedule.RecurrenceRule()
  rule.dayOfWeek = [0,1,2,3,4,5,6]
  rule.hour = 18
  rule.minute = 13
  rule.second = 50

const blast = () => {
  // Create the function that will fire at the specified time.
  schedule.scheduleJob(rule, () => {
    console.log('\n\n\n\nblasting\n\n\n\n')

    // Find all repos in the database.
    db.repos.find((error, repos) => {
      // For each repo found found...
      for (let i = 0; i < repos.length; i++) {
        let repo = repos[i]
        let fullname = repo.repo
        let history = repo.history

        const
          nowDate = new Date(),
          day = nowDate.getDate(),
          month = nowDate.getMonth() + 1,
          year = nowDate.getFullYear(),
          date = `${month}/${day}/${year}`,
          time = Date.now()

        // Query GitHub to get current repo stats.
        github.get(`/repos/${fullname}`, (err, status, body, headers) => {
          if (err) return console.log('Error querying GitHub.')

          history.push({
            date,
            time,
            stars: body.stargazers_count,
            watchers: body.subscribers_count,
            forks: body.forks_count,
            issues: body.open_issues_count
          })

          // Find the repo at hand and update the history array.
          db.repos.findAndModify({
            query: { repo: fullname },
            update: { $set: { history } }
          }, (err, doc, lastErrorObject) => {
            console.log(`\n\n${fullname} history updated.\n\n`)
          })
        })
      }
    })
  })
}

module.exports = blast
