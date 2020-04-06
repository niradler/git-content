const Model = require("./Model");
const Store = require("./Store");

const exitWith = (message, code = 0) => {
  if (message && code == 0) console.log(message);
  if (message && code != 0) console.error("Error:", message);
  process.exit(code);
};

const getModel = ({ owner, repo, auth, branch }, path) => {
  const store = new Store({ owner, repo, auth, branch });
  const model = new Model(store, path);

  return model;
};

const create = async (argv) => {
  try {
    const { owner, repo, auth, branch } = argv;
    const model = getModel({ owner, repo, auth, branch }, argv.path);

    await model.save(argv.content);

    exitWith("created");
  } catch (error) {
    exitWith(error.message, 1);
  }
};

const update = async (argv) => {
  try {
    const { owner, repo, auth, branch } = argv;
    const model = getModel({ owner, repo, auth, branch }, argv.path);

    await model.init();
    await model.save(argv.content);

    exitWith("updated");
  } catch (error) {
    exitWith(error.message, 1);
  }
};

const get = async (argv) => {
  try {
    const { owner, repo, auth, branch } = argv;
    const model = getModel({ owner, repo, auth, branch }, argv.path);

    const file = await model.get();

    exitWith(file.text);
  } catch (error) {
    exitWith(error.message, 1);
  }
};

const deleteFile = async (argv) => {
  try {
    const { owner, repo, auth, branch } = argv;
    const model = getModel({ owner, repo, auth, branch }, argv.path);

    await model.init();
    await model.delete();

    exitWith("deleted");
  } catch (error) {
    exitWith(error.message, 1);
  }
};

module.exports = { create, update, delete: deleteFile, get };
