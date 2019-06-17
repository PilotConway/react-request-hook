workflow "Build on Pull Request" {
  resolves = ["Codecov Action"]
  on = "pull_request"
}

action "eslint" {
  uses = "gimenete/eslint-action@1.0"
}
