import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';

export type GeminiPlanInput = {
  subject: string;
  examDate: string;
  dailyHours: number;
  weakSubjects: string;
  preferredStudyTime: string;
  breakPreference: string;
};

export type GeminiTask = {
  day_number: number;
  task_date: string;
  title: string;
  description: string;
  topic: string;
  duration_minutes: number;
};

export type GeminiPlanResult = {
  tasks: GeminiTask[];
  tips: string[];
};

let cachedModel: GenerativeModel | null = null;

function getModel(): GenerativeModel | null {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) return null;

  if (!cachedModel) {
    const genAI = new GoogleGenerativeAI(apiKey);
    cachedModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
  return cachedModel;
}

export function isGeminiConfigured(): boolean {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  return typeof apiKey === 'string' && apiKey.trim().length > 0;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

const PLAN_SYSTEM_PROMPT = `You are an expert academic study planner. You create personalized, day-by-day study schedules for students preparing for exams.

Rules:
- Generate a task for EVERY day from today until the day before the exam.
- Each task must have: day_number (starting at 1), task_date (YYYY-MM-DD), title, description, topic, duration_minutes.
- Spread the total daily study time across the tasks for each day (the sum of duration_minutes for a day should approximately equal daily_hours * 60).
- Progress through phases: Foundation (early days) → Practice → Deep Dive → Review → Assessment (final days).
- The last 2 days should be full mock exam practice.
- If the plan is longer than 10 days, make Sundays rest days (duration_minutes = 0, topic = "Rest").
- Adapt the topics to the specific subject the student is studying.
- If the student mentions weak subjects or areas, prioritize those topics earlier and allocate more time to them.
- Respect the student's preferred study time and break preferences when structuring tasks.
- Provide 4 short study tips in the "tips" array.

Return ONLY valid JSON in this exact shape (no markdown, no code fences):
{
  "tasks": [
    { "day_number": 1, "task_date": "YYYY-MM-DD", "title": "...", "description": "...", "topic": "...", "duration_minutes": 60 }
  ],
  "tips": ["...", "...", "...", "..."]
}`;

const CHAT_SYSTEM_PROMPT = `You are a friendly, knowledgeable AI Study Assistant embedded in a study planning app. Students ask you about study techniques, motivation, time management, procrastination, exam anxiety, focus, memorization, note-taking, and general academic advice.

Guidelines:
- Keep answers concise, practical, and encouraging.
- Use short numbered lists (3-5 items) when giving tips.
- Do not mention that you are an AI or a language model.
- If a question is not study-related, gently redirect to study topics.`;

export async function generateAIStudyPlan(input: GeminiPlanInput): Promise<GeminiPlanResult> {
  const model = getModel();
  if (!model) {
    throw new Error('Gemini API key is not configured. Set VITE_GEMINI_API_KEY in your environment.');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exam = new Date(input.examDate + 'T00:00:00');
  const totalDays = Math.max(1, Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const startDateStr = formatDate(today);
  const examDateStr = formatDate(exam);

  const userPrompt = `Create a personalized study plan with these details:
- Subject: ${input.subject}
- Exam date: ${examDateStr}
- Today's date: ${startDateStr}
- Total days until exam: ${totalDays}
- Daily study hours: ${input.dailyHours}
- Weak subjects / areas: ${input.weakSubjects || 'None specified'}
- Preferred study time: ${input.preferredStudyTime || 'No preference'}
- Break preference: ${input.breakPreference || 'Standard short breaks'}

Generate a complete day-by-day plan. The first task_date should be ${startDateStr} and the last should be ${examDateStr}. Return only JSON.`;

  const result = await model.generateContent([
    { text: PLAN_SYSTEM_PROMPT },
    { text: userPrompt },
  ]);

  const raw = result.response.text().trim();
  return parsePlanResponse(raw, today, totalDays, input.dailyHours);
}

function parsePlanResponse(
  raw: string,
  today: Date,
  totalDays: number,
  dailyHours: number
): GeminiPlanResult {
  let jsonStr = raw;

  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    jsonStr = fenceMatch[1].trim();
  }

  const braceStart = jsonStr.indexOf('{');
  const braceEnd = jsonStr.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd !== -1) {
    jsonStr = jsonStr.slice(braceStart, braceEnd + 1);
  }

  let parsed: { tasks?: GeminiTask[]; tips?: string[] };
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('The AI returned an invalid study plan. Please try again.');
  }

  const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
  const tips = Array.isArray(parsed.tips) ? parsed.tips.slice(0, 4) : [];

  const validatedTasks: GeminiTask[] = tasks
    .filter((t) => t && typeof t.title === 'string' && typeof t.topic === 'string')
    .map((t, idx) => ({
      day_number: typeof t.day_number === 'number' ? t.day_number : idx + 1,
      task_date: typeof t.task_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(t.task_date)
        ? t.task_date
        : formatDate(new Date(today.getTime() + idx * 86400000)),
      title: String(t.title).slice(0, 200),
      description: String(t.description || '').slice(0, 500),
      topic: String(t.topic).slice(0, 100),
      duration_minutes: typeof t.duration_minutes === 'number' ? t.duration_minutes : Math.round(dailyHours * 60),
    }));

  if (validatedTasks.length === 0) {
    throw new Error('The AI did not generate any tasks. Please try again.');
  }

  return { tasks: validatedTasks, tips };
}

export async function generateAIChatResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  newMessage: string
): Promise<string> {
  const model = getModel();
  if (!model) {
    throw new Error('Gemini API key is not configured. Set VITE_GEMINI_API_KEY in your environment.');
  }

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage(newMessage);
  const text = result.response.text();
  if (!text) {
    return "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";
  }
  return text;
}

export { CHAT_SYSTEM_PROMPT, PLAN_SYSTEM_PROMPT };
