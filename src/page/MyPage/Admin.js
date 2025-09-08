import React, { useState, useEffect } from 'react';
import { useGet, usePost, useDelete } from '../../hooks/httpShortcuts';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('festivals');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  
  
 const { data, loading, error, execute: refetch } = useGet(
    editingId ? `/api/${activeTab}/${editingId}` : null, 
    { currentPage: 1, pageSize: 100 }, 
    !!editingId, // editingId가 있을 때만 auto 실행
    [editingId]
  );
  const { execute: createPost, loading: creating, error: createError } = usePost(`/api/${activeTab}`);
  const { execute: updatePost, loading: updating, error: updateError } = usePost('/api/festivals');
  const { execute: deletePost, loading: deleting, error: deleteError } = useDelete(null);

  console.log("data", data);

  const posts = data?.data?.content || [];
  const itemData = item?.data || [];
  
  console.log("posts", posts);
  console.log("activeTab", activeTab);

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
      latitude: '',
      longitude: '',
      address: '',
      fee: '',
      contact: '',
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
      onelineDescription: "송도 최고의 파스타 맛집!",
      latitude: '',
      longitude: '',
      address: '',
      price: '',
      naverRating: '',
      kakaoRating: '',
      waiting: '',
      parking: '',
      suggestionMenu: '',
      imageUrls: '',
      instagram: '',
      contact: ''
    },
    curationDetail: {            // type이 curation일 때 사용하는 상세 필드
      type: 'DELICIOUS_SPOT',
      ids: [0],
      creatorName: "송이",
      title: "송도 1만원대 맛집 5개",
      description: "설명",
      imageUrl: ""
    },
    creatorDetail: {             // type이 creator일 때 사용하는 상세 필드
      "name": "송이",
      "introduction": "매콤한 음식을 좋아하는 크리에이터",
      "description": "string",
      "image": "string"
    }
  });

  const tabs = [
    { id: 'festivals', label: '축제' },
    { id: 'delicious-spots', label: '맛집' },
    { id: 'curations', label: '큐레이션' },
    { id: 'creator', label: '크리에이터' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    resetForm(); // 폼 초기화
  };

  const getCurrentAuthorValue = () => {
    switch (activeTab) {
      case 'festivals':
        return currentPost.festivalDetail.creatorName;
      case 'delicious-spots':
        return currentPost.restaurantDetail.creatorName;
      case 'curations':
        return currentPost.curationDetail.creatorName;
      case 'creator':
        return currentPost.creatorDetail.name;
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // author 필드 처리
    if (name === 'author') {
      switch (activeTab) {
        case 'festivals':
          setCurrentPost(prev => ({
            ...prev,
            festivalDetail: {
              ...prev.festivalDetail,
              creatorName: value
            }
          }));
          break;
        case 'delicious-spots':
          setCurrentPost(prev => ({
            ...prev,
            restaurantDetail: {
              ...prev.restaurantDetail,
              creatorName: value
            }
          }));
          break;
        case 'curations':
          setCurrentPost(prev => ({
            ...prev,
            curationDetail: {
              ...prev.curationDetail,
              creatorName: value
            }
          }));
          break;
        case 'creator':
          setCurrentPost(prev => ({
            ...prev,
            creatorDetail: {
              ...prev.creatorDetail,
              name: value
            }
          }));
          break;
      }
      return;
    }
    
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
          [key]: key === 'ids' 
            ? value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
            : value
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
          url: `/api/${activeTab}/${editingId}`,
          body: { ...currentPost, id: editingId, updatedAt: new Date().toISOString() }
        });
        setIsEditing(false);
        setEditingId(null);
      } else {
        // 생성 로직 - 탭별로 다른 데이터 전송
        let postData;
        switch (activeTab) {
          case 'festivals':
            postData = currentPost.festivalDetail;
            break;
          case 'delicious-spots':
            postData = currentPost.restaurantDetail;
            break;
          case 'curations':
            postData = currentPost.curationDetail; // 위 JSON 형식의 데이터
            break;
          case 'creator':
            postData = currentPost.creatorDetail;
            break;
          default:
            postData = currentPost.festivalDetail;
        }
        
        await createPost({ body: postData });
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
        title: '송도 원두의 꽃 축제',
        creatorName: '송이',
        startDate: '2024-05-15',
        endDate: '2024-05-20',
        startTime: '11:00',
        endTime: '21:00',
        timeDescription: '매일 10:00-21:00, 우천시 일정 변경',
        homePageUrl: 'https://songdofestival.com',
        reservationUrl: 'https://booking.songdofestival.com',
        onelineDescription: '송도의 아름다운 꽃과 함께하는 춘 축제!',
        description: '테스트 설명',
        mainImage: 'https://example.com/festival-main.jpg',            
        latitude: '',
        longitude: '',
        address: '',
        fee: '',
        contact: '',
        images: []
      },
      restaurantDetail: {
       title: "송도 파스타 전문점123",
       creatorName: "송이",
       startTime: "12:00",
       endTime: "19:00",
       timeDescription: "월~금 09:00-22:00, 주말 10:00-23:00",
       description: "송도에서 가장 유명한 파스타 전문점으로, 수제 파스타와 신선한 소스가 인상적인 곳입니다.",
       thumbnailImageUrl: "https://example.com/thumbnail.jpg",
       onelineDescription: "송도 최고의 파스타 맛집!",
       latitude: '',
       longitude: '',
       price: '',
       naverRating: '',
       kakaoRating: '',
       wating: '',
       parking: '',
       suggestionMenu: '',
       imageUrls: [],
       instagram: '',
       contact: ''
      },
      curationDetail: {
        type: 'DELICIOUS_SPOT',
        ids: [0],
        creatorName: "송이",
        title: "송도 1만원대 맛집 5개",
        description: "새 설명",
        imageUrl: "asdf"
       
      },
      creatorDetail: {
        "name": "송이",
        "introduction": "매콤한 음식을 좋아하는 크리에이터",
        "description": "string",
        "image": "string"
      }
    });
  };
  console.log('response', item)
  const handleEdit = (post) => {
    setIsEditing(true);
    setEditingId(post.id);
  };

  // itemData가 로드되면 폼을 업데이트하는 useEffect 추가
  useEffect(() => {
    if (isEditing && itemData && Object.keys(itemData).length > 0) {
      setCurrentPost({
        festivalDetail: {
          title: itemData.title || '',
          creatorName: itemData.creatorName || '',
          startDate: itemData.startDate || '',
          endDate: itemData.endDate || '',
          startTime: itemData.startTime || '',
          endTime: itemData.endTime || '',
          timeDescription: itemData.timeDescription || '',
          latitude: itemData.latitude || '',
          longitude: itemData.longitude || '',
          address: itemData.address || '',
          fee: itemData.fee || '',
          contact: itemData.contact || '',
          homePageUrl: itemData.homePageUrl || '',
          reservationUrl: itemData.reservationUrl || '',
          description: itemData.description || '',
          onelineDescription: itemData.onelineDescription || '',
          mainImage: itemData.mainImage || '',
          images: Array.isArray(itemData.images)
            ? itemData.images.join(', ')
            : (itemData.images || '')
        },
        restaurantDetail: {
          title: itemData.title || '',
          creatorName: itemData.creatorName || '',
          latitude: itemData.latitude || '',
          longitude: itemData.longitude || '',
          address: itemData.address || '',
          price: itemData.price || '',
          naverRating: itemData.naverRating || '',
          kakaoRating: itemData.kakaoRating || '',
          startTime: itemData.startTime || '',
          endTime: itemData.endTime || '',
          timeDescription: itemData.timeDescription || '',
          waiting: itemData.waiting || '',
          parking: itemData.parking || '',
          suggestionMenu: itemData.suggestionMenu || '',
          description: itemData.description || '',
          thumbnailImageUrl: itemData.thumbnailImageUrl || '',
          imageUrls: Array.isArray(itemData.imageUrls)
            ? itemData.imageUrls.join(', ')
            : (itemData.imageUrls || ''),
          onelineDescription: itemData.onelineDescription || '',
          instagram: itemData.instagram || '',
          contact: itemData.contact || ''
        },
        curationDetail: {
          type: itemData.type || 'DELICIOUS_SPOT',
          ids: Array.isArray(itemData.ids) ? itemData.ids : (itemData.ids || []),
          creatorName: itemData.creatorName || '',
          title: itemData.title || '',
          description: itemData.description || '',
          imageUrl: itemData.imageUrl || ''
        },
        creatorDetail: {
          name: itemData.name || '',
          description: itemData.description || '',
          image: itemData.image || '',
          introduction: itemData.introduction || ''
        }
      });
    }
  }, [isEditing, itemData]);

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      try {
        await deletePost({ url: `/api/${activeTab}/${id}` });
        await refetch();
        alert('삭제되었습니다!');
      } catch (err) {
        alert('삭제 실패: ' + (err?.message || err));
      }
    }
  };

  const getTypeLabel = (type) => ({ 
    festival: '축제', 
    'delicious-spot': '맛집', 
  
  }[type] || type);
  
    
  const getAuthorLabel = (author) => ({ song: '송이', parang: '파랑', dodong: '도동' }[author] || author);
  const getAuthorColor = (author) =>
    ({ song: 'bg-pink-100 text-pink-800', dodong: 'bg-green-100 text-green-800', parang: 'bg-blue-100 text-blue-800' }[
      author
    ] || 'bg-gray-100 text-gray-800');

  const renderFormFields = () => {
    switch (activeTab) {
      case 'festivals':
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

      case 'delicious-spots':
        return (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="restaurantDetail.title" value={currentPost.restaurantDetail.title} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="맛집명(title)" required/>
            <input name="restaurantDetail.latitude" value={currentPost.restaurantDetail.latitude} onChange={handleInputChange} className="input" placeholder="위도(latitude)" />
            <input name="restaurantDetail.longitude" value={currentPost.restaurantDetail.longitude} onChange={handleInputChange} className="input" placeholder="경도(longitude)" />
            <input name="restaurantDetail.address" value={currentPost.restaurantDetail.address} onChange={handleInputChange} className="input " placeholder="주소(address)" />
            <input name="restaurantDetail.price" value={currentPost.restaurantDetail.price} onChange={handleInputChange} className="input" placeholder="가격(price)" />
            <input name="restaurantDetail.naverRating" value={currentPost.restaurantDetail.naverRating} onChange={handleInputChange} className="input" placeholder="네이버 평점(naverRating)" />
            <input name="restaurantDetail.kakaoRating" value={currentPost.restaurantDetail.kakaoRating} onChange={handleInputChange} className="input" placeholder="카카오 평점(kakaoRating)" />
            <input name="restaurantDetail.startTime" value={currentPost.restaurantDetail.startTime} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="시작시간(startTime)" required/>
            <input name="restaurantDetail.endTime" value={currentPost.restaurantDetail.endTime} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="종료시간(endTime)" required/>
            <input name="restaurantDetail.timeDescription" value={currentPost.restaurantDetail.timeDescription} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="운영시간 설명(timeDescription)" required/>
            <input name="restaurantDetail.waiting" value={currentPost.restaurantDetail.waiting} onChange={handleInputChange} className="input" placeholder="대기시간(waiting)" />
            <input name="restaurantDetail.parking" value={currentPost.restaurantDetail.parking} onChange={handleInputChange} className="input" placeholder="주차 정보(parking)" />
            <input name="restaurantDetail.suggestionMenu" value={currentPost.restaurantDetail.suggestionMenu} onChange={handleInputChange} className="input" placeholder="추천 메뉴(suggestionMenu)" />
            <input name="restaurantDetail.thumbnailImageUrl" value={currentPost.restaurantDetail.thumbnailImageUrl} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="썸네일 이미지 URL" required/>
            <input name="restaurantDetail.imageUrls" value={currentPost.restaurantDetail.imageUrls} onChange={handleInputChange} className="input " placeholder="추가 이미지 URL들(쉼표로 구분)" />
            <input name="restaurantDetail.onelineDescription" value={currentPost.restaurantDetail.onelineDescription} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="한 줄 설명(onelineDescription)" required/>
            <input name="restaurantDetail.instagram" value={currentPost.restaurantDetail.instagram} onChange={handleInputChange} className="input" placeholder="인스타그램(instagram)" />
            <input name="restaurantDetail.contact" value={currentPost.restaurantDetail.contact} onChange={handleInputChange} className="input" placeholder="연락처(contact)" />
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

      case 'curations':
        return (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="curationDetail.title" value={currentPost.curationDetail.title} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="큐레이션 제목(title)" required/>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">타입(type)</label>
                <select
                  name="curationDetail.type"
                  value={currentPost.curationDetail.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="FESTIVAL">축제</option>
                  <option value="DELICIOUS_SPOT">맛집</option>
                </select>
              </div>
              <input name="curationDetail.ids" value={Array.isArray(currentPost.curationDetail.ids) ? currentPost.curationDetail.ids.join(', ') : currentPost.curationDetail.ids} onChange={handleInputChange} className="input md:col-span-2" placeholder="포함된 ID들(쉼표로 구분)" />
              <input name="curationDetail.imageUrl" value={currentPost.curationDetail.imageUrl} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="이미지 URL" required/>
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
              <input name="creatorDetail.introduction" value={currentPost.creatorDetail.introduction} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="introcuction" required/>
              <input name="creatorDetail.image" value={currentPost.creatorDetail.image} onChange={handleInputChange} className="input bg-red-50 border-red-300 focus:ring-red-500" placeholder="프로필 이미지 URL" required/>
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
         

          {activeTab != 'creator'? <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
            <select
              name="author"
              value={getCurrentAuthorValue()}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="song">송이</option>
              <option value="dodong">도동</option>
              <option value="parang">파랑</option>
            </select>
          </div>: ''}

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
        <h2 className="text-xl font-semibold text-gray-700 mb-4">LIST</h2>
        {loading && <div className="text-center py-8 text-gray-500">로딩 중...</div>}
        {/* {error && <div className="text-center py-8 text-red-500">에러: {error.message}</div>}
        {deleteError && <div className="text-center py-8 text-red-500">삭제 에러: {deleteError.message}</div>} */}
        
        {loading ? (
          ''
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {post.type? <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white text-black border border-gray-300`}> {getTypeLabel(post.type)} </span> : '' }
                      {post.creatorName? <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthorColor(post.creatorName)}`}>{getAuthorLabel(post.creatorName)}</span> : '' }
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