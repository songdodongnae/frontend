import React from 'react';
import usePostFestival from '../hooks/usePostFestival';

export default function TestFestival() {
  const { createFestival, loading, error, data } = usePostFestival();

  const testData = {
    type: 'festival',
    author: 'song',
    festivalDetail: {
      title: '테스트 축제',
      startDate: '2024-12-01',
      endDate: '2024-12-01',
      address: '인천 연수구 송도동',
      onelineDescription: '테스트용 축제',
      mainImage: 'https://picsum.photos/400/300'
    }
  };

  const handleTest = async () => {
    try {
      await createFestival(testData);
      alert('테스트 성공!');
    } catch (err) {
      alert('테스트 실패: ' + err.message);
    }
  };

  return (
    <div>
      <button onClick={handleTest} disabled={loading}>
        {loading ? '테스트 중...' : '훅 테스트'}
      </button>
      {error && <p>에러: {error.message}</p>}
      {data && <p>성공: {JSON.stringify(data)}</p>}
    </div>
  );
}
