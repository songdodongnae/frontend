// src/hooks/useApi.js
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

/**
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} method
 * @param {string} url
 * @param {boolean} [auto=false]
 * @param {object} [defaultParams={}]
 * @param {any} [defaultBody=null]
 * @param {any[]} [deps=[]]
 * @param {'auto'|true|false} [auth='auto']  // ← 토큰 부착 정책
 *   - 'auto': 토큰 있으면 붙이고 없으면 안 붙임(기본)
 *   - true:  반드시 토큰 필요(최대 300ms 대기 후 붙임)
 *   - false: 절대 Authorization 안 붙임(공개 엔드포인트용)
 * @param {boolean} [withCredentials=false]  // 쿠키 인증 쓸 때만 true
 */
export default function useApi({
  method,
  url,
  auto = false,
  defaultParams = {},
  defaultBody = null,
  deps = [],
  auth = 'auto',
  withCredentials = false,
}) {
  const [data, setData] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [body, setBody] = useState(defaultBody);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const waitForTokenIfNeeded = async () => {
    if (auth === true) {
      const start = Date.now();
      while (!localStorage.getItem('accessToken') && Date.now() - start < 300) {
        await new Promise((r) => setTimeout(r, 50));
      }
    }
  };

  const execute = useCallback(async (override = {}) => {
    const finalParams = override.params ?? params;
    const finalBody = override.body ?? body;
    let finalUrl = override.url ?? url;

    // url이 없으면 요청하지 않음
    if (!finalUrl) {
      setData(null);
      return null;
    }

    // 상대 경로인 경우 절대 경로로 변환
    if (finalUrl.startsWith('/api')) {
      finalUrl = `${window.location.origin}${finalUrl}`;
    }

    setLoading(true);
    setError(null);

    try {
      await waitForTokenIfNeeded();
      // Authorization 부착 정책
      const token = localStorage.getItem('accessToken');
      const shouldAttachAuth =
        auth === true ? true :
        auth === false ? false :
        !!token; // 'auto'

      const headers = {
        accept: '*/*',
        ...(finalBody != null ? { 'Content-Type': 'application/json' } : {}),
        ...(shouldAttachAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      };

      console.log('=== API 요청 상세 정보 ===');
      console.log('Method:', method);
      console.log('URL:', finalUrl);
      console.log('Headers:', headers);
      console.log('Body:', finalBody);
      console.log('Params:', finalParams);
      console.log('Auth:', auth);
      console.log('Should Attach Auth:', shouldAttachAuth);
      console.log('========================');

      const res = await axios.request({
        method,
        url: finalUrl,
        params: finalParams,
        data: finalBody,
        headers,
        withCredentials,
      });

      setData(res.data);
      return res.data;
    } catch (e) {
      console.error('=== API 요청 실패 ===');
      console.error('Error:', e);
      console.error('Response:', e.response);
      console.error('==================');
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url, params, body, auth, withCredentials]);

  useEffect(() => {
    // url 없으면 자동 호출 금지
    if (auto && url) execute().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, execute, setParams, setBody };
}
