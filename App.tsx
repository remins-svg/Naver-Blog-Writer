
import React, { useState } from 'react';
import { BlogForm } from './components/BlogForm';
import { BlogPost } from './components/BlogPost';
import { BlogInputs, Perspective, ToneManner } from './types';
import { generateBlogPost } from './services/geminiService';
import { BookOpenIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (inputs: BlogInputs) => {
    setLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const content = await generateBlogPost(inputs);
      setGeneratedContent(content);
      // Scroll to result
      setTimeout(() => {
        const resultElement = document.getElementById('result-section');
        resultElement?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pb-32">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-100">
              <BookOpenIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Naver Blog Writer</h1>
          </div>
          <div className="text-sm font-bold text-green-700 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
            Premium AI v1.2
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 gap-12">
          {/* Intro Section */}
          <section className="bg-gradient-to-br from-green-600 to-emerald-700 p-10 md:p-14 rounded-[2.5rem] border border-green-500 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 flex items-center gap-4">
                <SparklesIcon className="w-10 h-10 md:w-12 md:h-12" />
                완벽한 블로그 글의 시작
              </h2>
              <p className="text-green-50 text-xl md:text-2xl leading-relaxed opacity-95 font-medium max-w-2xl">
                네이버의 검색 로직을 분석한 AI가<br/>
                중복 문서를 완벽히 피해 독창적인 글을 완성해 드립니다.
              </p>
            </div>
            {/* Decoration */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-emerald-400 opacity-20 rounded-full blur-2xl"></div>
          </section>

          {/* Form Section */}
          <section className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-gray-100">
            <div className="mb-10 text-center">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">질문에 답변해 주세요</h3>
              <p className="text-gray-500 text-lg">정보가 구체적일수록 더 놀라운 결과가 나옵니다.</p>
            </div>
            <BlogForm onSubmit={handleSubmit} isLoading={loading} />
          </section>

          {/* Error Message */}
          {error && (
            <div className="p-6 bg-red-50 text-red-700 rounded-3xl border border-red-100 text-center font-bold text-lg shadow-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Result Section */}
          {generatedContent && (
            <div id="result-section" className="scroll-mt-24">
              <BlogPost content={generatedContent} />
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-24 text-center text-gray-400">
        <p className="text-lg font-bold mb-1 text-gray-300">© 2024 Naver Blog Writer</p>
        <p className="text-sm">Created with deep AI optimization for Naver Search Engine.</p>
      </footer>
    </div>
  );
};

export default App;
