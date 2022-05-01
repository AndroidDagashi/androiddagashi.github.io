# AndroidDagashi

[![Actions Status](https://github.com/AndroidDagashi/androiddagashi.github.io/workflows/Deploy%20Website/badge.svg)](https://github.com/AndroidDagashi/androiddagashi.github.io/actions)
[![Actions Status](https://github.com/AndroidDagashi/androiddagashi.github.io/workflows/Update%20Json%20files/badge.svg)](https://github.com/AndroidDagashi/androiddagashi.github.io/actions)

## Build Setup

[`direnv`](https://github.com/direnv/direnv)をインストール

`envrc.template`を`.envrc`にリネームして、`GH_READONLY_TOKEN`にGitHub Personal Access Tokenを入力する。  
PublicレポジトリならPersonal Access Tokenの権限はすべて外せる。

パッケージマネージャはyarnを利用。
yarnの[workspace機能](https://classic.yarnpkg.com/ja/docs/workspaces/)を使っているため、npmでは動かない。

```bash
# install dependencies
$ yarn install

# generate api jsons
$ yarn api:generate

# generate rss feed
$ yarn rss:generate

# serve with hot reload at localhost:3000
$ yarn site:dev

# generate static project
$ yarn site:generate
```

## Workspaces

TBD


## Others

### delete all node_modules in this repo.

```
$ find . -name 'node_modules' -type d -exec rm -rf {} \;
```
