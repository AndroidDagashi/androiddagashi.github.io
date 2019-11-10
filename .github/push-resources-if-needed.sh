#!/bin/sh
if [[ -z "$(git status -s)" ]]; then
  echo "Nothing to commit"
else
  git add ./static/api
  git add ./static/feed.xml
  git commit --allow-empty -m "Update stock info"
  git remote add upstream https://${GITHUB_TOKEN}@github.com/${PROJECT_USERNAME}/${PROJECT_REPONAME}
  git push upstream development
fi
