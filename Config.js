const { Octokit } = require("@octokit/rest");

class Config {
  constructor(options = {}) {
    this.repo = options.repo;
    this.owner = options.owner;
    this.branch = options.branch || "master";
    const opt = {};
    if (options.auth) opt.auth = options.auth;
    this.client = new Octokit(opt);
  }
}

module.exports = Config;
