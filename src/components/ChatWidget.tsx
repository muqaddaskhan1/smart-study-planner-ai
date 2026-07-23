import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Loader2, X, MessageCircle } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.match(/motivat|lazy|unmotivated|give up/)) {
    return 'Staying motivated is hard! Try these:\n\n1. Set small daily goals — completing them builds momentum.\n2. Use the "5-minute rule": just commit to 5 minutes.\n3. Reward yourself after each session.\n4. Visualize your success — imagine acing that exam.\n5. Track your progress visually.';
  }
  if (q.match(/memori|remember|retain|flashcard|recall/)) {
    return 'For memorization:\n\n1. Active Recall: test yourself instead of re-reading.\n2. Spaced Repetition: review at increasing intervals.\n3. Mnemonics: use acronyms and visual associations.\n4. Feynman Technique: explain it simply.\n5. Sleep after studying — it consolidates memory.';
  }
  if (q.match(/time manage|schedule|productiv|organize/)) {
    return 'Time management tips:\n\n1. Pomodoro Technique: 25 min focus, 5 min break.\n2. Tackle hardest subjects when energy is highest.\n3. Time-block your day.\n4. Use the 2-minute rule for quick tasks.\n5. Plan your week on Sunday.';
  }
  if (q.match(/procrastinat|delay|put off|cant start/)) {
    return 'Beating procrastination:\n\n1. Break tasks into tiny steps.\n2. Remove friction — put your phone away.\n3. Pair studying with something you enjoy.\n4. Forgive past procrastination.\n5. Action creates motivation — just start!';
  }
  if (q.match(/anxiety|stress|nervous|panic|worried|fear/)) {
    return 'Exam anxiety is manageable:\n\n1. Prepare thoroughly — confidence beats fear.\n2. Practice under exam conditions.\n3. Try breathing: 4s in, 7s hold, 8s out.\n4. Reframe anxiety as excitement.\n5. Get enough sleep before the exam.';
  }
  if (q.match(/short time|last minute|quick|soon|fast|cram/)) {
    return 'Studying with limited time:\n\n1. Prioritize the most important topics.\n2. Use the 80/20 rule — focus on high-yield material.\n3. Active recall over passive reading.\n4. Make one-page summary sheets.\n5. Do past papers — most effective last-minute strategy.';
  }
  if (q.match(/focus|concentrat|distract|attention/)) {
    return 'Improving focus:\n\n1. Put your phone in another room.\n2. Study in a dedicated space.\n3. Use noise-canceling headphones or white noise.\n4. Try the Pomodoro Technique.\n5. Single-task — multitasking cuts efficiency by 40%.';
  }
  if (q.match(/note|take notes|summar/)) {
    return 'Effective note-taking:\n\n1. Cornell Method: notes, cues, and summary sections.\n2. Write in your own words.\n3. Use diagrams and mind maps.\n4. Review within 24 hours.\n5. Color-code by theme.';
  }
  if (q.match(/sleep|rest|tired|exhausted/)) {
    return 'Sleep and studying:\n\n1. Sleep consolidates learning — never skip it.\n2. Aim for 7-9 hours.\n3. Avoid screens 1 hour before bed.\n4. Study hardest material before sleep.\n5. Keep a consistent sleep schedule.';
  }
  return 'Great question! Here are some general tips:\n\n1. Use active recall over passive reading.\n2. Break sessions into focused blocks with breaks.\n3. Teach what you learn to someone else.\n4. Stay consistent — daily study beats cramming.\n5. Take care of sleep, exercise, and nutrition.\n\nAsk me about memorization, time management, motivation, or exam anxiety!';
}

const suggestedQuestions = [
  'How do I stay motivated?',
  'Best memorization techniques?',
  'How to manage time better?',
  'Tips for exam anxiety?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your AI Study Assistant. Ask me about study techniques, motivation, time management, and more!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setMessages((prev) => [...prev, { role: 'user', content }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: generateResponse(content) }]);
      setLoading(false);
    }, 500 + Math.random() * 300);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-300 dark:shadow-blue-900 flex items-center justify-center hover:scale-110 transition-transform duration-200"
          aria-label="Open AI chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 max-h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">AI Study Assistant</p>
                <p className="text-xs text-blue-200">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-sm'
                }`}>
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2">
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Suggested */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-100 dark:border-blue-800"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-100 dark:border-slate-800 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a study question..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200 text-sm"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
