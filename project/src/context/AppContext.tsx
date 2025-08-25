import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';
import { Student, Mentor, VivaBlock, StudentSubmission, VivaSession } from '../types';
import { evaluateAnswer, EvaluationResult } from '../utils/answerEvaluator';

interface AppContextType {
  // Authentication
  currentUser: Student | Mentor | null;
  userType: 'student' | 'mentor' | null;
  login: (user: Student | Mentor, type: 'student' | 'mentor') => void;
  logout: () => void;

  // Viva Blocks
  vivaBlocks: VivaBlock[];
  activeBlock: VivaBlock | null;
  createVivaBlock: (block: Omit<VivaBlock, 'id' | 'createdAt'>) => void;
  joinBlock: (blockId: string) => boolean;
  setActiveBlock: (block: VivaBlock | null) => void;

  // Viva Sessions
  currentSession: VivaSession | null;
  startVivaSession: (questions: any[]) => void;
  answerQuestion: (answer: string) => void;
  nextQuestion: () => void;
  completeViva: () => void;

  // Submissions
  submissions: StudentSubmission[];
  addSubmission: (submission: StudentSubmission) => void;
  getBlockSubmissions: (blockId: string) => StudentSubmission[];
  
  // Answer Evaluation
  evaluateStudentAnswers: (session: VivaSession) => EvaluationResult[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Load data from localStorage on initialization
  const [currentUser, setCurrentUser] = useState<Student | Mentor | null>(() => {
    const saved = localStorage.getItem('viva-current-user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [userType, setUserType] = useState<'student' | 'mentor' | null>(() => {
    const saved = localStorage.getItem('viva-user-type');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [vivaBlocks, setVivaBlocks] = useState<VivaBlock[]>(() => {
    const saved = localStorage.getItem('viva-blocks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeBlock, setActiveBlock] = useState<VivaBlock | null>(() => {
    const saved = localStorage.getItem('viva-active-block');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [currentSession, setCurrentSession] = useState<VivaSession | null>(() => {
    const saved = localStorage.getItem('viva-current-session');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    const saved = localStorage.getItem('viva-submissions');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('viva-current-user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('viva-user-type', JSON.stringify(userType));
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('viva-blocks', JSON.stringify(vivaBlocks));
  }, [vivaBlocks]);

  useEffect(() => {
    localStorage.setItem('viva-active-block', JSON.stringify(activeBlock));
  }, [activeBlock]);

  useEffect(() => {
    localStorage.setItem('viva-current-session', JSON.stringify(currentSession));
  }, [currentSession]);

  useEffect(() => {
    localStorage.setItem('viva-submissions', JSON.stringify(submissions));
  }, [submissions]);
  const login = (user: Student | Mentor, type: 'student' | 'mentor') => {
    setCurrentUser(user);
    setUserType(type);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    setActiveBlock(null);
    setCurrentSession(null);
    // Clear localStorage on logout
    localStorage.removeItem('viva-current-user');
    localStorage.removeItem('viva-user-type');
    localStorage.removeItem('viva-active-block');
    localStorage.removeItem('viva-current-session');
  };

  const createVivaBlock = (blockData: Omit<VivaBlock, 'id' | 'createdAt'>) => {
    const newBlock: VivaBlock = {
      ...blockData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    setVivaBlocks(prev => [...prev, newBlock]);
    setActiveBlock(newBlock);
  };

  const joinBlock = (blockId: string): boolean => {
    const block = vivaBlocks.find(b => b.id === blockId);
    if (!block || !currentUser || userType !== 'student') return false;
    
    const student = currentUser as Student;
    const canJoin = block.year === student.year && 
                   block.branch === student.branch && 
                   block.class === student.class && 
                   block.section === student.section;
    
    if (canJoin) {
      setActiveBlock(block);
    }
    return canJoin;
  };

  const startVivaSession = (questions: any[]) => {
    if (!currentUser || userType !== 'student') return;
    
    setCurrentSession({
      studentId: currentUser.id,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false
    });
  };

  const answerQuestion = (answer: string) => {
    setCurrentSession(prev => {
      if (!prev) return prev;
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answer;
      return { ...prev, answers: newAnswers };
    });
  };

  const nextQuestion = () => {
    setCurrentSession(prev => {
      if (!prev || prev.currentQuestionIndex >= prev.questions.length - 1) return prev;
      return { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 };
    });
  };

  const completeViva = () => {
    if (!currentSession || !activeBlock) return;
    
    // Evaluate answers using the new evaluation system
    const evaluations = evaluateStudentAnswers(currentSession);
    const totalScore = evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0);
    
    const submission: StudentSubmission = {
      studentId: currentSession.studentId,
      blockId: activeBlock.id,
      answers: currentSession.questions.map((q, i) => ({
        questionId: q.id,
        answer: currentSession.answers[i] || ''
      })),
      score: Math.round(totalScore * 10) / 10,
      submittedAt: new Date()
    };
    
    addSubmission(submission);
    setCurrentSession({ ...currentSession, isCompleted: true });
  };

  const evaluateStudentAnswers = (session: VivaSession): EvaluationResult[] => {
    return session.questions.map((question, index) => {
      const studentAnswer = session.answers[index] || '';
      return evaluateAnswer(question, studentAnswer);
    });
  };
  const addSubmission = (submission: StudentSubmission) => {
    setSubmissions(prev => [...prev, submission]);
  };

  const getBlockSubmissions = (blockId: string) => {
    return submissions.filter(s => s.blockId === blockId);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      userType,
      login,
      logout,
      vivaBlocks,
      activeBlock,
      createVivaBlock,
      joinBlock,
      setActiveBlock,
      currentSession,
      startVivaSession,
      answerQuestion,
      nextQuestion,
      completeViva,
      submissions,
      addSubmission,
      getBlockSubmissions,
      evaluateStudentAnswers
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}