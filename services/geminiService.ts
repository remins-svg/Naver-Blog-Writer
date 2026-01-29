
import { GoogleGenAI } from "@google/genai";
import { BlogInputs } from "../types";

export const generateBlogPost = async (inputs: BlogInputs): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    당신은 네이버 블로그 '상위 노출'과 '체류 시간'을 극대화하는 15년 경력의 베테랑 마케터이자 전문 작가입니다. 
    사용자의 입력 정보를 바탕으로, 검색 엔진이 '독창적인 정보성 글'로 인식하도록 포스팅을 작성하세요.

    [입력 정보]
    1. 주제: ${inputs.topic}
    2. 키워드: ${inputs.keywords}
    3. 제품정보/URL: ${inputs.productInfo}
    4. 관점: ${inputs.perspective}
    5. 톤앤매너: ${inputs.tone}
    6. 참고사항: ${inputs.notes}
    
    [핵심 작성 규칙 - 반드시 준수]
    1. **절대 복제 금지 (Refer Only)**: 
       - 기존의 다른 블로그 글을 그대로 가져오거나 베끼지 마세요. 
       - 제공된 정보를 완벽히 소화하여 완전히 새로운 구조와 문장으로 재구성하세요.
       - 중복 문서 필터링에 걸리지 않도록 독창적인 비유나 실제 상황 묘사를 추가하세요.

    2. **이미지 가이드 삽입**:
       - 글 중간중간 이미지가 들어가면 좋을 위치에 [📸 이미지 추천: 사진 설명] 형태의 프롬프트를 넣어주세요.
       - 예: [📸 이미지 추천: 깔끔하게 정리된 주방의 전경 사진]

    3. **모바일 최적화 줄바꿈 (Mobile-First)**: 
       - 의미 단위로 아주 짧게 끊어서 줄바꿈을 하세요. 
       - 한 줄에 최대 15자 내외가 되도록 엔터를 자주 치세요.
       예시:
       오늘은
       많은 분들이 궁금해하시는
       홈페이지 구성에 대해
       이야기해볼게요.

    4. **가독성 및 구조화**:
       - 제목은 시선을 확 끄는 스타일로 뽑으세요.
       - 소주제 번호와 이모지를 풍부하게 사용하세요.
       - 문체는 '${inputs.tone}'을 유지하되, 전문성을 잃지 마세요.

    포스팅 본문 내용만 바로 출력해 주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9, // 독창성을 위해 창의성 수치 상향
        topP: 0.95,
      },
    });

    return response.text || "글을 생성하는 데 실패했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("AI 글 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  }
};
