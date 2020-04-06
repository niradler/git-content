#!/usr/bin/env node
const Yargs = require("yargs"); // eslint-disable-line
const lib = require("./lib");

Yargs.usage("git-content [cmd]");

Yargs.command(
  "create",
  "create file in git repo.",
  (yargs) => {
    yargs.positional("path", {
      describe: "path",
      require: true,
    });
    yargs.option("content", {
      describe: "file content",
      require: true,
    });
  },
  async (argv) => {
    lib.create(argv);
  }
);

Yargs.command(
  "update",
  "update file in git repo.",
  (yargs) => {
    yargs.positional("path", {
      describe: "path",
      require: true,
    });
    yargs.option("content", {
      describe: "file content",
      require: true,
    });
  },
  async (argv) => {
    lib.update(argv);
  }
);

Yargs.command(
  "delete",
  "delete file in git repo.",
  (yargs) => {
    yargs.positional("path", {
      describe: "path",
      require: true,
    });
  },
  async (argv) => {
    lib.delete(argv);
  }
);

Yargs.command(
  "get",
  "get file from git repo.",
  (yargs) => {
    yargs.positional("path", {
      describe: "path",
      require: true,
    });
  },
  async (argv) => {
    lib.get(argv);
  }
);

Yargs.option("owner", {
  type: "string",
  description: "owner",
})
  .option("repo", {
    default: "config",
    type: "string",
    description: "repo",
  })
  .option("branch", {
    default: "master",
    type: "string",
    description: "branch",
  })
  .option("auth", {
    alias: "a",
    type: "string",
    description: "Github api key",
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  }).argv;

if (Yargs.argv["_"].length == 0) {
  Yargs.showHelp();
}
