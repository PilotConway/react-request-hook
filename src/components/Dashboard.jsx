import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import UsersList from './UsersList';
import ReposList from './ReposList';

import useClient from '../useClient';
import Request from '../Request';

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
        <Card>
          <CardHeader title="Users" />
          <Request endpoint="https://api.github.com/users?per_page=5">
            {({ loading, error, data }) => (
              <UsersList users={data} isLoading={loading} error={error} />
            )}
          </Request>
        </Card>
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
