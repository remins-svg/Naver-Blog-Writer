
import React, { useState, useEffect } from 'react';

interface BlogPostProps {
  content: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ content: initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert('글이 클립보드에 복사되었습니다!');
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('수정사항이 반영되었습니다. 이제 복사하실 수 있습니다.');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-8 py-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
          <span className="bg-green-100 text-green-700 p-1.5 rounded-lg">✍️</span>
          결과물 확인 및 편집
        </h3>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-sm bg-green-600 px-4 py-2 rounded-xl font-bold text-white hover:bg-green-700 transition-all flex items-center gap-1 shadow-md"
            >
              저장하기
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl font-bold text-blue-700 hover:bg-blue-100 transition-all flex items-center gap-1"
            >
              수정하기
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={isEditing}
            className={`text-sm px-4 py-2 rounded-xl font-bold flex items-center gap-1 transition-all ${
              isEditing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            복사하기
          </button>
        </div>
      </div>
      
      <div className="p-8 md:p-12">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[600px] p-6 text-lg md:text-xl text-gray-800 leading-[1.8] border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-green-500 outline-none transition-all resize-none font-sans"
            placeholder="여기에 직접 수정하고 싶은 내용을 입력하세요..."
          />
        ) : (
          <div className="text-gray-900 leading-[2.0] whitespace-pre-wrap text-lg md:text-2xl space-y-4 font-normal">
            {content.split('\n').map((line, i) => {
              if (line.includes('[📸 이미지 추천:')) {
                return (
                  <div key={i} className="my-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm md:text-base font-medium rounded-r-lg">
                    {line}
                  </div>
                );
              }
              return <p key={i}>{line}</p>;
            })}
          </div>
        )}
      </div>

      <div className="bg-green-50 px-8 py-8 border-t border-green-100">
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg text-green-800 font-bold flex items-center gap-2">
            <span>🚀</span> 네이버 블로그 상위 노출 팁
          </p>
          <p className="text-sm md:text-base text-green-700 text-center leading-relaxed font-medium">
            위의 파란색 박스에 적힌 <span className="underline decoration-2">이미지 추천 가이드</span>에 맞춰 직접 찍은 사진을 넣어주세요.<br/>
            텍스트가 모바일에서 보기 좋게 끊어져 있어 체류 시간을 늘리는 데 유리합니다.
          </p>
        </div>
      </div>
    </div>
  );
};
