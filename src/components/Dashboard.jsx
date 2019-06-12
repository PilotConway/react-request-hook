/**
 * Simple dashboard of some widgets to show data loading, or failing to load.
 * This is the test component for the <Request> and useClient APIs
 */

import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import UsersCard, { UsersList } from './UsersCard';
import ReposCard from './ReposCard';

import useEndpointData from '../useEndpointData';

export default function Dashboard() {
  const [users, loading, error] = useEndpointData(
    `https://api.github.com/usersdsafasdfa?per_page=5`,
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
        <ReposCard />
      </Box>

      <Box width={{ xs: '100%', md: 350 }} m={2}>
        <Card>
          <CardHeader title="Users with Error" />
          <UsersList users={users} isLoading={loading} error={error} />
        </Card>
      </Box>
    </Box>
  );
}
