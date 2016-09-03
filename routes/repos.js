'use strict';

const express = require('express');
const router = express.Router();
const octonode = require('octonode');
const token = require('../bin/token').githubToken;
const github = octonode.client(token);
const mongo = require('mongojs');
const db = mongo('mongodb://localhost/gitsee', ['repos']);

router.get('/', sendRepos);
router.get('/simple', sendReposSimple);
router.get('/count', countRepos);
router.get('/add/:username/:reponame', addRepo);
router.get('/:username/:reponame', getRepo);

module.exports = router;


// Find all repos in DB and send to client.
function sendRepos(req, res, next) {
  db.repos.find((fail, pass) => {
    res.send(pass);
  })
};

// Find all repo names in DB and send them to client.
function sendReposSimple(req, res, next) {
  db.repos.find((fail, pass) => {
    const reposInDB = [];

    for (let repo of pass) {
      console.log(repo.repo);
      reposInDB.push(repo.repo);
    };

    res.send(reposInDB);
  });
};

// Send the client a count of all watched repos.
function countRepos(req, res, next) {
  db.repos.find((err, docs) => {
    if (err) return;
    console.log(docs.length);
    res.send({repos: docs.length});
  })
};

// Check to see if repo is already in DB,
// query Github for repo information,
// add repo to DB.
function addRepo(req, res, next) {
  const username = req.params.username;
  const reponame = req.params.reponame;
  const fullname = username + '/' + reponame;

  db.repos.findOne({repo: fullname}, (dbErr, dbRes) => {
    // Something fucked up.
    if (dbErr) {
      res.send('Error in DB query.');
    }

    // Repo not present in DB.
    else if (!dbRes) {
      github.get(`repos/${fullname}`, (err, status, body, headers) => {
        if (err) {
          console.log(err);
          res.send('Error: Invalid repo.')
          return;
        }
        console.log(status);

        const owner = body.owner;
        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getYear();
        const nowDate = `${month}/${day}/20${year-100}`;

        db.repos.save({
            repo: fullname,
            owner: username,
            reponame: reponame,
            dateAdded: nowDate,
            url: body.html_url,
            createdDate: body.created_at,
            updatedDate: body.updated_at,
            pushedDate: body.pushed_at,
            ownerName: owner.login,
            ownerAvatar: owner.avatar_url,
            ownerRepos: owner.repos_url,
            history: [
              {
                date: nowDate,
                stars: body.stargazers_count,
                watchers: body.subscribers_count,
                forks: body.forks_count,
                issues: body.open_issues_count
              }
            ]
          }, (fail, pass) => {
            if (fail) console.log(fail);
            else {
              console.log(pass);
              res.send('Added to DB.');
            }
          });
      });
    }

    // Repo already exists in DB.
    else {
      res.send('Repo already in db.');
    }
  });
};

function getRepo(req, res, next) {
  const username = req.params.username;
  const reponame = req.params.reponame;
  const fullname = username + '/' + reponame;

  console.log(`> REPO request: ${fullname}`);
  db.repos.find({repo: fullname}, (fail, pass) => {
    if (fail) {
      res.send('Failed to find repo in DB.');
      return;
    }

    res.send(pass);
  })
};
