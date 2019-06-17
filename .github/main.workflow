workflow "Link on Push" {
  resolves = ["eslint"]
  on = "push"
}

action "eslint" {
  uses = "stefanoeb/eslint-action@master"
}
