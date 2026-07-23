const motivationalQuotes: string[] = [
  'Success is the sum of small efforts repeated day in and day out.',
  'The expert in anything was once a beginner.',
  'Don\'t watch the clock; do what it does. Keep going.',
  'The secret of getting ahead is getting started.',
  'Believe you can and you\'re halfway there.',
  'Your future is created by what you do today, not tomorrow.',
  'Push yourself, because no one else is going to do it for you.',
  'The harder you work for something, the greater you\'ll feel when you achieve it.',
  'Dream big. Work hard. Stay focused. Surround yourself with good people.',
  'Little by little, one travels far.',
  'The only way to do great work is to love what you do.',
  'Strive for progress, not perfection.',
  'You don\'t have to be great to start, but you have to start to be great.',
  'Quality is not an act, it is a habit.',
  'The mind is everything. What you think you become.',
  'An investment in knowledge pays the best interest.',
  'The beautiful thing about learning is that no one can take it away from you.',
  'Education is the most powerful weapon which you can use to change the world.',
  'The roots of education are bitter, but the fruit is sweet.',
  'Study while others are sleeping; work while others are loafing; prepare while others are playing; and dream while others are wishing.',
  'There are no shortcuts to any place worth going.',
  'If you can dream it, you can do it.',
  'The difference between ordinary and extraordinary is that little extra.',
  'Don\'t let what you cannot do interfere with what you can do.',
  'It always seems impossible until it\'s done.',
  'The future depends on what you do today, so study hard and dream big.',
  'Knowledge is power. Information is liberating. Education is the premise of progress.',
  'Every accomplishment starts with the decision to try.',
  'Focus on being productive instead of busy.',
  'The will to win, the desire to succeed, the urge to reach your full potential — these are the keys that will unlock the door to personal excellence.',
];

export function getRandomQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

export const studyTips: string[] = [
  'Use the Pomodoro Technique: study for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.',
  'Active recall is more effective than passive reading. Close your book and write down everything you remember.',
  'Teach what you\'ve learned to someone else. If you can explain it simply, you truly understand it.',
  'Space out your revision over days, not hours. Spaced repetition locks knowledge into long-term memory.',
  'Sleep is when your brain consolidates learning. Never sacrifice a good night\'s rest before an exam.',
  'Start with the hardest topic when your energy is highest. Tackle easy material when you feel tired.',
  'Set a specific goal for each study session. "Read chapter 3" beats "study biology" every time.',
  'Review your notes within 24 hours of class. You retain far more than if you wait until exam week.',
  'Eliminate distractions. Put your phone in another room — willpower alone is not enough.',
  'Reward yourself after completing a tough study session. Positive reinforcement builds lasting habits.',
  'Progress, not perfection. Consistent small efforts compound into remarkable results over time.',
  'Use practice tests under real exam conditions. Familiarity with the format reduces anxiety.',
  'Exercise boosts brain function. A 20-minute walk before studying improves focus and memory.',
  'Mix subjects in one session. Interleaving different topics improves problem-solving flexibility.',
  'Create mind maps to visualize connections between concepts. It helps with both understanding and recall.',
  'Hydrate often. Even mild dehydration reduces concentration and cognitive performance.',
  'Use the Feynman Technique: explain a concept in simple terms as if teaching a child.',
  'Break large tasks into smaller chunks. "Read 5 pages" is easier to start than "study chapter 1."',
  'Study in a consistent place. Your brain will associate that spot with focus and productivity.',
  'Use flashcards with spaced repetition apps like Anki for memorization-heavy subjects.',
];

export function getRandomTips(count: number): string[] {
  const shuffled = [...studyTips].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, studyTips.length));
}
