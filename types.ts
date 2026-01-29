
export enum Perspective {
  SUPPLIER = '공급자 (전문가 관점)',
  CONSUMER = '소비자 (실사용자 리뷰 관점)'
}

export enum ToneManner {
  PROFESSIONAL = '비즈니스형 (신뢰감 있고 논리적인 스타일)',
  FRIENDLY = '다정한 이웃 (친절하고 공감 가는 스타일)',
  TRENDY = '트렌디 (감각적이고 세련된 스타일)',
  PRACTICAL = '실용주의 (핵심 정보 위주의 간결한 스타일)'
}

export interface BlogInputs {
  topic: string;
  keywords: string;
  productInfo: string;
  perspective: Perspective;
  tone: ToneManner;
  notes: string;
}

export interface GeneratedBlog {
  title: string;
  content: string;
  hashtags: string[];
}
