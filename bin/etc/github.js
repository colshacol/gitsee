const octonode = require('octonode');
const token = require('../hidden').githubToken;
const github = octonode.client(token);

github.get('')
