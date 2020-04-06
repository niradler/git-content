class Model {
  constructor(store, path) {
    this.store = store;
    this.path = path;
    this.exist = null;
  }

  async init(isInit = true) {
    try {
      const file = await this.store.get(this.path);
      this.sha = file.sha;
      this.exist = true;

      return file;
    } catch (error) {
      this.exist = false;

      if (error.message == "Not Found" && isInit == true) {
        return null;
      }

      throw error;
    }
  }

  save(content) {
    console.log(this.path, content, this.sha);
    return this.store.set(this.path, content, this.sha).then((r) => {
      this.exist = true;
      return r;
    });
  }

  delete() {
    return this.store.delete(this.path, this.sha).then((r) => {
      this.exist = false;
      return r;
    });
  }

  get() {
    return this.init(false);
  }
}

module.exports = Model;
