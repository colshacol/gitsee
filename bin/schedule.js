'use strict';

const schedule = require('node-schedule');
const octonode = require('octonode');
const token = require('../bin/hidden').githubToken;
const github = octonode.client(token);
const mongo = require('mongojs');
const db = mongo('mongodb://localhost/gitsee', ['repos']);
const fs = require('fs');
const writeError = require('writeFile').writeError;

// for production: run every 24 hours.
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,1,2,3,4,5,6];
rule.hour = 0;
rule.minute = 4;
rule.second = 0;

// for development: run every 10 seconds.
// rule.hour = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
// rule.minute = [0, new schedule.Range(0, 59)];
// rule.second = [0,10,20,30,40,50];

const blast = () => {
  // Create the function that will fire at the specified time.
  schedule.scheduleJob(rule, () => {
    console.log('\n\n\n\nblasting\n\n\n\n');

    // Find all repos in the database.
    db.repos.find((error, repos) => {
      // console.log(error);
      console.log(`\n\n\n${repos.length} repos updating.\n\n\n`);
      // For each repo found found...
      for (let i = 0; i < repos.length; i++) {
        let repo = repos[i];
        let fullname = repo.repo;
        let history = repo.history;

        console.log(`\n${fullname} history updating...`);

        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getYear();
        const nowDate = `${month}/${day}/20${year-100}`;

        // Query GitHub to get current repo stats.
        github.get(`https://api.github.com/repos/${fullname}?client_id=0dcf8f9edebb19792e7a&client_secret=4aafa7ff93ccb27a9ac904b9f9cc3052fff3be59`, (err, status, body, headers) => {
          if (err) {
            console.log('Error written to error.log.');
            writeError(err);
            return;
          };

          history.push({
            date: nowDate,
            stars: body.stargazers_count,
            watchers: body.subscribers_count,
            forks: body.forks_count,
            issues: body.open_issues_count
          });

          // Find the repo at hand and update the history array.
          db.repos.findAndModify({
            query: { repo: fullname },
            update: { $set: { history: history } }
          }, (err, doc, lastErrorObject) => {
            console.log(`\n\n${fullname} history updated.\n\n`);
          })
        });
      }
    });
  });
}

module.exports = blast;
