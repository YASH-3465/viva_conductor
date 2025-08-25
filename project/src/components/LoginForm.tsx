import React, { useState } from 'react';
import { User, GraduationCap, Mail, Hash, Building } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Student, Mentor } from '../types';

export function LoginForm() {
  const [userType, setUserType] = useState<'student' | 'mentor'>('student');
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    // Student fields
    rollNo: '',
    branch: '',
    class: '',
    section: '',
    year: '',
    // Mentor fields
    department: '',
    email: ''
  });

  const { login } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === 'student') {
      const student: Student = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        rollNo: formData.rollNo,
        branch: formData.branch,
        class: formData.class,
        section: formData.section,
        year: formData.year
      };
      login(student, 'student');
    } else {
      const mentor: Mentor = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        department: formData.department,
        email: formData.email
      };
      login(mentor, 'mentor');
    }
  };

  const branches = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical'];
  const classes = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
  const sections = ['A', 'B', 'C', 'D'];
  const years = ['2024', '2023', '2022', '2021'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Viva Portal</h1>
          <p className="text-gray-600 mt-2">Welcome to the digital viva examination system</p>
        </div>

        {/* User Type Toggle */}
        <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === 'student'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType('mentor')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === 'mentor'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mentor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Student Fields */}
          {userType === 'student' && (
            <>
              <div className="relative">
                <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>

                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Section</option>
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>

                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Mentor Fields */}
          {userType === 'mentor' && (
            <>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="">Department</option>
                {branches.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all shadow-lg"
          >
            Continue as {userType === 'student' ? 'Student' : 'Mentor'}
          </button>
        </form>
      </div>
    </div>
  );
}