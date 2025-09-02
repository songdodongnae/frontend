import React, { useState } from 'react';


import usePostFestival from '../../hooks/usePostFestival';
export default function Admin() {

  
  const [posts, setPosts] = useState([]);
  
  const [currentPost, setCurrentPost] = useState({
    title: '',
    content: '',
    type: 'festival',            // festival, restaurant, curation
    author: 'song',              // song, dodong, dong, ne
    createdAt: new Date().toISOString(),
    festivalDetail: {            // type이 festival일 때 사용하는 상세 필드
      title: '',
      creatorName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      timeDescription: '',
      latitude: '',
      longitude: '',
      address: '',
      fee: '',
      contact: '',
      homePageUrl: '',
      reservationUrl: '',
      description: '',
      onelineDescription: '',
      mainImage: '',
      images: ''
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // festivalDetail.* 네임을 분기 처리
    if (name.startsWith('festivalDetail.')) {
      const key = name.replace('festivalDetail.', '');
      setCurrentPost(prev => ({
        ...prev,
        festivalDetail: {
          ...prev.festivalDetail,
          [key]: value
        }
      }));
    } else {
      setCurrentPost(prev => ({ ...prev, [name]: value }));
    }
  };

  const { createFestival, loading: creating, error: createError, data: created } = usePostFestival();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPost.type === 'festival') {
      try {
        await createFestival(currentPost);
        alert('축제가 등록되었습니다.');
      } catch (err) {
        alert('등록 중 오류가 발생했습니다.');
        return;
      }
    }

    // 기존 로컬 리스트 추가/수정 로직 그대로 유지
    if (isEditing) {
      setPosts(prev => prev.map(post =>
        post.id === editingId
          ? { ...currentPost, id: editingId, updatedAt: new Date().toISOString() }
          : post
      ));
      setIsEditing(false);
      setEditingId(null);
    } else {
      setPosts(prev => [{ ...currentPost, id: Date.now(), createdAt: new Date().toISOString() }, ...prev]);
    }

    // 폼 초기화
    setCurrentPost({
      title: '',
      content: '',
      type: 'festival',
      author: 'song',
      createdAt: new Date().toISOString(),
      festivalDetail: {
        title: '',
        creatorName: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        timeDescription: '',
        latitude: '',
        longitude: '',
        address: '',
        fee: '',
        contact: '',
        homePageUrl: '',
        reservationUrl: '',
        description: '',
        onelineDescription: '',
        mainImage: '',
        images: ''
      }
    });
  };

  const handleEdit = (post) => {
    setCurrentPost({
      title: post.title,
      content: post.content,
      type: post.type,
      author: post.author,
      createdAt: post.createdAt,
      festivalDetail: {
        title: post.festivalDetail?.title || '',
        creatorName: post.festivalDetail?.creatorName || '',
        startDate: post.festivalDetail?.startDate || '',
        endDate: post.festivalDetail?.endDate || '',
        startTime: post.festivalDetail?.startTime || '',
        endTime: post.festivalDetail?.endTime || '',
        timeDescription: post.festivalDetail?.timeDescription || '',
        latitude: post.festivalDetail?.latitude ?? '',
        longitude: post.festivalDetail?.longitude ?? '',
        address: post.festivalDetail?.address || '',
        fee: post.festivalDetail?.fee || '',
        contact: post.festivalDetail?.contact || '',
        homePageUrl: post.festivalDetail?.homePageUrl || '',
        reservationUrl: post.festivalDetail?.reservationUrl || '',
        description: post.festivalDetail?.description || '',
        onelineDescription: post.festivalDetail?.onelineDescription || '',
        mainImage: post.festivalDetail?.mainImage || '',
        images: Array.isArray(post.festivalDetail?.images)
          ? post.festivalDetail.images.join(', ')
          : (post.festivalDetail?.images || '')
      }
    });
    setIsEditing(true);
    setEditingId(post.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  const getTypeLabel = (type) => ({ festival: '축제', restaurant: '맛집', curation: '큐레이션' }[type] || type);
  const getTypeColor = (type) =>
    ({ festival: 'bg-yellow-100 text-yellow-800', restaurant: 'bg-red-100 text-red-800', curation: 'bg-blue-100 text-blue-800' }[type] ||
      'bg-gray-100 text-gray-800');
  const getAuthorLabel = (author) => ({ song: '송이', dodong: '도이', dong: '동이', ne: '네이' }[author] || author);
  const getAuthorColor = (author) =>
    ({ song: 'bg-pink-100 text-pink-800', dodong: 'bg-green-100 text-green-800', dong: 'bg-blue-100 text-blue-800', ne: 'bg-purple-100 text-purple-800' }[
      author
    ] || 'bg-gray-100 text-gray-800');

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{isEditing ? '글 수정하기' : 'POST'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={currentPost.title}
            onChange={handleInputChange}
            className="w-full mr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="글 제목"
           
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <select
              name="type"
              value={currentPost.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="festival">축제 (n월의 축제 / 송도 축제 모두보기)</option>
              <option value="restaurant">맛집 (송도 맛집 시리즈)</option>
              <option value="curation">큐레이션</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
            <select
              name="author"
              value={currentPost.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="song">송이</option>
              <option value="dodong">파랑</option>
              <option value="dong">도동이</option>
              
            </select>
          </div>

          {currentPost.type === 'festival' && (
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="festivalDetail.title" value={currentPost.festivalDetail.title} onChange={handleInputChange} className="input" placeholder="행사명(title)" />
                <input name="festivalDetail.creatorName" value={currentPost.festivalDetail.creatorName} onChange={handleInputChange} className="input" placeholder="주최(creatorName)" required/>
                <input name="festivalDetail.startDate" value={currentPost.festivalDetail.startDate} onChange={handleInputChange} className="input" placeholder="시작일(YYYY-MM-DD)" required/>
                <input name="festivalDetail.endDate" value={currentPost.festivalDetail.endDate} onChange={handleInputChange} className="input" placeholder="종료일(YYYY-MM-DD)" required/>
                <input name="festivalDetail.startTime" value={currentPost.festivalDetail.startTime} onChange={handleInputChange} className="input" placeholder="시작시간(HH:MM)" required/>
                <input name="festivalDetail.endTime" value={currentPost.festivalDetail.endTime} onChange={handleInputChange} className="input" placeholder="종료시간(HH:MM)" required/>                
                <input name="festivalDetail.timeDescription" value={currentPost.festivalDetail.timeDescription} onChange={handleInputChange} className="input" placeholder="시간 설명(timeDescription)" required/>
                <input name="festivalDetail.latitude" value={currentPost.festivalDetail.latitude} onChange={handleInputChange} className="input" placeholder="위도(latitude, 숫자)" />
                <input name="festivalDetail.longitude" value={currentPost.festivalDetail.longitude} onChange={handleInputChange} className="input" placeholder="경도(longitude, 숫자)" />
                <input name="festivalDetail.address" value={currentPost.festivalDetail.address} onChange={handleInputChange} className="input" placeholder="주소(address)" />
                <input name="festivalDetail.fee" value={currentPost.festivalDetail.fee} onChange={handleInputChange} className="input" placeholder="요금(fee)" />
                <input name="festivalDetail.contact" value={currentPost.festivalDetail.contact} onChange={handleInputChange} className="input" placeholder="문의(contact)" />
                <input name="festivalDetail.homePageUrl" value={currentPost.festivalDetail.homePageUrl} onChange={handleInputChange} className="input" placeholder="홈페이지 URL" required/>
                <input name="festivalDetail.reservationUrl" value={currentPost.festivalDetail.reservationUrl} onChange={handleInputChange} className="input" placeholder="예약 URL" required/>
                <input name="festivalDetail.mainImage" value={currentPost.festivalDetail.mainImage} onChange={handleInputChange} className="input" placeholder="메인 이미지 URL" required/>
                <input name="festivalDetail.images" value={currentPost.festivalDetail.images} onChange={handleInputChange} className="input md:col-span-2" placeholder="추가 이미지 URL들(쉼표로 구분)" />
                <input name="festivalDetail.onelineDescription" value={currentPost.festivalDetail.onelineDescription} onChange={handleInputChange} className="input md:col-span-2" placeholder="한 줄 설명(onelineDescription)" />
              </div>
              <textarea
                name="festivalDetail.description"
                value={currentPost.festivalDetail.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="상세 소개(description)"
              />
            </div>
          )}

         

          <div className="flex gap-3">
            <button type="submit" disabled={creating} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              {creating ? '등록 중...' : (isEditing ? '수정하기' : '작성하기')}
            </button>
            {createError && <p className="text-sm text-red-500 mt-2">등록 실패: {createError.message}</p>}
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingId(null);
                  setCurrentPost({
                    title: '',
                    content: '',
                    type: 'festival',
                    author: 'song',
                    createdAt: new Date().toISOString(),
                    festivalDetail: {
                      title: '',
                      creatorName: '',
                      startDate: '',
                      endDate: '',
                      startTime: '',
                      endTime: '',
                      timeDescription: '',
                      latitude: '',
                      longitude: '',
                      address: '',
                      fee: '',
                      contact: '',
                      homePageUrl: '',
                      reservationUrl: '',
                      description: '',
                      onelineDescription: '',
                      mainImage: '',
                      images: ''
                    }
                  });
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                취소
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">작성된 글 목록</h2>
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">작성된 글이 없습니다.</div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>{getTypeLabel(post.type)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthorColor(post.author)}`}>{getAuthorLabel(post.author)}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                    </div>
                    {post.type === 'festival' && post.festivalDetail && (
                      <div className="text-xs text-gray-600 mb-2">
                        <span className="mr-3">{post.festivalDetail.startDate} ~ {post.festivalDetail.endDate}</span>
                        <span className="mr-3">{post.festivalDetail.address}</span>
                        <span className="mr-3">{post.festivalDetail.fee}</span>
                      </div>
                    )}
                    <p className="text-gray-600 text-sm mb-2">
                      작성자: {getAuthorLabel(post.author)} | 작성일: {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                      {post.updatedAt && ` | 수정일: ${new Date(post.updatedAt).toLocaleDateString('ko-KR')}`}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleEdit(post)} className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-colors">수정</button>
                    <button onClick={() => handleDelete(post.id)} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">삭제</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}