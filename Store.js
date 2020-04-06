const Config = require("./Config");

class Store extends Config {
  constructor(options = {}) {
    super(options);
  }

  set(path, content, sha) {
    const buff = Buffer.from(content);
    const opt = {
      owner: this.owner,
      repo: this.repo,
      path,
      message: `createOrUpdateFile;${path};${new Date().toISOString()}`,
      content: buff.toString("base64"),
      branch: this.branch,
    };
    if (sha) opt.sha = sha;

    return this.client.repos.createOrUpdateFile(opt).then((res) => res.data);
  }

  get(path) {
    return this.client.repos
      .getContents({
        owner: this.owner,
        repo: this.repo,
        path,
        branch: this.branch,
      })
      .then((file) => {
        const buff = Buffer.from(file.data.content, "base64");

        return {
          sha: file.data.sha,
          text: buff.toString("ascii"),
          data: file.data,
        };
      });
  }

  delete(path, sha) {
    return this.client.repos
      .deleteFile({
        message: `deleteFile;${path};${new Date().toISOString()}`,
        sha,
        owner: this.owner,
        repo: this.repo,
        path,
        branch: this.branch,
      })
      .then((res) => res.data);
  }
}

module.exports = Store;
