import React, { useState } from 'react';
import { User, Hash, BookOpen, Clock, Search, CheckCircle, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Student } from '../types';
import { getRandomQuestions } from '../data/experiments';
import { calculateVivaScore } from '../utils/answerEvaluator';

export function StudentDashboard() {
  const { 
    currentUser, 
    vivaBlocks, 
    activeBlock, 
    joinBlock, 
    currentSession,
    startVivaSession,
    answerQuestion,
    nextQuestion,
    completeViva,
    evaluateStudentAnswers,
    logout
  } = useApp();
  
  const [blockId, setBlockId] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  
  const student = currentUser as Student;
  
  // Filter blocks that match student's credentials
  const availableBlocks = vivaBlocks.filter(block => 
    block.year === student.year &&
    block.branch === student.branch &&
    block.class === student.class &&
    block.section === student.section &&
    block.isActive
  );

  const handleJoinBlock = (e: React.FormEvent) => {
    e.preventDefault();
    const success = joinBlock(blockId);
    if (!success) {
      alert('Could not join block. Please check the block ID or your credentials.');
    }
    setBlockId('');
  };

  const handleStartViva = () => {
    const questions = getRandomQuestions(student.branch, student.class, 5);
    if (questions.length === 0) {
      alert('No questions available for your branch and class.');
      return;
    }
    startVivaSession(questions);
  };

  const handleSubmitAnswer = () => {
    answerQuestion(currentAnswer);
    if (currentSession && currentSession.currentQuestionIndex < currentSession.questions.length - 1) {
      nextQuestion();
      setCurrentAnswer('');
    } else {
      completeViva();
      setCurrentAnswer('');
    }
  };

  if (currentSession && !currentSession.isCompleted) {
    // Viva in progress
    const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex];
    const isLastQuestion = currentSession.currentQuestionIndex === currentSession.questions.length - 1;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Viva Examination</h1>
                <p className="text-gray-600 mt-1">Question {currentSession.currentQuestionIndex + 1} of {currentSession.questions.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Time Remaining</p>
                <p className="text-lg font-semibold text-blue-600">5:00</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(((currentSession.currentQuestionIndex + 1) / currentSession.questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSession.currentQuestionIndex + 1) / currentSession.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {currentSession.currentQuestionIndex + 1}
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium mb-2">Experiment: {currentQuestion.experiment}</p>
                    <h2 className="text-xl font-semibold text-gray-800">{currentQuestion.question}</h2>
                  </div>
                </div>
              </div>

              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all shadow-lg"
              >
                {isLastQuestion ? 'Submit Viva' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSession && currentSession.isCompleted) {
    // Viva completed
    const evaluations = evaluateStudentAnswers(currentSession);
    const vivaResult = calculateVivaScore(evaluations);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Viva Completed!</h1>
          <p className="text-gray-600 mb-6">You have successfully completed your viva examination.</p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-700">
                Score: {vivaResult.totalScore}/{vivaResult.maxScore}
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Percentage: {vivaResult.percentage}%</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                vivaResult.grade === 'A+' || vivaResult.grade === 'A' ? 'bg-green-100 text-green-800' :
                vivaResult.grade === 'B+' || vivaResult.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                vivaResult.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Grade: {vivaResult.grade}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Question-wise Performance:</h3>
            <div className="space-y-2">
              {evaluations.map((evaluation, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Question {index + 1}:</span>
                  <span className={`font-medium ${
                    evaluation.score >= evaluation.maxScore * 0.8 ? 'text-green-600' :
                    evaluation.score >= evaluation.maxScore * 0.5 ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {evaluation.score}/{evaluation.maxScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {student.name}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{student.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="font-medium">{student.rollNo}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Branch</p>
                <p className="font-medium">{student.branch}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Class & Section</p>
                <p className="font-medium">{student.class} - {student.section}</p>
              </div>
            </div>
          </div>
        </div>

        {!activeBlock ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Join Block Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Viva Block</h2>
                <p className="text-gray-600">Enter the block ID provided by your mentor</p>
              </div>

              <form onSubmit={handleJoinBlock} className="space-y-4">
                <input
                  type="text"
                  value={blockId}
                  onChange={(e) => setBlockId(e.target.value)}
                  placeholder="Enter Block ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
                >
                  Join Block
                </button>
              </form>
            </div>

            {/* Available Blocks */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Blocks</h2>
              {availableBlocks.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No active viva blocks available for your class</p>
                  <p className="text-gray-400 text-sm mt-2">Please check with your mentor</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableBlocks.map(block => (
                    <div key={block.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {block.branch} - {block.class}
                        </h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Section {block.section} • {block.studentsPresent} students
                      </p>
                      <button
                        onClick={() => joinBlock(block.id)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Join This Block
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* In Active Block */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready for Viva</h2>
            <p className="text-gray-600 mb-2">
              You have joined the viva block for {activeBlock.branch} - {activeBlock.class}
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Section {activeBlock.section} • Block ID: {activeBlock.id}
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Viva Instructions:</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• You will be asked 5 questions (1 mark each)</li>
                <li>• Questions are related to {student.branch} experiments</li>
                <li>• Read each question carefully before answering</li>
                <li>• You can submit your answer and move to the next question</li>
                <li>• Once submitted, you cannot change your answers</li>
              </ul>
            </div>

            <button
              onClick={handleStartViva}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Start Viva Examination
            </button>
          </div>
        )}
      </div>
    </div>
  );
}