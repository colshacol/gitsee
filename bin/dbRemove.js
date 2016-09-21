'use strict'

const schedule = require('node-schedule')
const mongo = require('mongojs')
const db = mongo(`mongodb://gitsee:MarleyMC__14@ds019746.mlab.com:19746/gitsee`, ['repos'])

"9/20/2016"
function removeDuplicates(date) {
  db.repos.find({}, (err, docs) => {
    for (let i = 0; i < docs.length; i++) {
      const repo = docs[i]
      const history = repo.history
      const duplicates = history.filter((entry) => {
        return (entry.date === date)
      })
      // console.log('\n\n\n\n', duplicates)

      const sortedHistory = duplicates.sort((a, b) => {
        return a.stars - b.stars
      })

      const historyToSave = sortedHistory[0]

      const newHistory = history.filter((entry, i) => {
        return (entry.date !== date || (entry.date === date && entry === historyToSave))
      })

      repo.history = newHistory;

      db.repos.findAndModify({
        query: { repo: repo.repo },
        update: { $set: { history: newHistory } },
        new: true
      }, (err, doc, lastErrorObject) => {
        if (err) throw err;
        if (doc) console.log(doc)
      })
    }
  })
}

module.exports = removeDuplicates
