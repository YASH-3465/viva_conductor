import React, { useState } from 'react';
import { Users, Plus, Clock, CheckCircle, User, Building, Award, Mail, Download, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Mentor, Student } from '../types';

export function MentorDashboard() {
  const { currentUser, activeBlock, createVivaBlock, getBlockSubmissions, logout } = useApp();
  const [showCreateBlock, setShowCreateBlock] = useState(false);
  const [blockForm, setBlockForm] = useState({
    year: '',
    branch: '',
    class: '',
    section: '',
    studentsPresent: ''
  });

  const mentor = currentUser as Mentor;
  const submissions = activeBlock ? getBlockSubmissions(activeBlock.id) : [];

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    createVivaBlock({
      mentorId: mentor.id,
      year: blockForm.year,
      branch: blockForm.branch,
      class: blockForm.class,
      section: blockForm.section,
      studentsPresent: parseInt(blockForm.studentsPresent),
      isActive: true
    });
    setShowCreateBlock(false);
    setBlockForm({ year: '', branch: '', class: '', section: '', studentsPresent: '' });
  };

  const branches = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical'];
  const classes = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
  const sections = ['A', 'B', 'C', 'D'];
  const years = ['2024', '2023', '2022', '2021'];

  // Mock student data for demonstration
  const mockStudents: Student[] = activeBlock ? Array.from({ length: activeBlock.studentsPresent }, (_, i) => ({
    id: `student-${i + 1}`,
    rollNo: `21${activeBlock.branch.substring(0, 2).toUpperCase()}${String(i + 1).padStart(3, '0')}`,
    name: `Student ${i + 1}`,
    branch: activeBlock.branch,
    class: activeBlock.class,
    section: activeBlock.section,
    year: activeBlock.year
  })) : [];

  const completedStudents = mockStudents.slice(0, submissions.length);
  const pendingStudents = mockStudents.slice(submissions.length);

  const exportResults = () => {
    const results = {
      blockInfo: activeBlock,
      submissions: submissions,
      completedStudents: completedStudents.map((student, index) => ({
        ...student,
        score: submissions[index]?.score || 0
      })),
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `viva-results-${activeBlock?.id}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all viva data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mentor Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {mentor.name}</p>
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
        {/* Mentor Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mentor Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{mentor.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{mentor.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{mentor.email}</p>
              </div>
            </div>
          </div>
        </div>

        {!activeBlock ? (
          /* Create Block Section */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Viva Block</h2>
            <p className="text-gray-600 mb-6">Start a new viva session for your students</p>
            
            {!showCreateBlock ? (
              <button
                onClick={() => setShowCreateBlock(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
              >
                Create New Block
              </button>
            ) : (
              <form onSubmit={handleCreateBlock} className="max-w-md mx-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={blockForm.year}
                    onChange={(e) => setBlockForm({ ...blockForm, year: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  
                  <select
                    value={blockForm.branch}
                    onChange={(e) => setBlockForm({ ...blockForm, branch: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={blockForm.class}
                    onChange={(e) => setBlockForm({ ...blockForm, class: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Class</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  
                  <select
                    value={blockForm.section}
                    onChange={(e) => setBlockForm({ ...blockForm, section: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Section</option>
                    {sections.map(section => (
                      <option key={section} value={section}>Section {section}</option>
                    ))}
                  </select>
                </div>

                <input
                  type="number"
                  placeholder="Number of Students Present"
                  value={blockForm.studentsPresent}
                  onChange={(e) => setBlockForm({ ...blockForm, studentsPresent: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="60"
                  required
                />

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Create Block
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateBlock(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Active Block Section */
          <div className="space-y-8">
            {/* Block Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Active Viva Block</h2>
                  <p className="text-gray-600">
                    {activeBlock.year} • {activeBlock.branch} • {activeBlock.class} • Section {activeBlock.section}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Block ID: {activeBlock.id}</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                    Active
                  </div>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={exportResults}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </button>
                    <button
                      onClick={clearAllData}
                      className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear Data
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Students</p>
                      <p className="text-2xl font-bold text-blue-700">{activeBlock.studentsPresent}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Completed</p>
                      <p className="text-2xl font-bold text-green-700">{submissions.length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Pending</p>
                      <p className="text-2xl font-bold text-yellow-700">{activeBlock.studentsPresent - submissions.length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Student Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Completed Students */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  Completed Vivas
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {completedStudents.map((student, index) => {
                    const submission = submissions[index];
                    return (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.rollNo}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-700">{submission?.score || 0}/5</span>
                        </div>
                      </div>
                    );
                  })}
                  {completedStudents.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No students have completed the viva yet</p>
                  )}
                </div>
              </div>

              {/* Pending Students */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Clock className="w-6 h-6 text-yellow-600 mr-2" />
                  Pending Vivas
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {pendingStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.rollNo}</p>
                      </div>
                      <div className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
                        Waiting
                      </div>
                    </div>
                  ))}
                  {pendingStudents.length === 0 && (
                    <p className="text-gray-500 text-center py-8">All students have completed their vivas!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}