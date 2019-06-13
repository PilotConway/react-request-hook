/**
 * This is a hook for performing a get request on an endpoint
 * The hook returns the value and a loading boolean and an error
 * value if one occurs.
 *
 * ## Usage
 *
 * ```
 * const [value, isLoading, error, links, clients] = useClient('/users');
 *
 * ## TODO:
 *  - [ ] Currently only accepts full urls as the endpoint.
 *  - [ ] It should also allow for editing headers
 *  - [ ] Allow for passing paramas as an object.
 *  - [ ] Can we do a put/post/delete with this?
 *  - [ ] Should return the client object  maybe? Get it from useContext
 * ```
 */
import React from 'react';
import client from './client';

const defaultOptions = {
  // TODO: deprecate: this doesn't really make sense, just make it null
  emptyValue: [],
  params: {},
};

export default function useEndpointData(path, options) {
  const computedOptions = { ...defaultOptions, ...options };
  const [value, setValue] = React.useState(computedOptions.emptyValue);
  const [error, setError] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const [currentEndpoint, setCurrentEndpoint] = React.useState(path);

  // Links for paginated routes. These will be set to null if the links don't exist
  // on the API response.
  const [nextLink, setNextLink] = React.useState();
  const [previousLink, setPreviousLink] = React.useState();
  const [firstLink, setFirstLink] = React.useState();
  const [lastLink, setLastLink] = React.useState();

  let getNext = null;
  if (nextLink) {
    getNext = () => {
      setCurrentEndpoint(nextLink);
    };
  }

  let getPrevious = null;
  if (previousLink) {
    getPrevious = () => {
      setCurrentEndpoint(previousLink);
    };
  }

  let getFirst = null;
  if (firstLink) {
    getFirst = () => {
      setCurrentEndpoint(firstLink);
    };
  }

  let getLast = null;
  if (lastLink) {
    getLast = () => {
      setCurrentEndpoint(lastLink);
    };
  }

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await client.get(currentEndpoint);
        setValue(response.data);

        // If we aren't a paged response, then these will be null
        setNextLink(response.links.next);
        setPreviousLink(response.links.prev);
        setFirstLink(response.links.first);
        setLastLink(response.links.last);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [path, currentEndpoint]);
  return [
    value,
    isLoading,
    error,
    { getNext, getPrevious, getFirst, getLast },
    client,
  ];
}
