import type { StudyTask } from './supabase';

export type PlanInput = {
  subject: string;
  examDate: string;
  dailyHours: number;
};

type SubjectConfig = {
  topics: string[];
  templates: {
    foundation: string[];
    practice: string[];
    deepDive: string[];
    review: string[];
    assessment: string[];
  };
  mockExamTitle: string;
  mockExamDesc: string;
};

const subjectConfigs: Record<string, SubjectConfig> = {
  mathematics: {
    topics: [
      'Algebra: equations & inequalities',
      'Calculus: limits & continuity',
      'Calculus: differentiation rules',
      'Calculus: integration techniques',
      'Trigonometry: identities & equations',
      'Linear algebra: matrices & vectors',
      'Statistics: distributions & probability',
      'Complex numbers & polar forms',
      'Sequences, series & convergence',
      'Functions: domain, range & graphs',
      'Logarithms & exponentials',
      'Coordinate geometry & conics',
      'Differential equations basics',
      'Proof techniques: induction & contradiction',
      'Optimization & applied problems',
    ],
    templates: {
      foundation: [
        'Study the theory of {topic}. Read textbook examples and write down key formulas and definitions.',
        'Review lecture notes on {topic}. Summarize theorems and create a one-page formula sheet.',
      ],
      practice: [
        'Solve practice problems on {topic}. Start with easy ones and gradually increase difficulty.',
        'Work through textbook exercises on {topic}. Show all steps and verify your answers.',
      ],
      deepDive: [
        'Tackle challenging problems on {topic}. Focus on proof-based and multi-step questions.',
        'Deep dive into {topic}. Identify edge cases and common pitfalls in problem-solving.',
      ],
      review: [
        'Active recall: write down all formulas and methods for {topic} from memory, then check.',
        'Review mistakes from {topic} practice. Re-attempt any problems you got wrong.',
      ],
      assessment: [
        'Timed problem set on {topic}. Simulate exam pressure and check your speed and accuracy.',
        'Self-test on {topic}. Grade yourself and note weak areas for final revision.',
      ],
    },
    mockExamTitle: 'Full mock exam: Mathematics',
    mockExamDesc: 'Complete a full past paper under timed exam conditions. Show all working, then review every mistake.',
  },
  biology: {
    topics: [
      'Cell structure & organelles',
      'Cell transport: osmosis & diffusion',
      'Cell division: mitosis & meiosis',
      'DNA replication & protein synthesis',
      'Genetics: Mendelian inheritance',
      'Genetics: mutations & genetic disorders',
      'Human physiology: circulatory system',
      'Human physiology: nervous system',
      'Human physiology: digestive system',
      'Human physiology: respiratory system',
      'Plant biology: photosynthesis',
      'Plant biology: transport & reproduction',
      'Ecology: ecosystems & energy flow',
      'Evolution: natural selection & speciation',
      'Biochemistry: enzymes & metabolism',
      'Biochemistry: cellular respiration',
      'Immune system & disease response',
      'Biotechnology & genetic engineering',
    ],
    templates: {
      foundation: [
        'Read and outline the chapter on {topic}. Draw and label key diagrams in your notes.',
        'Study the concepts of {topic}. Create flashcards for important terms and processes.',
      ],
      practice: [
        'Answer structured questions on {topic}. Practice labeling diagrams from memory.',
        'Complete practice questions on {topic}. Focus on using correct biological terminology.',
      ],
      deepDive: [
        'Deep dive into {topic}. Analyze case studies and connect concepts to real examples.',
        'Master {topic}. Create comparison tables for related processes and structures.',
      ],
      review: [
        'Active recall on {topic}. Redraw all diagrams from memory and check for accuracy.',
        'Review {topic} using past exam questions. Time yourself and check mark schemes.',
      ],
      assessment: [
        'Take a timed test on {topic}. Practice extended-response questions with full explanations.',
        'Self-assess {topic}. Identify weak areas and create a targeted revision list.',
      ],
    },
    mockExamTitle: 'Full mock exam: Biology',
    mockExamDesc: 'Complete a full past paper under exam conditions. Pay attention to using precise scientific terminology in all answers.',
  },
  biochemistry: {
    topics: [
      'Amino acids & protein structure',
      'Enzyme kinetics & inhibition',
      'Carbohydrate metabolism: glycolysis',
      'Carbohydrate metabolism: Krebs cycle',
      'Lipid metabolism & beta-oxidation',
      'Nucleic acids & nucleotides',
      'DNA replication mechanisms',
      'Transcription & RNA processing',
      'Translation & protein synthesis',
      'Membrane structure & transport',
      'Signal transduction pathways',
      'Vitamins & cofactors',
      'Hormone biochemistry',
      'Metabolic regulation & integration',
      'Bioenergetics & thermodynamics',
      'pH, buffers & acid-base chemistry',
    ],
    templates: {
      foundation: [
        'Study the principles of {topic}. Write out key biochemical pathways and enzymes involved.',
        'Review lecture material on {topic}. Draw pathway diagrams and note regulatory steps.',
      ],
      practice: [
        'Solve biochemical problems on {topic}. Practice calculating reaction rates and yields.',
        'Work through practice questions on {topic}. Focus on pathway regulation and enzyme mechanisms.',
      ],
      deepDive: [
        'Deep dive into {topic}. Analyze how disruptions in this pathway cause disease.',
        'Master {topic}. Compare different regulatory mechanisms and their physiological significance.',
      ],
      review: [
        'Active recall on {topic}. Redraw all metabolic pathways from memory and label enzymes.',
        'Review {topic} using exam questions. Focus on data interpretation and experimental analysis.',
      ],
      assessment: [
        'Timed assessment on {topic}. Practice interpreting experimental data and graphs.',
        'Self-test on {topic}. Review any pathway steps you could not recall from memory.',
      ],
    },
    mockExamTitle: 'Full mock exam: Biochemistry',
    mockExamDesc: 'Complete a full past paper under timed conditions. Practice drawing metabolic pathways and interpreting experimental data.',
  },
  english: {
    topics: [
      'Grammar: sentence structure & clauses',
      'Grammar: verb tenses & agreement',
      'Grammar: punctuation & mechanics',
      'Vocabulary: academic word lists',
      'Vocabulary: synonyms, antonyms & usage',
      'Reading: comprehension strategies',
      'Reading: inference & implied meaning',
      'Reading: analyzing tone & purpose',
      'Writing: essay structure & thesis statements',
      'Writing: argument & persuasive techniques',
      'Writing: introductions & conclusions',
      'Writing: paragraph development & transitions',
      'Literary analysis: themes & motifs',
      'Literary analysis: character & setting',
      'Literary devices: metaphor, imagery & symbolism',
      'Poetry analysis: form & structure',
      'Creative writing: narrative techniques',
      'Editing: proofreading & revision skills',
    ],
    templates: {
      foundation: [
        'Study {topic}. Read examples and note key rules or techniques with supporting evidence.',
        'Review the principles of {topic}. Create a summary of guidelines with example sentences.',
      ],
      practice: [
        'Practice {topic}. Complete exercises and check your work against answer keys.',
        'Work on {topic}. Write practice paragraphs applying the technique or rule.',
      ],
      deepDive: [
        'Deep dive into {topic}. Analyze a text and identify how the technique is used effectively.',
        'Master {topic}. Compare strong and weak examples and explain the difference.',
      ],
      review: [
        'Active recall on {topic}. Write a summary from memory and compare with your notes.',
        'Review {topic} using past paper questions. Practice planning responses under time pressure.',
      ],
      assessment: [
        'Timed writing task on {topic}. Write a full response within the exam time limit.',
        'Self-assess {topic}. Review your writing for common errors and note improvement areas.',
      ],
    },
    mockExamTitle: 'Full mock exam: English',
    mockExamDesc: 'Complete a full past paper under timed conditions. Write all responses in full and proofread for grammar and clarity.',
  },
  'computer science': {
    topics: [
      'Programming fundamentals: variables & data types',
      'Control structures: conditionals & loops',
      'Functions & recursion',
      'Arrays & strings',
      'Object-oriented programming: classes & objects',
      'Inheritance & polymorphism',
      'Data structures: stacks & queues',
      'Data structures: linked lists',
      'Data structures: trees & graphs',
      'Hash tables & dictionaries',
      'Sorting algorithms: bubble, merge & quick sort',
      'Searching algorithms: linear & binary search',
      'Time & space complexity (Big-O)',
      'Dynamic programming basics',
      'Recursion & backtracking',
      'Database fundamentals & SQL',
      'Operating systems: processes & memory',
      'Networks: protocols & the OSI model',
    ],
    templates: {
      foundation: [
        'Study {topic}. Read the theory and write small code examples to reinforce concepts.',
        'Review lecture notes on {topic}. Write pseudocode for key algorithms and data structures.',
      ],
      practice: [
        'Code practice exercises on {topic}. Build small programs and test with different inputs.',
        'Solve programming problems on {topic}. Focus on writing clean, efficient code.',
      ],
      deepDive: [
        'Deep dive into {topic}. Implement the algorithm from scratch and analyze its complexity.',
        'Master {topic}. Solve advanced problems and optimize your solutions for time and space.',
      ],
      review: [
        'Active recall on {topic}. Write out the algorithm or concept from memory and trace through examples.',
        'Review {topic} with past exam questions. Practice tracing code output by hand.',
      ],
      assessment: [
        'Timed coding challenge on {topic}. Simulate exam conditions and verify your solution.',
        'Self-test on {topic}. Re-implement key data structures and check for edge cases.',
      ],
    },
    mockExamTitle: 'Full mock exam: Computer Science',
    mockExamDesc: 'Complete a full past paper under exam conditions. Practice writing code by hand and tracing algorithm outputs.',
  },
  physics: {
    topics: [
      'Mechanics: kinematics & motion',
      'Mechanics: forces & Newton\'s laws',
      'Mechanics: work, energy & power',
      'Momentum & impulse',
      'Rotational motion & torque',
      'Gravitation & circular motion',
      'Oscillations & simple harmonic motion',
      'Waves: properties & superposition',
      'Sound & electromagnetic waves',
      'Optics: reflection & refraction',
      'Electric fields & potential',
      'Electric circuits & Kirchhoff\'s laws',
      'Magnetism & electromagnetic induction',
      'Thermodynamics: laws & heat transfer',
      'Modern physics: quantum & atomic models',
      'Nuclear physics & radioactivity',
    ],
    templates: {
      foundation: [
        'Study the theory of {topic}. Read derivations and write down key formulas with units.',
        'Review lecture notes on {topic}. Create a formula sheet and note the conditions where each applies.',
      ],
      practice: [
        'Solve numerical problems on {topic}. Show all steps and check units in your final answer.',
        'Work through practice problems on {topic}. Pay attention to sign conventions and vector directions.',
      ],
      deepDive: [
        'Deep dive into {topic}. Derive key equations from first principles and solve multi-step problems.',
        'Master {topic}. Analyze complex scenarios and identify which principles apply.',
      ],
      review: [
        'Active recall on {topic}. Write all formulas from memory and list when each is used.',
        'Review {topic} using past exam questions. Check your problem-solving approach against mark schemes.',
      ],
      assessment: [
        'Timed problem set on {topic}. Simulate exam pressure and verify all units and significant figures.',
        'Self-test on {topic}. Identify any derivations or problem types you struggle with.',
      ],
    },
    mockExamTitle: 'Full mock exam: Physics',
    mockExamDesc: 'Complete a full past paper under timed exam conditions. Show all working, include units, and review every mistake carefully.',
  },
  chemistry: {
    topics: [
      'Atomic structure & electron configuration',
      'Periodic table: trends & patterns',
      'Chemical bonding: ionic & covalent',
      'Molecular geometry & VSEPR theory',
      'Stoichiometry & the mole concept',
      'Chemical reactions & balancing equations',
      'Thermochemistry & enthalpy changes',
      'Chemical kinetics & reaction rates',
      'Chemical equilibrium & Le Chatelier\'s principle',
      'Acids, bases & pH calculations',
      'Electrochemistry & redox reactions',
      'Organic chemistry: hydrocarbons & functional groups',
      'Organic reactions: substitution & elimination',
      'Analytical techniques: spectroscopy & chromatography',
      'Coordination chemistry & transition metals',
      'Environmental & applied chemistry',
    ],
    templates: {
      foundation: [
        'Study the concepts of {topic}. Read textbook sections and write down key definitions and equations.',
        'Review lecture notes on {topic}. Create summary notes and note important reaction mechanisms.',
      ],
      practice: [
        'Solve practice problems on {topic}. Balance equations and calculate quantities using the mole concept.',
        'Work through exercises on {topic}. Practice drawing structures and writing reaction mechanisms.',
      ],
      deepDive: [
        'Deep dive into {topic}. Analyze reaction mechanisms and predict products for unfamiliar reactions.',
        'Master {topic}. Connect the concept to real-world applications and experimental techniques.',
      ],
      review: [
        'Active recall on {topic}. Write all key reactions and formulas from memory, then verify.',
        'Review {topic} using past exam questions. Practice data-based and extended-response questions.',
      ],
      assessment: [
        'Timed test on {topic}. Practice multi-step calculations and mechanism drawing under pressure.',
        'Self-assess {topic}. Note any reactions or calculations you could not complete confidently.',
      ],
    },
    mockExamTitle: 'Full mock exam: Chemistry',
    mockExamDesc: 'Complete a full past paper under exam conditions. Show all working, balance all equations, and review every answer.',
  },
  history: {
    topics: [
      'Key dates & chronological timelines',
      'Major events & turning points',
      'Historical figures & their impact',
      'Causes & consequences of key events',
      'Political systems & revolutions',
      'Economic changes & industrialization',
      'Social movements & cultural shifts',
      'Wars: causes, courses & outcomes',
      'Imperialism & colonialism',
      'Cold War & globalization',
      'Source analysis: primary vs secondary',
      'Historiography & differing interpretations',
      'Essay writing: argument & evidence',
      'Comparative history: cross-regional analysis',
      'Historical significance & evaluation',
    ],
    templates: {
      foundation: [
        'Study {topic}. Read the textbook section and create a timeline of key events and dates.',
        'Review lecture notes on {topic}. Write summaries of causes, events, and consequences.',
      ],
      practice: [
        'Practice {topic}. Write short analytical responses using evidence from your readings.',
        'Work on {topic}. Analyze primary sources and identify their perspective and limitations.',
      ],
      deepDive: [
        'Deep dive into {topic}. Compare different historians\' interpretations and evaluate their arguments.',
        'Master {topic}. Write a full essay plan with a clear thesis, evidence, and counter-arguments.',
      ],
      review: [
        'Active recall on {topic}. Write key dates, names, and events from memory and verify.',
        'Review {topic} using past exam questions. Practice structuring essays under time pressure.',
      ],
      assessment: [
        'Timed essay on {topic}. Write a full response within the exam time limit.',
        'Self-assess {topic}. Review your essay for argument strength, evidence use, and structure.',
      ],
    },
    mockExamTitle: 'Full mock exam: History',
    mockExamDesc: 'Complete a full past paper under timed conditions. Write structured essays with clear arguments, evidence, and analysis.',
  },
  economics: {
    topics: [
      'Supply & demand: market equilibrium',
      'Elasticity: price, income & cross',
      'Market structures: perfect & imperfect competition',
      'Market failure & government intervention',
      'National income & GDP measurement',
      'Aggregate demand & supply',
      'Fiscal policy & government budget',
      'Monetary policy & interest rates',
      'Inflation & unemployment',
      'Economic growth & business cycles',
      'International trade & comparative advantage',
      'Exchange rates & balance of payments',
      'Globalization & economic development',
      'Data interpretation & economic indicators',
      'Evaluation of economic policies',
    ],
    templates: {
      foundation: [
        'Study the theory of {topic}. Read the textbook and draw supply-demand diagrams to illustrate concepts.',
        'Review lecture notes on {topic}. Create summary notes with key definitions and diagrams.',
      ],
      practice: [
        'Practice {topic}. Solve numerical problems and draw diagrams to support your analysis.',
        'Work on {topic}. Analyze real-world data and apply economic models to current events.',
      ],
      deepDive: [
        'Deep dive into {topic}. Evaluate the strengths and limitations of economic models in this area.',
        'Master {topic}. Compare different policy approaches and assess their trade-offs.',
      ],
      review: [
        'Active recall on {topic}. Redraw all diagrams from memory and list key definitions.',
        'Review {topic} using past exam questions. Practice data-response and essay questions.',
      ],
      assessment: [
        'Timed assessment on {topic}. Write a full evaluation essay under exam conditions.',
        'Self-test on {topic}. Review any diagrams or concepts you could not draw from memory.',
      ],
    },
    mockExamTitle: 'Full mock exam: Economics',
    mockExamDesc: 'Complete a full past paper under timed conditions. Draw all diagrams clearly and support arguments with economic theory.',
  },
};

