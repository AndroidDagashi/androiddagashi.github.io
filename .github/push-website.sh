#!/bin/sh
git remote add upstream https://${PUSH_ACCESS_TOKEN}@github.com/${PROJECT_USER_NAME}/${PROJECT_REPO_NAME}.git
yarn deployUpstream
