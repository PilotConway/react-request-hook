workflow "Build on Pull Request" {
  resolves = ["eslint"]
  on = "pull_request"
}

action "eslint" {
  uses = "stefanoeb/eslint-action@master"
}
