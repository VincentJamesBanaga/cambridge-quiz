import { createContext, type Dispatch, type SetStateAction } from "react";

// Interface
import { Activity } from "@/schema/quizInterface";
import { Action } from "./AppProvider";

export interface AppContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  data: Activity;
  setData: Dispatch<Action>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
