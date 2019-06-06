/**
 * Simple dashboard of some widgets to show data loading, or failing to load.
 * This is the test component for the <Request> and useClient APIs
 */

import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import UsersCard, { UsersList } from './UsersCard';
import ReposList from './ReposList';

import useClient from '../useClient';

export default function Dashboard() {
  const [errorUsers, errorUsersLoading, errorUsersError] = useClient(
    `https://api.github.com/usersdsafasdfa?per_page=5`,
  );
  const [repos, reposLoading, reposError] = useClient(
    `https://api.github.com/orgs/storybookjs/repos?per_page=5`,
  );
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Box width={{ xs: '100%', md: 350 }} m={2}>
        <UsersCard />
      </Box>

      <Box width={{ xs: '100%', md: 350 }} m={2}>
        <Card>
          <CardHeader title="Repositories" />
          <ReposList
            repos={repos}
            isLoading={reposLoading}
            error={reposError}
          />
        </Card>
      </Box>

      <Box width={{ xs: '100%', md: 350 }} m={2}>
        <Card>
          <CardHeader title="Users with Error" />
          <UsersList
            users={errorUsers}
            isLoading={errorUsersLoading}
            error={errorUsersError}
          />
        </Card>
      </Box>
    </Box>
  );
}
