# git-content

get, create, update and delete action on files inside github repo.

## Installation

```bash
npm i -g git-content
```

### Usage

#### CLI

```bash
git-content help

git-content create --path="test3.json" --content="awesome content" --auth="XXXXXXXXXXX" --owner="niradler" --branch="master" --repo="config"

git-content get --path="test3.json" --auth="XXXXXXXXXXX" --owner="niradler" --branch="master" --repo="config"

git-content update --path="test3.json" --content="new awesome content" --auth="XXXXXXXXXXX" --owner="niradler" --branch="master" --repo="config"

git-content delete --path="test3.json" --auth="XXXXXXXXXXX" --owner="niradler" --branch="master" --repo="config"
```

#### Code

```js
const { Store, Model } = require("git-content");

const store = new Store({ owner, repo, auth, branch });
const model = new Model(store, path);
const { text } = await model.get();
```
