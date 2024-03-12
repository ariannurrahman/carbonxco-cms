export interface Faq {
  answer: string;
  createdAt: string;
  id: string;
  is_archived: string;
  question: string;
  updatedAt: string;
}

export interface FaqPayload {
  question: string;
  answer: string;
}
