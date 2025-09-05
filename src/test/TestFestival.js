import React, { useState } from 'react';
import { useGet, usePost, useDelete } from '../hooks/festivals';

export default function TestFestival() {
  const [showResult, setShowResult] = useState(false);

  const { data, loading, error, execute: refetch } =
    useGet('/api/festivals', { currentPage: 1, pageSize: 10 }, false, []);

  const { execute: createFestival, loading: creating, error: postError } =
    usePost('/api/festivals');

  // 삭제 훅: URL은 호출 시점에 id로 완성해서 넘김
  const { execute: deleteReq, loading: deleting, error: deleteError } =
    useDelete(null);

  const testData = {
    festivalDetail: {
      title: '송도 원두의 꽃 축제',
      creatorName: '송이',
      startDate: '2024-05-15',
      endDate: '2024-05-20',
      startTime: '21:00',
      endTime: '21:00',
      timeDescription: '매일 10:00-21:00, 우천시 일정 변경',
      homePageUrl: 'https://songdofestival.com',
      reservationUrl: 'https://booking.songdofestival.com',
      onelineDescription: '송도의 아름다운 꽃과 함께하는 춘 축제!',
      description: '설명',
      mainImage: 'https://example.com/festival-main.jpg',
    },
  };

  const handleTest = async () => {
    try {
      await createFestival({ body: { ...testData.festivalDetail } });
      await refetch();
      setShowResult(true);
      alert('등록 성공!');
    } catch (err) {
      alert('등록 실패: ' + (err?.message || err));
    }
  };

  const handleDeleteItem = async (id) => {
    if (!id) return;
    if (!window.confirm(`정말 삭제할까요? (id=${id})`)) return;

    try {
      await deleteReq({ url: `/api/festivals/${id}` });
      await refetch();
    } catch (err) {
      alert('삭제 실패: ' + (err?.message || err));
    }
  };

  const content = data?.data?.content || []; // 백엔드 페이징 스키마 가정

  return (
    <div>
      <button onClick={handleTest} disabled={creating}>
        {creating ? '테스트 중...' : 'POST Festival'}
      </button>

      {postError && <p>작성 에러: {postError.message}</p>}
      {error && <p>조회 에러: {error.message}</p>}
      {deleteError && <p>삭제 에러: {deleteError.message}</p>}
      {(loading || deleting) && <p>로딩 중...</p>}

      {showResult && !loading && Array.isArray(content) && (
        <ul style={{ marginTop: 12 }}>
          {content.map((item) => (
            <li
              key={item.id}
              onClick={() => handleDeleteItem(item.id)}
              style={{
                cursor: 'pointer',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: 6,
                marginBottom: 8,
              }}
              title="클릭해서 삭제"
            >
              {item.title} (id: {item.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}