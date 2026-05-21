import { useState, useCallback } from 'react';

export const useApi = (apiFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setData(result);
      if (options.onSuccess) options.onSuccess(result);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'حدث خطأ';
      setError(message);
      if (options.onError) options.onError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, options]);

  return { data, loading, error, execute };
};

export const useApiList = (apiFunction, initialFilters = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(initialFilters);

  const fetch = useCallback(async (newFilters = {}) => {
    const allFilters = { ...filters, ...newFilters };
    setFilters(allFilters);
    setLoading(true);
    try {
      const response = await apiFunction(allFilters);
      setItems(response.data || response);
      setTotal(response.total || (response.data?.length || 0));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, filters]);

  return { items, loading, error, total, filters, setFilters, fetch };
};