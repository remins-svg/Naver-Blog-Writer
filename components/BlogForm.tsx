
import React, { useState } from 'react';
import { BlogInputs, Perspective, ToneManner } from '../types';

interface BlogFormProps {
  onSubmit: (inputs: BlogInputs) => void;
  isLoading: boolean;
}

export const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BlogInputs>({
    topic: '',
    keywords: '',
    productInfo: '',
    perspective: Perspective.SUPPLIER,
    tone: ToneManner.PROFESSIONAL,
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePerspectiveChange = (val: Perspective) => {
    setFormData(prev => ({ ...prev, perspective: val }));
  };

  const handleToneChange = (val: ToneManner) => {
    setFormData(prev => ({ ...prev, tone: val }));
  };

  const isFormValid = formData.topic.trim().length > 0;

  return (
    <div className="space-y-10">
      {/* 1. Topic */}
      <div className="space-y-4">
        <label className="block text-lg md:text-xl font-bold text-gray-800">
          1. 작성 주제 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="topic"
          placeholder="어떤 주제로 글을 써볼까요? (예: 업종별 홈페이지 구성법)"
          value={formData.topic}
          onChange={handleChange}
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-green-50 focus:border-green-500 outline-none transition-all shadow-sm"
          required
        />
      </div>

      {/* 2. Keywords */}
      <div className="space-y-4">
        <label className="block text-lg md:text-xl font-bold text-gray-800">
          2. 핵심 키워드 (상위 노출 희망)
        </label>
        <input
          type="text"
          name="keywords"
          placeholder="쉼표(,)로 구분해서 3개 정도 적어주세요"
          value={formData.keywords}
          onChange={handleChange}
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-green-50 focus:border-green-500 outline-none transition-all shadow-sm"
        />
      </div>

      {/* 3. Product Info */}
      <div className="space-y-4">
        <label className="block text-lg md:text-xl font-bold text-gray-800">
          3. 홍보 대상 (브랜드/URL)
        </label>
        <textarea
          name="productInfo"
          rows={2}
          placeholder="제품명, 회사명, 홈페이지 주소 등을 입력해 주세요"
          value={formData.productInfo}
          onChange={handleChange}
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-green-50 focus:border-green-500 outline-none transition-all resize-none shadow-sm"
        />
      </div>

      {/* 4. Perspective */}
      <div className="space-y-4">
        <label className="block text-lg md:text-xl font-bold text-gray-800">
          4. 작성자 관점
        </label>
        <div className="flex gap-4">
          {Object.values(Perspective).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePerspectiveChange(p)}
              className={`flex-1 py-4 px-6 rounded-2xl text-base md:text-lg font-bold transition-all border-2 ${
                formData.perspective === p
                  ? 'bg-green-600 border-green-600 text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-green-200 hover:text-green-600'
              }`}
            >
              {p.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Tone & Manner */}
      <div className="space-y-4">
        <label className="block text-lg md:text-xl font-bold text-gray-800">
          5. 문체 스타일 (톤앤매너)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(ToneManner).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleToneChange(t)}
              className={`py-5 px-6 rounded-2xl text-left flex flex-col gap-2 transition-all border-2 ${
                formData.tone === t
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-inner ring-1 ring-emerald-500'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200'
              }`}
            >
              <span className="text-lg font-bold">{t.split('(')[0].trim()}</span>
              <span className="text-sm opacity-70 leading-snug">({t.split('(')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Notes */}
      <div className="space-y-4">
        <label className="block text-lg md:text-xl font-bold text-gray-800">
          6. 추가 요청/참고사항
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="꼭 강조하고 싶은 포인트나 스타일이 있다면 자유롭게 적어주세요"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-green-50 focus:border-green-500 outline-none transition-all resize-none shadow-sm"
        />
      </div>

      <button
        onClick={() => onSubmit(formData)}
        disabled={isLoading || !isFormValid}
        className={`w-full py-5 rounded-2xl text-xl font-black transition-all shadow-xl ${
          isLoading || !isFormValid
            ? 'bg-gray-200 cursor-not-allowed text-gray-400 shadow-none'
            : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            독창적인 글을 작성하는 중...
          </div>
        ) : (
          '블로그 글 생성하기'
        )}
      </button>
    </div>
  );
};
