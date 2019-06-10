/**
 * This component renders page buttons, and on click will call the functions
 * to traverse to the request page.
 *
 * Renders null if there are no links.
 *
 * Links that are null have their buttons disabled.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

Pagination.propTypes = {
  links: PropTypes.shape({
    getFirst: PropTypes.func,
    getLast: PropTypes.func,
    getNext: PropTypes.func,
    getPrevious: PropTypes.func,
  }).isRequired,
};

export default function Pagination({ links }) {
  // Don't render if there are no links.
  if (
    links.getFirst === null &&
    links.getLast === null &&
    links.getNext === null &&
    links.getPrevious === null
  ) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
    >
      <Box width={0.2}>
        <Button
          disabled={links.getFirst === null}
          onClick={() => links.getFirst()}
        >
          <FirstPageIcon />
          First
        </Button>
      </Box>
      <Box width={0.3}>
        <Button
          disabled={links.getPrevious === null}
          onClick={() => links.getPrevious()}
        >
          <ChevronLeftIcon />
          Previous
        </Button>
      </Box>
      <Box width={0.3}>
        <Button
          disabled={links.getNext === null}
          onClick={() => links.getNext()}
        >
          Next
          <ChevronRightIcon />
        </Button>
      </Box>
      <Box width={0.2}>
        <Button
          disabled={links.getLast === null}
          onClick={() => links.getLast()}
        >
          Last
          <LastPageIcon />
        </Button>
      </Box>
    </Box>
  );
}
