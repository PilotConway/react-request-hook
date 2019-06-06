/**
 * This is a hook for performing a get request on an endpoint
 * The hook returns the value and a loading boolean and an error
 * value if one occurs.
 *
 * ## Usgae
 *
 * ```
 * const [value, isLoading, error] = useClient('/users');
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

export default function useClient(path, emptyValue = []) {
  const [value, setValue] = React.useState(emptyValue);
  const [error, setError] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const [nextLink, setNextLink] = React.useState();
  const [previousLink, setPreviousLink] = React.useState();
  const [currentEndpoint, setCurrentEndpoint] = React.useState(path);

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

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await client.get(currentEndpoint);
        setValue(response.data);

        // If we aren't a paged response, then these will be null
        setNextLink(response.nextLink);
        setPreviousLink(response.previousLink);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [path, currentEndpoint]);
  return [value, isLoading, error, getNext, getPrevious];
}
