import React, { useReducer, useState, type ReactNode } from "react";

// Context
import { AppContext } from "./AppContext";

// Interface
import {
  Activity,
  AnswerItem,
  QuestionsItem,
  RoundItem,
} from "@/schema/quizInterface";

interface AppProviderProps {
  children: ReactNode;
}

export type Action =
  | { type: "SET_DATA"; payload: Activity }
  | { type: "UPDATE_DATA"; payload: AnswerItem };

const setDataReducer = (state: Activity, action: Action): Activity => {
  switch (action.type) {
    case "SET_DATA":
      return { ...action.payload };
    case "UPDATE_DATA":
      return {
        ...state,
        activities: state.activities.map((activity) => {
          if (activity.order === action.payload.activityId) {
            return {
              ...activity,
              questions: action.payload.roundId
                ? (activity.questions.map((questionOrRound) => {
                    return questionOrRound.order === action.payload.roundId
                      ? {
                          ...questionOrRound,
                          questions: (
                            questionOrRound as RoundItem
                          ).questions.map((question) => {
                            return question.order === action.payload.quizId
                              ? {
                                  ...question,
                                  user_answers: [action.payload],
                                }
                              : question;
                          }),
                        }
                      : questionOrRound;
                  }) as RoundItem[])
                : (activity.questions.map((questionOrRound) => {
                    return questionOrRound.order === action.payload.quizId
                      ? {
                          ...questionOrRound,
                          user_answers: [action.payload],
                        }
                      : questionOrRound;
                  }) as QuestionsItem[]),
            };
          }
          return activity;
        }),
      };
    default:
      return state;
  }
};

const initialState: Activity = { name: "", heading: "", activities: [] };

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useReducer(setDataReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        data,
        setData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
