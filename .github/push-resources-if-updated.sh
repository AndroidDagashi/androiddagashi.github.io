#!/bin/sh
git remote set-url origin https://${GITHUB_TOKEN}@github.com/${PROJECT_USER_NAME}/${PROJECT_REPO_NAME}.git
git add ./static/api ./static/feed.xml && git diff --cached --exit-code --quiet || git commit -m "Update stock info" && git push origin development

# if [[ -z "$(git status -s)" ]]; then
#   echo "Nothing to commit"
# else
#   git add ./static/api
#   git add ./static/feed.xml
#   git commit --allow-empty -m "Update stock info"
#   git remote add upstream https://${GITHUB_TOKEN}@github.com/${PROJECT_USERNAME}/${PROJECT_REPONAME}
#   git push upstream development
# fi
