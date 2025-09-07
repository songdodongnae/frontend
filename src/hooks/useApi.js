// src/hooks/useApi.js
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function useApi({ method, url, auto = false, defaultParams = {}, defaultBody = null, deps = [] }) {
  const [data, setData] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [body, setBody] = useState(defaultBody);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (override = {}) => {
    const finalParams = override.params ?? params;
    const finalBody = override.body ?? body;
    const finalUrl = override.url ?? url;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.request({
        method,
        url: finalUrl,
        params: finalParams,
        data: finalBody,
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        withCredentials: true,
      })
      setData(res.data);
      return res.data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [method, url, params, body]);

  useEffect(() => {
    if (auto) execute().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, execute, setParams, setBody };
}
