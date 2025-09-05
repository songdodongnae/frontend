import React, { useState } from 'react';
import { useGet, usePost, useDelete } from '../../hooks/festivals';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('festival');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // API 훅들
  const { data, loading, error, execute: refetch } = useGet('/api/festivals', { currentPage: 1, pageSize: 100 }, false, []);
  const { execute: createPost, loading: creating, error: createError } = usePost('/api/festivals');
  const { execute: updatePost, loading: updating, error: updateError } = usePost('/api/festivals');
  const { execute: deletePost, loading: deleting, error: deleteError } = useDelete(null);

  console.log("data", data);
  

  const posts = data?.data?.content || [];
  
  console.log("posts", posts)

  const [currentPost, setCurrentPost] = useState({

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
      description: '테스트 설명',
      mainImage: 'https://example.com/festival-main.jpg',
    },
    restaurantDetail: {          // type이 restaurant일 때 사용하는 상세 필드
      title: "송도 파스타 전문점123",
      creatorName: "송이",
      startTime: "21:00",
      endTime: "21:00",
      timeDescription: "월~금 09:00-22:00, 주말 10:00-23:00",
      description: "송도에서 가장 유명한 파스타 전문점으로, 수제 파스타와 신선한 소스가 인상적인 곳입니다.",
      thumbnailImageUrl: "https://example.com/thumbnail.jpg",
      onelineDescription: "송도 최고의 파스타 맛집!"
    },
    curationDetail: {            // type이 curation일 때 사용하는 상세 필드
      title: '',
      description: '',
      places: '',
      mainImage: '',
      images: '',
      tags: '',
      author: ''
    },
    creatorDetail: {             // type이 creator일 때 사용하는 상세 필드
      name: '',
      role: '',
      description: '',
      profileImage: '',
      socialLinks: '',
      specialties: '',
      contact: ''
    }
  });

  const tabs = [
    { id: 'festival', label: '축제' },
    { id: 'restaurant', label: '맛집' },
    { id: 'curation', label: '큐레이션' },
    { id: 'creator', label: '크리에이터' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPost(prev => ({
      ...prev,
      type: tabId
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 각 타입별 detail 필드 처리
    if (name.startsWith('festivalDetail.')) {
      const key = name.replace('festivalDetail.', '');
      setCurrentPost(prev => ({
        ...prev,
        festivalDetail: {
          ...prev.festivalDetail,
          [key]: value
        }
      }));
    } else if (name.startsWith('restaurantDetail.')) {
      const key = name.replace('restaurantDetail.', '');
      setCurrentPost(prev => ({
        ...prev,
        restaurantDetail: {
          ...prev.restaurantDetail,
          [key]: value
        }
      }));
    } else if (name.startsWith('curationDetail.')) {
      const key = name.replace('curationDetail.', '');
      setCurrentPost(prev => ({
        ...prev,
        curationDetail: {
          ...prev.curationDetail,
          [key]: value
        }
      }));
    } else if (name.startsWith('creatorDetail.')) {
      const key = name.replace('creatorDetail.', '');
      setCurrentPost(prev => ({
        ...prev,
        creatorDetail: {
          ...prev.creatorDetail,
          [key]: value
        }
      }));
    } else {
      setCurrentPost(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // 수정 로직
        await updatePost({ 
          url: `/api/festivals/${editingId}`,
          body: { ...currentPost, id: editingId, updatedAt: new Date().toISOString() }
        });
        setIsEditing(false);
        setEditingId(null);
      } else {
        // 생성 로직
        
        await createPost({ body: { ...currentPost.festivalDetail } });
      }
      
      // 데이터 새로고침
      await refetch();
      resetForm();
      alert(isEditing ? '수정되었습니다!' : '등록되었습니다!');
    } catch (err) {
      alert(`${isEditing ? '수정' : '등록'} 실패: ${err?.message || err}`);
    }
  };

  const resetForm = () => {
    setCurrentPost({
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
      },
      restaurantDetail: {
       title: "송도 파스타 전문점123",
       creatorName: "송이",
       startTime: "21:00",
       endTime: "21:00",
       timeDescription: "월~금 09:00-22:00, 주말 10:00-23:00",
       description: "송도에서 가장 유명한 파스타 전문점으로, 수제 파스타와 신선한 소스가 인상적인 곳입니다.",
       thumbnailImageUrl: "https://example.com/thumbnail.jpg",
       onelineDescription: "송도 최고의 파스타 맛집!"
      },
      curationDetail: {
        title: '',
        description: '',
        places: '',
        mainImage: '',
        images: '',
        tags: '',
        author: ''
      },
      creatorDetail: {
        name: '',
        role: '',
        description: '',
        profileImage: '',
        socialLinks: '',
        specialties: '',
        contact: ''
      }
    });
  };

  const handleEdit = (post) => {
    setCurrentPost({
      
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
      },
      restaurantDetail: {
        name: post.restaurantDetail?.name || '',
        category: post.restaurantDetail?.category || '',
        address: post.restaurantDetail?.address || '',
        phone: post.restaurantDetail?.phone || '',
        operatingHours: post.restaurantDetail?.operatingHours || '',
        priceRange: post.restaurantDetail?.priceRange || '',
        description: post.restaurantDetail?.description || '',
        mainImage: post.restaurantDetail?.mainImage || '',
        images: Array.isArray(post.restaurantDetail?.images)
          ? post.restaurantDetail.images.join(', ')
          : (post.restaurantDetail?.images || ''),
        latitude: post.restaurantDetail?.latitude || '',
        longitude: post.restaurantDetail?.longitude || '',
        rating: post.restaurantDetail?.rating || '',
        tags: Array.isArray(post.restaurantDetail?.tags)
          ? post.restaurantDetail.tags.join(', ')
          : (post.restaurantDetail?.tags || '')
      },
      curationDetail: {
        title: post.curationDetail?.title || '',
        description: post.curationDetail?.description || '',
        places: Array.isArray(post.curationDetail?.places)
          ? post.curationDetail.places.join(', ')
          : (post.curationDetail?.places || ''),
        mainImage: post.curationDetail?.mainImage || '',
        images: Array.isArray(post.curationDetail?.images)
          ? post.curationDetail.images.join(', ')
          : (post.curationDetail?.images || ''),
        tags: Array.isArray(post.curationDetail?.tags)
          ? post.curationDetail.tags.join(', ')
          : (post.curationDetail?.tags || ''),
        author: post.curationDetail?.author || ''
      },
      creatorDetail: {
        name: post.creatorDetail?.name || '',
        role: post.creatorDetail?.role || '',
        description: post.creatorDetail?.description || '',
        profileImage: post.creatorDetail?.profileImage || '',
        socialLinks: Array.isArray(post.creatorDetail?.socialLinks)
          ? post.creatorDetail.socialLinks.join(', ')
          : (post.creatorDetail?.socialLinks || ''),
        specialties: Array.isArray(post.creatorDetail?.specialties)
          ? post.creatorDetail.specialties.join(', ')
          : (post.creatorDetail?.specialties || ''),
        contact: post.creatorDetail?.contact || ''
      }
    });
    setActiveTab(post.type);
    setIsEditing(true);
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      try {
        await deletePost({ url: `/api/festivals/${id}` });
        await refetch();
        alert('삭제되었습니다!');
      } catch (err) {
        alert('삭제 실패: ' + (err?.message || err));
      }
    }
  };

  const getTypeLabel = (type) => ({ 
    festival: '축제', 
    restaurant: '맛집', 
    curation: '큐레이션',
    creator: '크리에이터'
  }[type] || type);
  
    
  const getAuthorLabel = (author) => ({ song: '송이', dodong: '도이', dong: '동이', ne: '네이' }[author] || author);
  const getAuthorColor = (author) =>
    ({ song: 'bg-pink-100 text-pink-800', dodong: 'bg-green-100 text-green-800', dong: 'bg-blue-100 text-blue-800', ne: 'bg-purple-100 text-purple-800' }[
      author
    ] || 'bg-gray-100 text-gray-800');

  const renderFormFields = () => {
    switch (activeTab) {
      case 'festival':
        return (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="festivalDetail.title" value={currentPost.festivalDetail.title} onChange={handleInputChange} className="input" placeholder="행사명(title)" required/>     
              <input name="festivalDetail.startDate" value={currentPost.festivalDetail.startDate} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="시작일(YYYY-MM-DD)" required/>
              <input name="festivalDetail.endDate" value={currentPost.festivalDetail.endDate} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="종료일(YYYY-MM-DD)" required/>
              <input name="festivalDetail.startTime" value={currentPost.festivalDetail.startTime} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="시작시간(HH:MM)" required/>
              <input name="festivalDetail.endTime" value={currentPost.festivalDetail.endTime} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="종료시간(HH:MM)" required/>                
              <input name="festivalDetail.timeDescription" value={currentPost.festivalDetail.timeDescription} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="시간 설명(timeDescription)" required/>
              <input name="festivalDetail.latitude" value={currentPost.festivalDetail.latitude} onChange={handleInputChange} className="input" placeholder="위도(latitude, 숫자)" />
              <input name="festivalDetail.longitude" value={currentPost.festivalDetail.longitude} onChange={handleInputChange} className="input" placeholder="경도(longitude, 숫자)" />
              <input name="festivalDetail.address" value={currentPost.festivalDetail.address} onChange={handleInputChange} className="input" placeholder="주소(address)" />
              <input name="festivalDetail.fee" value={currentPost.festivalDetail.fee} onChange={handleInputChange} className="input" placeholder="요금(fee)" />
              <input name="festivalDetail.contact" value={currentPost.festivalDetail.contact} onChange={handleInputChange} className="input" placeholder="문의(contact)" />
              <input name="festivalDetail.homePageUrl" value={currentPost.festivalDetail.homePageUrl} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="홈페이지 URL" required/>
              <input name="festivalDetail.reservationUrl" value={currentPost.festivalDetail.reservationUrl} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="예약 URL" required/>
              <input name="festivalDetail.mainImage" value={currentPost.festivalDetail.mainImage} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="메인 이미지 URL" required/>
              <input name="festivalDetail.images" value={currentPost.festivalDetail.images} onChange={handleInputChange} className="input md:col-span-2" placeholder="추가 이미지 URL들(쉼표로 구분)" />
              <input name="festivalDetail.onelineDescription" value={currentPost.festivalDetail.onelineDescription} onChange={handleInputChange} className="input md:col-span-2" placeholder="한 줄 설명(onelineDescription)" />
            </div>
            <textarea
              name="festivalDetail.description"
              value={currentPost.festivalDetail.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-red-50 border-red-300 focus:ring-red-500"
              placeholder="상세 소개(description)"
              required
            />
          </div>
        );

      case 'restaurant':
        return (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="restaurantDetail.name" value={currentPost.restaurantDetail.name} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="맛집명(name)" required/>
              <input name="restaurantDetail.category" value={currentPost.restaurantDetail.category} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="카테고리(category)" required/>
              <input name="restaurantDetail.address" value={currentPost.restaurantDetail.address} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="주소(address)" required/>
              <input name="restaurantDetail.phone" value={currentPost.restaurantDetail.phone} onChange={handleInputChange} className="input" placeholder="전화번호(phone)" />
              <input name="restaurantDetail.operatingHours" value={currentPost.restaurantDetail.operatingHours} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="운영시간(operatingHours)" required/>
              <input name="restaurantDetail.priceRange" value={currentPost.restaurantDetail.priceRange} onChange={handleInputChange} className="input" placeholder="가격대(priceRange)" />
              <input name="restaurantDetail.latitude" value={currentPost.restaurantDetail.latitude} onChange={handleInputChange} className="input" placeholder="위도(latitude)" />
              <input name="restaurantDetail.longitude" value={currentPost.restaurantDetail.longitude} onChange={handleInputChange} className="input" placeholder="경도(longitude)" />
              <input name="restaurantDetail.rating" value={currentPost.restaurantDetail.rating} onChange={handleInputChange} className="input" placeholder="평점(rating)" />
              <input name="restaurantDetail.tags" value={currentPost.restaurantDetail.tags} onChange={handleInputChange} className="input md:col-span-2" placeholder="태그들(쉼표로 구분)" />
              <input name="restaurantDetail.mainImage" value={currentPost.restaurantDetail.mainImage} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="메인 이미지 URL" required/>
              <input name="restaurantDetail.images" value={currentPost.restaurantDetail.images} onChange={handleInputChange} className="input md:col-span-2" placeholder="추가 이미지 URL들(쉼표로 구분)" />
            </div>
            <textarea
              name="restaurantDetail.description"
              value={currentPost.restaurantDetail.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-red-50 border-red-300 focus:ring-red-500"
              placeholder="맛집 소개(description)"
              required
            />
          </div>
        );

      case 'curation':
        return (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="curationDetail.title" value={currentPost.curationDetail.title} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="큐레이션 제목(title)" required/>
              <input name="curationDetail.author" value={currentPost.curationDetail.author} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="큐레이션 작성자(author)" required/>
              <input name="curationDetail.places" value={currentPost.curationDetail.places} onChange={handleInputChange} className="input md:col-span-2" placeholder="포함된 장소들(쉼표로 구분)" />
              <input name="curationDetail.tags" value={currentPost.curationDetail.tags} onChange={handleInputChange} className="input md:col-span-2" placeholder="태그들(쉼표로 구분)" />
              <input name="curationDetail.mainImage" value={currentPost.curationDetail.mainImage} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="메인 이미지 URL" required/>
              <input name="curationDetail.images" value={currentPost.curationDetail.images} onChange={handleInputChange} className="input md:col-span-2" placeholder="추가 이미지 URL들(쉼표로 구분)" />
            </div>
            <textarea
              name="curationDetail.description"
              value={currentPost.curationDetail.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-red-50 border-red-300 focus:ring-red-500"
              placeholder="큐레이션 설명(description)"
              required
            />
          </div>
        );

      case 'creator':
        return (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="creatorDetail.name" value={currentPost.creatorDetail.name} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="크리에이터 이름(name)" required/>
              <input name="creatorDetail.role" value={currentPost.creatorDetail.role} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="역할(role)" required/>
              <input name="creatorDetail.contact" value={currentPost.creatorDetail.contact} onChange={handleInputChange} className="input" placeholder="연락처(contact)" />
              <input name="creatorDetail.specialties" value={currentPost.creatorDetail.specialties} onChange={handleInputChange} className="input md:col-span-2" placeholder="전문 분야들(쉼표로 구분)" />
              <input name="creatorDetail.socialLinks" value={currentPost.creatorDetail.socialLinks} onChange={handleInputChange} className="input md:col-span-2" placeholder="소셜 링크들(쉼표로 구분)" />
              <input name="creatorDetail.profileImage" value={currentPost.creatorDetail.profileImage} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="프로필 이미지 URL" required/>
            </div>
            <textarea
              name="creatorDetail.description"
              value={currentPost.creatorDetail.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-red-50 border-red-300 focus:ring-red-500"
              placeholder="크리에이터 소개(description)"
              required
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* 탭 네비게이션 */}
      
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin</h1>
        <div className="flex space-x-1 mb-4 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {isEditing ? '글 수정하기' : `${tabs.find(tab => tab.id === activeTab)?.label} 작성하기`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
         

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
            <select
              name="author"
              value={currentPost.festivalDetail.creatorName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="song">송이</option>
              <option value="dodong">파랑</option>
              <option value="dong">도동이</option>
            </select>
          </div>

          {renderFormFields()}

          <div className="flex gap-3">
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {isEditing ? '수정하기' : '작성하기'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingId(null);
                  resetForm();
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
        {loading && <div className="text-center py-8 text-gray-500">로딩 중...</div>}
        {/* {error && <div className="text-center py-8 text-red-500">에러: {error.message}</div>}
        {deleteError && <div className="text-center py-8 text-red-500">삭제 에러: {deleteError.message}</div>} */}
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">작성된 글이 없습니다.</div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white text-black border border-gray-300`}>{getTypeLabel(post.type)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthorColor(post.author)}`}>{getAuthorLabel(post.author)}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      ID: {post.id} |
                      작성자: {getAuthorLabel(post.creatorName)} | 작성일: {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                      {post.updatedAt && ` | 수정일: ${new Date(post.updatedAt).toLocaleDateString('ko-KR')}`}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
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