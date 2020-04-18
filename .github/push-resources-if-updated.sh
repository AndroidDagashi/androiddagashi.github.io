#!/bin/sh
git remote add upstream https://${PUSH_ACCESS_TOKEN}@github.com/${PROJECT_USER_NAME}/${PROJECT_REPO_NAME}.git
git add ./packages/site/static/api ./packages/site/static/feed.xml && git diff --cached --exit-code --quiet || git commit -m "Update stock info" && git push upstream development
