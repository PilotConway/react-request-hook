workflow "Link on Push" {
  resolves = ["eslint"]
  on = "push"
}

action "eslint" {
  uses = "gimenete/eslint-action@1.0"
}
