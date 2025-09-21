// src/hooks/httpShortcuts.js
import useApi from './useApi';

export const useGet = (url, defaultParams = {}, auto = true, deps = [], auth = 'auto') =>
  useApi({ method: 'GET', url, auto: auto && !!url, defaultParams, deps, auth });

export const usePost = (url, defaultBody = null, auth = 'auto') =>
  useApi({ method: 'POST', url, auto: false, defaultBody, auth });

export const usePatch = (url, auth = true) =>
  useApi({ method: 'PATCH', url, auto: false, auth });

export const useDelete = (url, auth = true) =>
  useApi({ method: 'DELETE', url, auto: false, auth });