const genericConfig: SubjectConfig = {
  topics: [
    'Core concepts & key definitions',
    'Important terminology & vocabulary',
    'Fundamental principles & theories',
    'Key formulas & relationships',
    'Major frameworks & models',
    'Historical context & background',
    'Applied examples & case studies',
    'Common problem types',
    'Advanced topics & extensions',
    'Critical analysis & evaluation',
    'Past paper practice',
    'Weak area identification',
    'Summary notes & mind maps',
    'Mixed topic revision',
    'Full mock exam practice',
  ],
  templates: {
    foundation: [
      'Study the fundamentals of {topic}. Read the core material and take structured notes.',
      'Review key concepts of {topic}. Create summary notes and flashcards for important terms.',
    ],
    practice: [
      'Practice questions on {topic}. Apply what you have learned and check your understanding.',
      'Work through exercises on {topic}. Identify areas that need more attention.',
    ],
    deepDive: [
      'Deep dive into {topic}. Analyze complex aspects and connect ideas together.',
      'Master {topic}. Create detailed notes and identify relationships between concepts.',
    ],
    review: [
      'Active recall on {topic}. Write everything you remember from memory, then check your notes.',
      'Review {topic} using past exam questions. Focus on areas where you lost marks.',
    ],
    assessment: [
      'Timed test on {topic}. Simulate exam conditions and assess your readiness.',
      'Self-assess {topic}. Note weak areas and create a targeted revision plan.',
    ],
  },
  mockExamTitle: 'Full mock exam',
  mockExamDesc: 'Complete a full past paper under timed exam conditions. Review every mistake and note areas for final revision.',
};

