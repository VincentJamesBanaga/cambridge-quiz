export interface AnswerItem {
  activityId: number;
  roundId: number;
  quizId: number;
  answer: boolean;
}

export interface QuestionsItem {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: AnswerItem[];
  feedback: string;
}

export interface RoundItem {
  round_title: string;
  order: number;
  questions: QuestionsItem[];
}

export interface ActivityItem {
  activity_name: string;
  order: number;
  questions: QuestionsItem[] | RoundItem[];
}

export interface Activity {
  name: string;
  heading: string;
  activities: ActivityItem[];
}
