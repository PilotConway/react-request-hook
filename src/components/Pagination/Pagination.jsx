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
          First
        </Button>
      </Box>
      <Box width={0.3}>
        <Button
          disabled={links.getPrevious === null}
          onClick={() => links.getPrevious()}
        >
          Previous
        </Button>
      </Box>
      <Box width={0.3}>
        <Button
          disabled={links.getNext === null}
          onClick={() => links.getNext()}
        >
          Next
        </Button>
      </Box>
      <Box width={0.2}>
        <Button
          disabled={links.getLast === null}
          onClick={() => links.getLast()}
        >
          Last
        </Button>
      </Box>
    </Box>
  );
}