function getConfig(subject: string): SubjectConfig {
  const normalized = subject.trim().toLowerCase();

  // Direct keyword matching with priority
  const keywordMap: { keywords: string[]; config: string }[] = [
    { keywords: ['math', 'mathematics', 'calculus', 'algebra', 'geometry', 'statistics'], config: 'mathematics' },
    { keywords: ['biochem', 'biochemistry'], config: 'biochemistry' },
    { keywords: ['bio', 'biology', 'genetics', 'physiology', 'ecology', 'botany', 'zoology'], config: 'biology' },
    { keywords: ['computer', 'programming', 'software', 'coding', 'algorithm', 'data structure', 'cs '], config: 'computer science' },
    { keywords: ['english', 'literature', 'language', 'esl', 'writing', 'grammar'], config: 'english' },
    { keywords: ['physic', 'mechanic', 'quantum', 'thermodynamic'], config: 'physics' },
    { keywords: ['chem', 'chemistry', 'organic', 'molecule'], config: 'chemistry' },
    { keywords: ['history', 'historical'], config: 'history' },
    { keywords: ['econom', 'finance', 'business', 'accounting'], config: 'economics' },
  ];

  for (const entry of keywordMap) {
    for (const kw of entry.keywords) {
      if (normalized.includes(kw)) {
        return subjectConfigs[entry.config];
      }
    }
  }

  return genericConfig;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

type Phase = 'foundation' | 'practice' | 'deepDive' | 'review' | 'assessment';

function getPhaseForDay(day: number, totalDays: number): Phase {
  const progress = totalDays > 1 ? day / totalDays : 0.5;
  if (progress < 0.2) return 'foundation';
  if (progress < 0.45) return 'practice';
  if (progress < 0.7) return 'deepDive';
  if (progress < 0.9) return 'review';
  return 'assessment';
}

function pickTemplate(templates: string[], seed: number): string {
  return templates[seed % templates.length];
}

export function generateStudyPlan(input: PlanInput): Omit<StudyTask, 'id' | 'plan_id' | 'completed' | 'created_at'>[] {
  const { subject, examDate, dailyHours } = input;
  const exam = new Date(examDate + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalDays = Math.max(1, Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const config = getConfig(subject);
  const tasks: Omit<StudyTask, 'id' | 'plan_id' | 'completed' | 'created_at'>[] = [];

  const minutesPerDay = Math.round(dailyHours * 60);

  // Determine how many tasks per day based on study hours
  // <=1.5 hrs = 1 task, <=3 hrs = 2 tasks, <=5 hrs = 3 tasks, >5 = 4 tasks
  const tasksPerDay = dailyHours <= 1.5 ? 1 : dailyHours <= 3 ? 2 : dailyHours <= 5 ? 3 : 4;
  const minutesPerTask = Math.round(minutesPerDay / tasksPerDay);

  // Track which topics have been covered to ensure full coverage before repeating
  let topicIndex = 0;
  const topicsCount = config.topics.length;

  for (let day = 0; day < totalDays; day++) {
    const taskDate = new Date(today);
    taskDate.setDate(today.getDate() + day);

    // Rest day on Sundays for plans longer than 10 days
    if (totalDays > 10 && taskDate.getDay() === 0) {
      tasks.push({
        day_number: day + 1,
        task_date: formatDate(taskDate),
        title: 'Rest & recharge day',
        description: 'Take a well-deserved break. Light review of flashcards is optional, but focus on recovery today.',
        topic: 'Rest',
        duration_minutes: 0,
      });
      continue;
    }

    // Last 2 days: mock exams (for plans longer than 5 days)
    if (day >= totalDays - 2 && totalDays > 5) {
      tasks.push({
        day_number: day + 1,
        task_date: formatDate(taskDate),
        title: config.mockExamTitle,
        description: config.mockExamDesc,
        topic: 'Mock Exam',
        duration_minutes: minutesPerDay,
      });
      continue;
    }

    // Second-to-last phase: final mixed revision (last 3rd day for plans > 7 days)
    if (day === totalDays - 3 && totalDays > 7) {
      tasks.push({
        day_number: day + 1,
        task_date: formatDate(taskDate),
        title: 'Final mixed revision',
        description: 'Review all your summary notes and flashcards. Focus on weak areas identified during practice. Skim through every topic quickly.',
        topic: 'Mixed Revision',
        duration_minutes: minutesPerDay,
      });
      continue;
    }

    const phase = getPhaseForDay(day, totalDays);
    const templates = config.templates[phase];

    // Generate tasksPerDay tasks for this day, each on a different topic
    for (let t = 0; t < tasksPerDay; t++) {
      const topic = config.topics[topicIndex % topicsCount];
      topicIndex++;

      const templateStr = pickTemplate(templates, day + t);
      const title = templateStr.replace('{topic}', topic);
      const description = templateStr.replace('{topic}', topic);

      tasks.push({
        day_number: day + 1,
        task_date: formatDate(taskDate),
        title,
        description,
        topic,
        duration_minutes: minutesPerTask,
      });
    }
  }

  return tasks;
}

export function getPhaseLabel(dayNumber: number, totalDays: number): string {
  const phase = getPhaseForDay(dayNumber - 1, totalDays);
  const labels: Record<Phase, string> = {
    foundation: 'Foundation',
    practice: 'Practice',
    deepDive: 'Deep Dive',
    review: 'Review',
    assessment: 'Assessment',
  };
  return labels[phase];
}
