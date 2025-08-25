import { Question } from '../types';

export const experimentsData: Record<string, Record<string, Question[]>> = {
  'Computer Science': {
    'First Year': [
      {
        id: 'cs1-q1',
        question: 'What is the difference between compilation and interpretation?',
        experiment: 'Programming Fundamentals',
        difficulty: 'easy',
        points: 1,
        keywords: ['compilation', 'interpreter', 'compiler', 'source code', 'machine code', 'runtime', 'translate'],
        acceptableAnswers: [
          'compilation converts entire source code to machine code before execution',
          'interpretation executes code line by line at runtime',
          'compiler translates whole program at once',
          'interpreter translates and executes simultaneously'
        ],
        minWordCount: 10
      },
      {
        id: 'cs1-q2',
        question: 'Explain the concept of variables and data types in programming.',
        experiment: 'Programming Fundamentals',
        difficulty: 'easy',
        points: 1,
        keywords: ['variable', 'data type', 'integer', 'string', 'float', 'boolean', 'memory', 'storage'],
        acceptableAnswers: [
          'variables store data values in memory',
          'data types define what kind of data can be stored',
          'integer stores whole numbers',
          'string stores text data'
        ],
        minWordCount: 8
      },
      {
        id: 'cs1-q3',
        question: 'What is the purpose of loops in programming? Give examples.',
        experiment: 'Control Structures',
        difficulty: 'medium',
        points: 1,
        keywords: ['loop', 'iteration', 'for', 'while', 'repeat', 'condition', 'control structure'],
        acceptableAnswers: [
          'loops repeat a block of code multiple times',
          'for loop iterates a specific number of times',
          'while loop continues until condition becomes false',
          'loops help avoid code repetition'
        ],
        minWordCount: 12
      },
      {
        id: 'cs1-q4',
        question: 'Explain the working of if-else statements with flowchart.',
        experiment: 'Control Structures',
        difficulty: 'medium',
        points: 1,
        keywords: ['if', 'else', 'condition', 'boolean', 'decision', 'flowchart', 'branch'],
        acceptableAnswers: [
          'if statement executes code when condition is true',
          'else statement executes when condition is false',
          'flowchart shows decision diamond with yes/no paths',
          'conditional execution based on boolean expression'
        ],
        minWordCount: 10
      },
      {
        id: 'cs1-q5',
        question: 'What are functions and why are they important?',
        experiment: 'Functions and Procedures',
        difficulty: 'easy',
        points: 1,
        keywords: ['function', 'procedure', 'reusable', 'modular', 'parameter', 'return', 'code organization'],
        acceptableAnswers: [
          'functions are reusable blocks of code',
          'functions help organize code into modules',
          'functions can accept parameters and return values',
          'functions reduce code duplication'
        ],
        minWordCount: 8
      },
      {
        id: 'cs1-q6',
        question: 'Differentiate between call by value and call by reference.',
        experiment: 'Functions and Procedures',
        difficulty: 'medium',
        points: 1,
        keywords: ['call by value', 'call by reference', 'parameter', 'copy', 'address', 'memory', 'original'],
        acceptableAnswers: [
          'call by value passes copy of variable',
          'call by reference passes memory address',
          'call by value does not modify original variable',
          'call by reference can modify original variable'
        ],
        minWordCount: 12
      },
      {
        id: 'cs1-q7',
        question: 'What is an algorithm? Write an algorithm to find the largest of three numbers.',
        experiment: 'Problem Solving',
        difficulty: 'easy',
        points: 1,
        keywords: ['algorithm', 'step by step', 'procedure', 'largest', 'compare', 'maximum', 'logic'],
        acceptableAnswers: [
          'algorithm is step by step procedure to solve problem',
          'compare first two numbers and find larger',
          'compare result with third number',
          'systematic approach to problem solving'
        ],
        minWordCount: 15
      },
      {
        id: 'cs1-q8',
        question: 'Explain the concept of arrays and their applications.',
        experiment: 'Data Structures Basics',
        difficulty: 'medium',
        points: 1,
        keywords: ['array', 'collection', 'elements', 'index', 'data structure', 'homogeneous', 'memory'],
        acceptableAnswers: [
          'array is collection of similar data elements',
          'elements accessed using index numbers',
          'arrays store data in contiguous memory locations',
          'used for storing lists of data'
        ],
        minWordCount: 10
      }
    ],
    'Second Year': [
      {
        id: 'cs2-q1',
        question: 'What is Object-Oriented Programming? Explain its key principles.',
        experiment: 'OOP Concepts',
        difficulty: 'medium',
        points: 1,
        keywords: ['object oriented', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'class', 'object'],
        acceptableAnswers: [
          'OOP is programming paradigm based on objects',
          'encapsulation bundles data and methods together',
          'inheritance allows classes to inherit properties',
          'polymorphism enables multiple forms of same method'
        ],
        minWordCount: 15
      },
      {
        id: 'cs2-q2',
        question: 'Differentiate between stack and queue data structures.',
        experiment: 'Data Structures',
        difficulty: 'medium',
        points: 1,
        keywords: ['stack', 'queue', 'LIFO', 'FIFO', 'push', 'pop', 'enqueue', 'dequeue'],
        acceptableAnswers: [
          'stack follows LIFO principle',
          'queue follows FIFO principle',
          'stack operations are push and pop',
          'queue operations are enqueue and dequeue'
        ],
        minWordCount: 12
      },
      {
        id: 'cs2-q3',
        question: 'Explain the working of binary search algorithm.',
        experiment: 'Searching Algorithms',
        difficulty: 'medium',
        points: 1,
        keywords: ['binary search', 'sorted array', 'divide', 'middle element', 'logarithmic', 'efficient'],
        acceptableAnswers: [
          'binary search works on sorted arrays',
          'divides array into half each iteration',
          'compares target with middle element',
          'time complexity is O(log n)'
        ],
        minWordCount: 12
      },
      {
        id: 'cs2-q4',
        question: 'What is database normalization? Explain 1NF, 2NF, and 3NF.',
        experiment: 'Database Management',
        difficulty: 'hard',
        points: 1,
        keywords: ['normalization', '1NF', '2NF', '3NF', 'redundancy', 'atomic', 'functional dependency'],
        acceptableAnswers: [
          'normalization reduces data redundancy',
          '1NF requires atomic values in each cell',
          '2NF eliminates partial functional dependencies',
          '3NF eliminates transitive dependencies'
        ],
        minWordCount: 20
      },
      {
        id: 'cs2-q5',
        question: 'Explain the concept of inheritance in OOP with an example.',
        experiment: 'OOP Concepts',
        difficulty: 'medium',
        points: 1,
        keywords: ['inheritance', 'parent class', 'child class', 'extends', 'reusability', 'is-a relationship'],
        acceptableAnswers: [
          'inheritance allows class to inherit properties from another class',
          'child class extends parent class',
          'promotes code reusability',
          'example: Car class inherits from Vehicle class'
        ],
        minWordCount: 12
      },
      {
        id: 'cs2-q6',
        question: 'What are linked lists? Explain their advantages and disadvantages.',
        experiment: 'Data Structures',
        difficulty: 'medium',
        points: 1,
        keywords: ['linked list', 'node', 'pointer', 'dynamic', 'memory', 'insertion', 'deletion'],
        acceptableAnswers: [
          'linked list is dynamic data structure',
          'consists of nodes connected by pointers',
          'advantage: dynamic size allocation',
          'disadvantage: no random access to elements'
        ],
        minWordCount: 15
      },
      {
        id: 'cs2-q7',
        question: 'Describe the working of merge sort algorithm.',
        experiment: 'Sorting Algorithms',
        difficulty: 'hard',
        points: 1,
        keywords: ['merge sort', 'divide and conquer', 'recursive', 'merge', 'stable', 'O(n log n)'],
        acceptableAnswers: [
          'merge sort uses divide and conquer approach',
          'recursively divides array into smaller parts',
          'merges sorted subarrays back together',
          'time complexity is O(n log n)'
        ],
        minWordCount: 15
      },
      {
        id: 'cs2-q8',
        question: 'What is polymorphism? Explain with examples.',
        experiment: 'OOP Concepts',
        difficulty: 'medium',
        points: 1,
        keywords: ['polymorphism', 'multiple forms', 'method overloading', 'method overriding', 'runtime'],
        acceptableAnswers: [
          'polymorphism means multiple forms of same method',
          'method overloading: same name different parameters',
          'method overriding: child class redefines parent method',
          'enables runtime method selection'
        ],
        minWordCount: 12
      }
    ],
    'Third Year': [
      {
        id: 'cs3-q1',
        question: 'Explain the concept of database transactions and ACID properties.',
        experiment: 'Database Management Lab',
        difficulty: 'hard',
        points: 1,
        keywords: ['transaction', 'ACID', 'atomicity', 'consistency', 'isolation', 'durability', 'database'],
        acceptableAnswers: [
          'transaction is a unit of work that must be completed entirely or not at all',
          'ACID stands for Atomicity Consistency Isolation Durability',
          'atomicity ensures all operations complete or none do',
          'consistency maintains database integrity'
        ],
        minWordCount: 15
      },
      {
        id: 'cs3-q2',
        question: 'What is the difference between TCP and UDP protocols?',
        experiment: 'Computer Networks Lab',
        difficulty: 'medium',
        points: 1,
        keywords: ['TCP', 'UDP', 'reliable', 'unreliable', 'connection', 'connectionless', 'protocol'],
        acceptableAnswers: [
          'TCP is connection-oriented and reliable',
          'UDP is connectionless and unreliable',
          'TCP provides error checking and recovery',
          'UDP is faster but no guarantee of delivery'
        ],
        minWordCount: 12
      }
    ]
  },
  'Electronics': {
    'First Year': [
      {
        id: 'ec1-q1',
        question: 'What is Ohm\'s Law? State and explain with examples.',
        experiment: 'Basic Electrical Laws',
        difficulty: 'easy',
        points: 1,
        keywords: ['ohm law', 'voltage', 'current', 'resistance', 'V=IR', 'proportional'],
        acceptableAnswers: [
          'voltage is directly proportional to current',
          'V equals I times R',
          'resistance opposes current flow',
          'fundamental law of electrical circuits'
        ],
        minWordCount: 10
      },
      {
        id: 'ec1-q2',
        question: 'Explain the difference between AC and DC current.',
        experiment: 'Current and Voltage',
        difficulty: 'easy',
        points: 1,
        keywords: ['AC', 'DC', 'alternating', 'direct', 'frequency', 'direction', 'sine wave'],
        acceptableAnswers: [
          'AC current changes direction periodically',
          'DC current flows in one direction only',
          'AC has frequency and amplitude variations',
          'DC maintains constant voltage level'
        ],
        minWordCount: 8
      },
      {
        id: 'ec1-q3',
        question: 'What are resistors? Explain color coding of resistors.',
        experiment: 'Resistor Networks',
        difficulty: 'medium',
        points: 1,
        keywords: ['resistor', 'resistance', 'color code', 'bands', 'ohm', 'tolerance'],
        acceptableAnswers: [
          'resistors limit current flow in circuits',
          'color bands indicate resistance value',
          'first two bands show significant digits',
          'third band shows multiplier value'
        ],
        minWordCount: 12
      },
      {
        id: 'ec1-q4',
        question: 'Define capacitor and explain its working principle.',
        experiment: 'Capacitors and Inductors',
        difficulty: 'medium',
        points: 1,
        keywords: ['capacitor', 'charge', 'electric field', 'dielectric', 'plates', 'energy storage'],
        acceptableAnswers: [
          'capacitor stores electrical energy in electric field',
          'consists of two conducting plates separated by dielectric',
          'stores charge when voltage is applied',
          'releases stored energy when needed'
        ],
        minWordCount: 10
      },
      {
        id: 'ec1-q5',
        question: 'What is the function of a transformer?',
        experiment: 'Transformers',
        difficulty: 'easy',
        points: 1,
        keywords: ['transformer', 'voltage', 'step up', 'step down', 'magnetic field', 'coils'],
        acceptableAnswers: [
          'transformer changes voltage levels',
          'step up transformer increases voltage',
          'step down transformer decreases voltage',
          'works on electromagnetic induction principle'
        ],
        minWordCount: 8
      },
      {
        id: 'ec1-q6',
        question: 'Explain Kirchhoff\'s current and voltage laws.',
        experiment: 'Circuit Analysis',
        difficulty: 'medium',
        points: 1,
        keywords: ['kirchhoff', 'current law', 'voltage law', 'node', 'loop', 'conservation'],
        acceptableAnswers: [
          'current law: sum of currents at node equals zero',
          'voltage law: sum of voltages in loop equals zero',
          'based on conservation of charge and energy',
          'fundamental laws for circuit analysis'
        ],
        minWordCount: 12
      }
    ],
    'Second Year': [
      {
        id: 'ec2-q1',
        question: 'Explain the working principle of a PN junction diode.',
        experiment: 'Semiconductor Devices',
        difficulty: 'medium',
        points: 1
      },
      {
        id: 'ec2-q2',
        question: 'What is a transistor? Explain NPN and PNP transistors.',
        experiment: 'Transistors',
        difficulty: 'medium',
        points: 1
      },
      {
        id: 'ec2-q3',
        question: 'Describe the working of an operational amplifier.',
        experiment: 'Op-Amp Circuits',
        difficulty: 'hard',
        points: 1
      },
      {
        id: 'ec2-q4',
        question: 'What are logic gates? Explain AND, OR, and NOT gates.',
        experiment: 'Digital Logic',
        difficulty: 'medium',
        points: 1
      },
      {
        id: 'ec2-q5',
        question: 'Explain the concept of feedback in amplifiers.',
        experiment: 'Amplifier Circuits',
        difficulty: 'hard',
        points: 1
      },
      {
        id: 'ec2-q6',
        question: 'What is modulation? Explain AM and FM.',
        experiment: 'Communication Systems',
        difficulty: 'hard',
        points: 1
      }
    ]
  },
  'Mechanical': {
    'First Year': [
      {
        id: 'me1-q1',
        question: 'What are the different types of forces in mechanics?',
        experiment: 'Statics and Dynamics',
        difficulty: 'easy',
        points: 1
      },
      {
        id: 'me1-q2',
        question: 'Explain Newton\'s three laws of motion.',
        experiment: 'Laws of Motion',
        difficulty: 'easy',
        points: 1
      },
      {
        id: 'me1-q3',
        question: 'What is the difference between stress and strain?',
        experiment: 'Material Properties',
        difficulty: 'medium',
        points: 1
      },
      {
        id: 'me1-q4',
        question: 'Define work, power, and energy with units.',
        experiment: 'Work and Energy',
        difficulty: 'easy',
        points: 1
      },
      {
        id: 'me1-q5',
        question: 'What are simple machines? Give examples.',
        experiment: 'Simple Machines',
        difficulty: 'easy',
        points: 1
      }
    ],
    'Second Year': [
      {
        id: 'me2-q1',
        question: 'Explain the working principle of internal combustion engines.',
        experiment: 'IC Engines',
        difficulty: 'medium',
        points: 1
      },
      {
        id: 'me2-q2',
        question: 'What is thermodynamics? State the first law of thermodynamics.',
        experiment: 'Thermodynamics',
        difficulty: 'medium',
        points: 1
      },
      {
        id: 'me2-q3',
        question: 'Describe different types of gears and their applications.',
        experiment: 'Gears and Transmissions',
        difficulty: 'medium',
        points: 1
      },
      {
        id: 'me2-q4',
        question: 'What is heat transfer? Explain conduction, convection, and radiation.',
        experiment: 'Heat Transfer',
        difficulty: 'hard',
        points: 1
      }
    ]
  },
  'Civil': {
    'First Year': [
      {
        id: 'cv1-q1',
        question: 'What are the different types of loads acting on structures?',
        experiment: 'Structural Analysis Lab',
        difficulty: 'easy',
        points: 1,
        keywords: ['dead load', 'live load', 'wind load', 'seismic', 'point load', 'distributed load'],
        acceptableAnswers: [
          'dead loads are permanent weights of structure',
          'live loads are temporary loads like people and furniture',
          'wind loads act horizontally on structures',
          'point loads act at specific locations'
        ],
        minWordCount: 10
      }
    ]
  }
};

export function getRandomQuestions(branch: string, studentClass: string, count: number = 5): Question[] {
  const branchData = experimentsData[branch];
  if (!branchData) return [];
  
  const classData = branchData[studentClass];
  if (!classData || classData.length === 0) return [];
  
  const shuffled = [...classData].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}