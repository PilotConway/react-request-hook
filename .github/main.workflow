workflow "Lint on Push" {
  on       = "push"

  resolves = [
    "eslint"
  ]
}

action "eslint" {
  uses = "stefanoeb/eslint-action@master"
}
