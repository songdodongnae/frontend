// src/hooks/httpShortcuts.js
import useApi from './useApi';

export const useGet = (url, defaultParams = {}, auto = true, deps = []) =>
  useApi({ method: 'GET', url, auto: auto && !!url, defaultParams, deps });

export const usePost = (url, defaultBody = null) =>
  useApi({ method: 'POST', url, auto: false, defaultBody });

export const usePatch = (url) =>
  useApi({ method: 'PATCH', url, auto: false });

export const useDelete = (url) =>
  useApi({ method: 'DELETE', url, auto: false });