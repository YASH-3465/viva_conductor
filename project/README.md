# Viva Conducting Website

A modern web application for conducting digital viva examinations with separate interfaces for mentors and students.

## Features

- **Mentor Dashboard**: Create viva blocks, monitor student progress, view results
- **Student Interface**: Join viva blocks, take examinations, get instant results
- **Random Question Selection**: Questions selected based on student's branch and class
- **Real-time Tracking**: Live updates of completed and pending vivas
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Download/Clone the project**
   ```bash
   # If you have the project as a zip file, extract it
   # If cloning from a repository:
   git clone <repository-url>
   cd viva-conducting-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The application will be available at `http://localhost:5173`
   - You'll see the login page where you can choose between Student and Mentor

## Adding Your Own Data

### Question Data Structure

Edit the file `src/data/experiments.ts` to add your own questions and experiments:

```typescript
export const experimentsData: Record<string, Record<string, Question[]>> = {
  'Computer Science': {
    'First Year': [
      {
        id: 'cs1-q1',
        question: 'What is the difference between compilation and interpretation?',
        experiment: 'Programming Fundamentals',
        difficulty: 'easy',
        points: 1
      },
      // Add more questions...
    ],
    'Second Year': [
      // Add questions for second year...
    ]
  },
  // Add more branches...
};
```

### Data Structure Explanation

- **Branch Level**: Main categories like 'Computer Science', 'Electronics', etc.
- **Class Level**: 'First Year', 'Second Year', 'Third Year', 'Fourth Year'
- **Question Object**:
  - `id`: Unique identifier for the question
  - `question`: The actual question text
  - `experiment`: Name of the experiment this question relates to
  - `difficulty`: 'easy', 'medium', or 'hard'
  - `points`: Number of points (usually 1)

## Usage

### For Mentors:
1. Login as Mentor with your name, department, and email
2. Create a new viva block by specifying:
   - Year (2024, 2023, etc.)
   - Branch (Computer Science, Electronics, etc.)
   - Class (First Year, Second Year, etc.)
   - Section (A, B, C, D)
   - Number of students present
3. Share the Block ID with students
4. Monitor student progress in real-time
5. View results and scores

### For Students:
1. Login as Student with your details:
   - Name and Roll Number
   - Branch, Class, Section, Year
2. Join a viva block using the Block ID provided by mentor
3. Start the viva examination
4. Answer 5 randomly selected questions
5. Submit and view your results

## Project Structure

```
src/
├── components/          # React components
│   ├── LoginForm.tsx   # Authentication interface
│   ├── MentorDashboard.tsx
│   └── StudentDashboard.tsx
├── context/            # React context for state management
│   └── AppContext.tsx
├── data/              # Static data files
│   └── experiments.ts # Questions and experiments data
├── types/             # TypeScript type definitions
│   └── index.ts
└── App.tsx           # Main application component
```

## Customization

### Adding New Branches
1. Add branch name to the `branches` array in `LoginForm.tsx`
2. Add corresponding data in `experiments.ts`

### Modifying UI
- Colors and styling can be modified in the Tailwind CSS classes
- The design uses a gradient color scheme with blue/indigo/purple tones

### Adding More Question Types
You can extend the `Question` interface in `src/types/index.ts` to add more fields like:
- Multiple choice options
- Image attachments
- Time limits per question

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **Context API** for state management

## Support

If you encounter any issues:
1. Make sure Node.js is installed and up to date
2. Delete `node_modules` and run `npm install` again
3. Check that all dependencies are properly installed
4. Ensure your data in `experiments.ts` follows the correct format