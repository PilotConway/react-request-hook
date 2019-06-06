import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import Banner from "./Banner";

export default function UsersList({ users, isLoading, error }) {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !Array.isArray(users)) {
    return <Banner variant="error" message="An error occured loading users." />;
  }

  return (
    <List>
      {users.map(user => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar src={user.avatar_url} />
          </ListItemAvatar>
          <ListItemText primary={user.login} />
        </ListItem>
      ))}
    </List>
  );
}
