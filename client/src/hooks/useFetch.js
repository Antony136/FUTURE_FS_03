import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data fetching hook.
 * @param {Function} fetchFn - The API function to call
 * @param {any[]} deps - Dependencies that trigger re-fetch
 * @param {boolean} immediate - Whether to fetch on mount (default true)
 */
const useFetch = (fetchFn, deps = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn(...args);
      setData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong.';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (immediate) execute();
  }, [execute]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: execute };
};

export default useFetch;
