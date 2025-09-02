import { useState, useCallback } from 'react';
import axios from 'axios';

const authorMap = {
  song: '송이',
  parang: '파랑',
  dodong: '도동',
 
};

const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (!v) return [];
  return String(v).split(',').map(s => s.trim()).filter(Boolean);
};

const toNumberOrNull = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export default function usePostFestival() {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [data, setData]     = useState(null);

  const createFestival = useCallback(async (currentPost) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const fd = currentPost?.festivalDetail ?? {};
      const token = localStorage.getItem('accessToken');

      const payload = {
        title: fd.title,                                // 필수
        creatorName: fd.creatorName || authorMap[currentPost?.author] || currentPost?.author,
        startDate: fd.startDate,                        // 필수
        endDate: fd.endDate,                            // 필수
        startTime: fd.startTime || undefined,           // 선택 (있을 때만 전송)
        endTime: fd.endTime || undefined,               // 선택
        timeDescription: fd.timeDescription || '',
        latitude: toNumberOrNull(fd.latitude),
        longitude: toNumberOrNull(fd.longitude),
        address: fd.address,                            // 필수
        fee: fd.fee || '',
        contact: fd.contact || '',
        homePageUrl: fd.homePageUrl || '',
        reservationUrl: fd.reservationUrl || '',
        description: fd.description || '',
        onelineDescription: fd.onelineDescription,      // 필수
        mainImage: fd.mainImage,                        // 필수
        images: toArray(fd.images),
      };

      // 빈 값(undefined)은 제거해서 보내기
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      const res = await axios.post(
        '/api/festivals',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          withCredentials: true,
        }
      );

      setData(res.data);
      return res.data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createFestival, loading, error, data };
}