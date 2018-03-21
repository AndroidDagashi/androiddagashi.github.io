# AndroidDagashi


## Build Setup

[`direnv`](https://github.com/direnv/direnv)をインストール

`envrc.template`を`.envrc`にリネームして、`GH_READONLY_TOKEN`にGitHub Personal Access Tokenを入力する。  
PublicレポジトリならPersonal Access Tokenの権限はすべて外せる。

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev # or yarn dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate # or yarn generate

# deploy to GitHub Pages
$ npm run deploy # or yarn deploy
```
