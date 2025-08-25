import { Question } from '../types';

export interface EvaluationResult {
  score: number;
  maxScore: number;
  feedback: string;
  keywordMatches: string[];
  suggestions: string[];
}

export function evaluateAnswer(question: Question, studentAnswer: string): EvaluationResult {
  if (!studentAnswer || studentAnswer.trim().length === 0) {
    return {
      score: 0,
      maxScore: question.points,
      feedback: "No answer provided.",
      keywordMatches: [],
      suggestions: ["Please provide an answer to receive marks."]
    };
  }

  const answer = studentAnswer.toLowerCase().trim();
  const keywords = question.keywords.map(k => k.toLowerCase());
  const acceptableAnswers = question.acceptableAnswers?.map(a => a.toLowerCase()) || [];
  
  let score = 0;
  const maxScore = question.points;
  const keywordMatches: string[] = [];
  const suggestions: string[] = [];

  // Check word count
  const wordCount = answer.split(/\s+/).length;
  const minWords = question.minWordCount || 5;
  
  if (wordCount < minWords) {
    suggestions.push(`Try to provide a more detailed answer (minimum ${minWords} words).`);
  }

  // Check for keyword matches
  let keywordScore = 0;
  keywords.forEach(keyword => {
    if (answer.includes(keyword)) {
      keywordMatches.push(keyword);
      keywordScore += 0.2; // Each keyword worth 0.2 points
    }
  });

  // Check for acceptable answer patterns
  let conceptScore = 0;
  acceptableAnswers.forEach(acceptableAnswer => {
    const similarity = calculateSimilarity(answer, acceptableAnswer);
    if (similarity > 0.3) { // 30% similarity threshold
      conceptScore += similarity * 0.6; // Concept understanding worth more
    }
  });

  // Calculate total score
  score = Math.min(maxScore, keywordScore + conceptScore);
  
  // Ensure minimum score for effort
  if (wordCount >= minWords && keywordMatches.length > 0) {
    score = Math.max(score, 0.3); // Minimum 0.3 points for trying
  }

  // Round to 1 decimal place
  score = Math.round(score * 10) / 10;

  // Generate feedback
  let feedback = "";
  if (score >= maxScore * 0.8) {
    feedback = "Excellent answer! You demonstrated good understanding of the concept.";
  } else if (score >= maxScore * 0.6) {
    feedback = "Good answer! You covered most key points.";
  } else if (score >= maxScore * 0.4) {
    feedback = "Fair answer. You mentioned some relevant points but could be more comprehensive.";
  } else if (score > 0) {
    feedback = "Basic answer. Try to include more technical details and key concepts.";
  } else {
    feedback = "Answer needs improvement. Focus on the key concepts and provide more detail.";
  }

  // Add specific suggestions
  if (keywordMatches.length < keywords.length / 2) {
    const missingKeywords = keywords.filter(k => !keywordMatches.includes(k));
    suggestions.push(`Consider including these key terms: ${missingKeywords.slice(0, 3).join(', ')}`);
  }

  if (conceptScore < 0.3) {
    suggestions.push("Try to explain the core concept more clearly with examples.");
  }

  return {
    score,
    maxScore,
    feedback,
    keywordMatches,
    suggestions
  };
}

function calculateSimilarity(text1: string, text2: string): number {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);
  
  let matches = 0;
  words1.forEach(word => {
    if (words2.some(w => w.includes(word) || word.includes(w))) {
      matches++;
    }
  });
  
  return matches / Math.max(words1.length, words2.length);
}

export function calculateVivaScore(evaluations: EvaluationResult[]): {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
} {
  const totalScore = evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0);
  const maxScore = evaluations.reduce((sum, evaluation) => sum + evaluation.maxScore, 0);
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  
  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B+';
  else if (percentage >= 60) grade = 'B';
  else if (percentage >= 50) grade = 'C';
  else if (percentage >= 40) grade = 'D';
  
  return {
    totalScore: Math.round(totalScore * 10) / 10,
    maxScore,
    percentage: Math.round(percentage * 10) / 10,
    grade
  };
}