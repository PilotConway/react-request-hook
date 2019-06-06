import React from 'react';
import client from './client';

export default function useApi(path, emptyValue = []) {
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
