import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import Banner from '../Banner';

export default function ReposList({ repos, isLoading, error }) {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !Array.isArray(repos)) {
    const message = (error || {}).statusText || 'An unknown error occured loading users. ';
    return <Banner variant="error" message={message} />;
  }

  return (
    <List>
      {repos.map(repo => (
        <ListItem key={repo.id}>
          <ListItemText primary={repo.name} secondary={repo.description} />
        </ListItem>
      ))}
    </List>
  );
}
