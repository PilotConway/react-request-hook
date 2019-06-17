workflow "Build on Pull Request" {
  resolves = ["Codecov Action"]
  on = "pull_request"
}

action "Codecov Action" {
  uses = "Atrox/codecov-action@v0.1.3"
  secrets = ["API_CLIENT_CODECOV_TOKEN"]
}
