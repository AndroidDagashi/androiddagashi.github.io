#!/bin/sh
git remote add upstream https://${GITHUB_TOKEN}@github.com/${PROJECT_USERNAME}/${PROJECT_REPONAME}.git
git add ./static/api ./static/feed.xml && git diff --cached --exit-code --quiet || git commit -m "Update stock info" && git push upstream development

# if [[ -z "$(git status -s)" ]]; then
#   echo "Nothing to commit"
# else
#   git add ./static/api
#   git add ./static/feed.xml
#   git commit --allow-empty -m "Update stock info"
#   git remote add upstream https://${GITHUB_TOKEN}@github.com/${PROJECT_USERNAME}/${PROJECT_REPONAME}
#   git push upstream development
# fi
