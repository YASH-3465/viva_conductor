export interface Student {
  id: string;
  rollNo: string;
  name: string;
  branch: string;
  class: string;
  section: string;
  year: string;
}

export interface Mentor {
  id: string;
  name: string;
  department: string;
  email: string;
}

export interface Question {
  id: string;
  question: string;
  experiment: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  keywords: string[];
  acceptableAnswers?: string[];
  minWordCount?: number;
}

export interface VivaBlock {
  id: string;
  mentorId: string;
  year: string;
  branch: string;
  class: string;
  section: string;
  studentsPresent: number;
  isActive: boolean;
  createdAt: Date;
}

export interface StudentSubmission {
  studentId: string;
  blockId: string;
  answers: { questionId: string; answer: string }[];
  score: number;
  submittedAt: Date;
}

export interface VivaSession {
  studentId: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: string[];
  isCompleted: boolean;
}