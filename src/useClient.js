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
  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const value = await client.get(path);
        setValue(value);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [path]);
  return [value, isLoading, error];
}
